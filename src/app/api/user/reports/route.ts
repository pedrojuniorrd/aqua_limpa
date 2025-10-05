// src/app/api/user/reports/route.ts
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  try {
    const client = await clientPromise;
    const db = client.db("aqualimpa");
    const myReports = await db.collection("reports").find({ userId: session.user.id }).sort({ createdAt: -1 }).toArray();
    return NextResponse.json(myReports);
  } catch (e) {
    return NextResponse.json({ error: "Erro ao buscar seus reports." }, { status: 500 });
  }
}