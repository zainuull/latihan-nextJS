import { getAccount } from '@/lib/firebase/services';
import { compare } from 'bcrypt';
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
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const user: any = await getAccount({ email });
        if (user) {
          const passwordConfirm = await compare(password, user.password);
          if (passwordConfirm) {
            return user;
          }
          return null;
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
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: any) {
      if ('email' in token) {
        session.user.email = token.email;
      }
      if ('fullName' in token) {
        session.user.fullName = token.fullName;
      }
      if ('role' in token) {
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/login',
  },
};

export default NextAuth(AuthOptions);
