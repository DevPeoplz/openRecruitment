import React, { useMemo } from 'react'
import Link from 'next/link'
import { GET_ME_COMPANIES } from '@/graphql-operations/queries'
import { useQuery } from '@apollo/client'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { Tooltip } from 'react-tooltip'

export function Logo() {
  const { data } = useQuery(GET_ME_COMPANIES)
  const { data: session } = useSession()

  const companyInfo = useMemo(() => {
    const company = data?.me?.hiringRoles?.find(
      (hr: { company: { id: any } }) => hr.company.id === session?.user.selectedCompany
    )?.company
    return {
      logo: company?.logo?.path ?? null,
      name: company?.name,
    }
  }, [data?.me?.hiringRoles, session?.user.selectedCompany])

  return (
    <Link href="/" aria-label="Home" className={'w-10'}>
      <div className="flex h-10 w-full items-center justify-center rounded border-2 border-primary-500 bg-primary-400">
        <div className="text-primary-500">
          {companyInfo.logo ? (
            <div>
              <Image
                data-tooltip-id="companyLogo"
                data-tooltip-content={companyInfo.name}
                src={companyInfo.logo}
                width={30}
                height={30}
                alt={'Logo'}
              />
              <Tooltip id={'companyLogo'} className={'z-50'} />
            </div>
          ) : (
            'Logo'
          )}
        </div>
      </div>
    </Link>
  )
}
