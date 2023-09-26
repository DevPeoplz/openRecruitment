import { authZApolloPlugin } from '@graphql-authz/apollo-server-plugin'
import { ApolloServer } from '@apollo/server'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { schema } from '@/lib/graphql/schema'
import * as rules from '@/lib/graphql/schema/rules'
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from '@apollo/server/plugin/landingPage/default'
import { getUserRoleData } from '@/utils/backend'
import { Session } from 'next-auth'

interface ExtendedSession extends Session {
  user: {
    permissions?: string[] | null
    hiringRoleId?: number | null
  } & Session['user']
}

export interface IContext {
  isAdminRequest?: boolean
  session: ExtendedSession | null
}

const server = new ApolloServer({
  schema,
  // authz apollo plugin
  plugins: [
    authZApolloPlugin({ rules: rules }),
    process.env.NODE_ENV === 'production'
      ? ApolloServerPluginLandingPageProductionDefault({
          includeCookies: true,
        })
      : ApolloServerPluginLandingPageLocalDefault({ includeCookies: true }),
  ],
})

export default startServerAndCreateNextHandler(server, {
  context: async (req, res): Promise<IContext> => {
    const session = await getServerSession(req, res, authOptions)
    let permissions: string[] = []
    let hiringRoleId: number | null = null

    if (session?.user?.email && session?.user?.selectedCompany) {
      const userRoleData = await getUserRoleData(session.user.email, session.user.selectedCompany)
      hiringRoleId = userRoleData?.hiringRole?.id ?? null
      permissions = userRoleData?.permissions ?? []
    }

    return {
      session: session
        ? {
            ...session,
            user: {
              ...session?.user,
              permissions,
              hiringRoleId,
            },
          }
        : null,
    }
  },
})
