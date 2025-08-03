import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "@/utils/db";

export const authOptions: AuthOptions = {

  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }

          const user = await prisma.user.findFirst({
            where: { email: credentials.email },
          });

          if (user && user.password) {
            const isPasswordValid = await bcrypt.compare(
              credentials.password,
              user.password
            );

            if (isPasswordValid) {
              return {
                id: user.id,
                email: user.email,
                role: user.role,
              };
            }
          }
        } catch (err: any) {
          console.error("Database connection error during authentication:", err);
          return null;
        }
        return null;
      },
    })
  ],
  callbacks: {
    async signIn({ user, account }: any) {
      if (account?.provider == "credentials") {
        return true;
      }
      return true;
    },
    async jwt({ token, user }: any) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};
