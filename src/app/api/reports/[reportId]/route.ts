// src/app/api/reports/[reportId]/route.ts
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { ObjectId } from "mongodb";

async function checkOwnership(reportId: string, userId: string) {
  const client = await clientPromise;
  const db = client.db("aqualimpa");
  const report = await db.collection("reports").findOne({ _id: new ObjectId(reportId) });
  return report && report.userId === userId;
}

// Função DELETE
export async function DELETE(request: Request, { params }: { params: { reportId: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const { reportId } = params;
  if (!await checkOwnership(reportId, session.user.id)) {
    return NextResponse.json({ error: "Acesso negado." }, { status: 403 });
  }

  try {
    const client = await clientPromise;
    const db = client.db("aqualimpa");
    await db.collection("reports").deleteOne({ _id: new ObjectId(reportId) });
    return NextResponse.json({ message: "Report excluído com sucesso." });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao excluir o report." }, { status: 500 });
  }
}

// Função PUT (Editar)
export async function PUT(request: Request, { params }: { params: { reportId: string } }) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
        return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
    }

    const { reportId } = params;
    if (!await checkOwnership(reportId, session.user.id)) {
        return NextResponse.json({ error: "Acesso negado." }, { status: 403 });
    }

    try {
        const { description, type } = await request.json();
        const client = await clientPromise;
        const db = client.db("aqualimpa");
        
        await db.collection("reports").updateOne(
            { _id: new ObjectId(reportId) },
            { $set: { description, type } }
        );
        
        return NextResponse.json({ message: "Report atualizado com sucesso." });
    } catch (error) {
        return NextResponse.json({ error: "Erro ao atualizar o report." }, { status: 500 });
    }
}