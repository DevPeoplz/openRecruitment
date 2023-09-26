import { clientSSR } from '@/lib/apollo-client/ssr'
import { prisma } from '@/lib/prisma'
import { gql } from '@apollo/client'
import { HiringRole } from '@prisma/client'

export const getUserCompanies = async (userEmail: string): Promise<string[]> => {
  const client = clientSSR({ session: { user: { email: userEmail } }, isAdminRequest: true })
  const getCurrentUserCompanies = gql`
    query getCurrentUserCompanies {
      me {
        hiringRoles {
          company {
            id
          }
        }
      }
    }
  `
  try {
    const { data } = await client.query({
      query: getCurrentUserCompanies,
    })

    const user = data?.me

    return user.hiringRoles?.map((hiringRole: any) => hiringRole.company.id) ?? [] //eslint-disable-line
  } catch (error) {
    console.error('Error fetching user companies:', error)
  }

  return []
}

export const userBelongsToCompany = async (
  userEmail: string | null | undefined,
  companyId: string | undefined
): Promise<boolean> => {
  const userCompanies = userEmail ? await getUserCompanies(userEmail) : []

  if (companyId) return userCompanies.includes(companyId)

  return false
}

export const getUserRoleData = async (
  userEmail: string,
  companyId: string
): Promise<{ hiringRole?: HiringRole; permissions?: string[] }> => {
  const user = await prisma.user.findUnique({
    // the `query` argument will add in `include`s or `select`s to
    // resolve as much of the request in a single query as possible,
    include: {
      hiringRoles: {
        where: {
          company: {
            id: companyId,
          },
        },
        include: {
          role: true,
        },
      },
    },
    where: { email: userEmail },
  })

  if (!user) return {}

  const hiringRole = user?.hiringRoles[0]
  const roleAbilities = hiringRole?.role?.abilities ?? []
  const extraAbilities = hiringRole?.extraAbilities ?? []
  return { hiringRole: hiringRole, permissions: [...roleAbilities, ...extraAbilities] }
}
