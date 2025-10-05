// src/types/next-auth.d.ts

import { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  /**
   * Retornado por `useSession`, `getSession` e recebido como prop pelo `SessionProvider`
   */
  interface Session {
    user: {
      /** O ID do usuário no banco de dados. */
      id: string;
    } & DefaultSession["user"]; // Mantém as propriedades padrão (name, email, image)
  }
}

declare module "next-auth/jwt" {
  /** Retornado pelo callback `jwt` */
  interface JWT {
    /** O ID do usuário no banco de dados. */
    id: string;
  }
}