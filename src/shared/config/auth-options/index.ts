import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt-ts";
import { userRepository } from "@/entities/user/repository";

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "E-mail", type: "text" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email;
        const password = credentials?.password;

        if (!email || !password) {
          throw new Error("E-mail e/ou senha não informados.");
        }

        const user = await userRepository.getByEmail(email);

        if (!user) {
          throw new Error("E-mail ou senha incorretos.");
        }

        if (user.deletedAt !== null) {
          throw new Error(
            "Usuário inativo. Entre em contato com o administrador.",
          );
        }

        const isEqual = await compare(password, user?.password ?? "");

        if (!isEqual) {
          throw new Error("E-mail ou senha incorretos.");
        }

        return {
          id: user.publicId,
          email: user.email,
        };
      },
    }),
  ],
  jwt: {
    maxAge: 60 * 60 * 24 * 30,
  },
  session: { strategy: "jwt" },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }

      return { ...token, ...user };
    },
    session: ({ session, token }) => {
      if (token) {
        session.user = { ...token, id: token?.sub };
      }
      return session;
    },
  },
  pages: {
    signIn: "/",
    signOut: "/login",
  },
};
