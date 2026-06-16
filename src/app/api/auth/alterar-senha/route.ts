import { NextRequest, NextResponse } from "next/server";
import { userRepository } from "@/entities/user/repository";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email e nova senha são obrigatórios", status: 400 },
        { status: 400 },
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { message: "Nova senha deve ter pelo menos 8 caracteres", status: 400 },
        { status: 400 },
      );
    }

    const user = await userRepository.getByEmail(email);

    if (!user) {
      return NextResponse.json(
        { message: "Usuário não encontrado", status: 404 },
        { status: 404 },
      );
    }

    const userId = await userRepository.getIdByPublicId(user.publicId);

    if (!userId) {
      return NextResponse.json(
        { message: "Usuário não encontrado", status: 404 },
        { status: 404 },
      );
    }

    await userRepository.updatePassword(userId.id, password);

    return NextResponse.json(
      {
        message: "Senha redefinida com sucesso",
        success: true,
        status: 200,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Erro interno do servidor", status: 500 },
      { status: 500 },
    );
  }
}
