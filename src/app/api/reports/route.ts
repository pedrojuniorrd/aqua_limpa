// src/app/api/reports/route.ts
import { NextRequest, NextResponse } from "next/server"; // Importe NextRequest
import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// Função GET (buscar todos os reports) - agora com lógica de filtro
export async function GET(request: NextRequest) { // Use NextRequest para acessar a URL
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const type = searchParams.get('type');

    // Monta a query dinamicamente
    const query: { [key: string]: string } = {};

    if (status && status !== 'all') {
      query.status = status;
    }
    if (type && type !== 'all') {
      query.type = type;
    }

    const client = await clientPromise;
    const db = client.db("aqualimpa");
    
    const reports = await db
      .collection("reports")
      .find(query) // Usa a query dinâmica
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(reports);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Erro ao buscar os reports." }, { status: 500 });
  }
}

// Função POST (criar report) - permanece a mesma
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  try {
    const client = await clientPromise;
    const db = client.db("aqualimpa");
    const reportData = await request.json();

    const newReport = {
      ...reportData,
      userId: session.user.id,
      userName: session.user.name,
      status: 'reported',
      createdAt: new Date(),
    };

    const result = await db.collection("reports").insertOne(newReport);
    return NextResponse.json(result, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Erro ao criar o report." }, { status: 500 });
  }
}