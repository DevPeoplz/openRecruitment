import { useQuery } from '@apollo/client'
import { GET_ME_DATA_AND_COMPANIES } from '@/graphql-operations/queries'
import { useMemo } from 'react'
import { useSession } from 'next-auth/react'

export const useHiringRole = () => {
  const { data: session } = useSession()
  const { data: dataMe } = useQuery(GET_ME_DATA_AND_COMPANIES)

  return useMemo<null | number>(() => {
    return dataMe?.me?.hiringRoles?.find(
      (hR: { company: { id: string } }) => hR.company.id === session?.user?.selectedCompany
    )?.id
  }, [dataMe?.me, session?.user?.selectedCompany])
}
