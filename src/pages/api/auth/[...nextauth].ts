import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '@/lib/prisma'
import { userBelongsToCompany } from '@/utils/backend'
import { omit } from 'lodash'
import { getUserWithCredentials } from '@/pages/api/user/check-credentials'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'abcd@xyz.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async function (credentials) {
        const user = await getUserWithCredentials(credentials)

        if (user) {
          return user
        } else {
          throw new Error('Wrong credentials. Try again.')
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  secret: process.env.SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  jwt: {
    maxAge: 24 * 60 * 60,
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user && user.userRole) {
        token.userRole = user?.userRole ?? null
        token.image = user?.photo?.path ?? null
        token.name = user?.name ?? null // Ensure `name` is set to null if undefined
      }

      if (trigger === 'update' && session?.selectedCompany) {
        if (
          token.email &&
          (await userBelongsToCompany(token.email, session.selectedCompany.toString()))
        ) {
          token.selectedCompany = session.selectedCompany.toString()
        } else {
          token = omit(token, 'selectedCompany')
        }
      }

      return token
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          image: token.image ?? null,
          userRole: token.userRole ?? null,
          name: token.name ?? null, // Ensure `name` is set to null if undefined
          selectedCompany: token.selectedCompany ?? null,
        },
      }
    },
  },
}

export default NextAuth(authOptions)
