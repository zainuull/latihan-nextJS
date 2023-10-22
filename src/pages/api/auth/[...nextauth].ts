import { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';

const AuthOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXT_AUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        fullName: { label: 'Full Name', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { email, fullName, password }: any = credentials as {
          email: string;
          fullName: string;
          password: string;
        };
        const user: any = { id: 1, email: email, fullName: fullName, password: password };
        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, account, profile, user }: any) {
      if (account?.provider === 'credentials') {
        token.email = user.email;
        token.fullName = user.fullName;
      }
      return token;
    },
    async session({ session, token }: any) {
      if ('email' in token) {
        session.user.email = token.email;
      } if ('fullName' in token) {
        session.user.fullName = token.fullName;
      }
      return session;
    },
  },
};

export default NextAuth(AuthOptions);
