import React from 'react'
import type { NextPageWithLayout } from '../_app'
import { GetServerSidePropsContext } from 'next'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import LayoutAuthenticated from '@/components/layout/layout-authenticated'
import { useRedirectionFlag } from '@/hooks/redirection'
import { LayoutSideMenu } from '@/components/layout/main/layout-side-menu'
import { useQuery } from '@apollo/client'
import { useSession } from 'next-auth/react'
import Loader from '@/components/ui/loader'
import AppliedGraph from '@/components/dashboard/applied-graph'
import FilterTag from '@/components/dashboard/filter-tag'
import type { Tag as FilterTagType } from '@/components/dashboard/filter-tag'

import {
  GET_ME_DATA_AND_COMPANIES,
  GET_DASHBOARD_COUNTS,
  get_tagSources_variables,
  GET_TAGSOURCES,
  get_recently_work_on_variables,
  GET_RECENTLY_WORK_ON,
} from '@/graphql-operations/queries'
import { BriefcaseIcon, UserGroupIcon, UserIcon } from '@heroicons/react/24/outline'
import RecentlyWorkOn, { RecentlyWorkOnType } from '@/components/dashboard/recently-work-on'

export const countComponents = [
  {
    icon: UserIcon,
    title: 'Candidates',
    query: 'countCandidate',
  },
  {
    icon: BriefcaseIcon,
    title: 'Job openings',
    query: 'countOffer',
  },
  {
    icon: UserGroupIcon,
    title: 'Talent Pools',
    query: 'countTalentPool',
  },
]

const filterTagSourceData = (
  tagSource: { id: number; name: string; count: Record<string, string>[] }[] | undefined
): FilterTagType[] => {
  const filterTags: FilterTagType[] = []

  if (tagSource) {
    tagSource.map((tag: { id: number; name: string; count: Record<string, string>[] }) => {
      filterTags.push({
        id: tag?.id,
        name: tag?.name,
        number: tag?.count?.length ?? 0,
      })
    })
  }

  return filterTags
}

const filterLogData = (
  logs: { eventDetails: { candidate?: object; offer?: object } }[] | undefined
): RecentlyWorkOnType[] => {
  const filtered: RecentlyWorkOnType[] = []

  if (logs) {
    logs.map(
      ({
        eventDetails,
      }: {
        eventDetails: {
          candidate?: { id?: number; name?: string }
          offer?: { id?: number; name?: string }
        }
      }) => {
        if (eventDetails?.candidate) {
          filtered.push({
            icon: UserIcon,
            description: eventDetails.candidate.name ?? '',
            href: `/candidate/${eventDetails.candidate.id}`,
          })
        } else if (eventDetails?.offer) {
          filtered.push({
            icon: BriefcaseIcon,
            description: eventDetails.offer.name ?? '',
            href: `/offer/${eventDetails.offer.id}`,
          })
        }
      }
    )
  }

  return filtered
}

const Dashboard: NextPageWithLayout = () => {
  const { data: session } = useSession()
  const { data: meCompany, loading } = useQuery(GET_ME_DATA_AND_COMPANIES)
  const { data: counts, loading: loadingCounts } = useQuery(GET_DASHBOARD_COUNTS, {
    fetchPolicy: 'cache-and-network',
  })
  const { data: tagSourceData } = useQuery(GET_TAGSOURCES, {
    variables: get_tagSources_variables(),
    fetchPolicy: 'cache-and-network',
  })
  const { data: logData } = useQuery(GET_RECENTLY_WORK_ON, {
    variables: get_recently_work_on_variables(session?.user?.email),
  })

  const company = session?.user?.selectedCompany
    ? meCompany?.me.hiringRoles.filter(
        (company: { _typename: string; name: string; id: string }) =>
          company.id === session?.user?.selectedCompany
      )[0].company
    : {}

  useRedirectionFlag()

  return (
    <LayoutSideMenu>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex w-full flex-col gap-4 px-2">
          <div className="grid w-full grid-cols-4 gap-1 divide-x-2">
            <div className="flex flex-col">
              <p className="font-bold">{company.name}</p>
              <p>{meCompany?.me.email}</p>
            </div>
            {countComponents.map((countElement) => (
              <div className="flex items-center gap-2 px-4 text-base" key={countElement.title}>
                <countElement.icon className="h-6 w-6" />
                <p>{countElement.title}</p>
                <>
                  {loadingCounts && <Loader size={'h-6 w-6'} fullScreen={false} />}
                  {!loadingCounts && (
                    <p className="font-bold">
                      {counts && counts[countElement.query] ? counts[countElement.query] : 0}
                    </p>
                  )}
                </>
              </div>
            ))}
          </div>
          {logData?.findManyAuditLog?.length > 0 && (
            <RecentlyWorkOn logs={filterLogData(logData?.findManyAuditLog)} />
          )}
          <AppliedGraph />
          <div className="grid w-full grid-cols-2 gap-1">
            <FilterTag tagData={filterTagSourceData(tagSourceData?.tags)} label="Tag" />
            <FilterTag tagData={filterTagSourceData(tagSourceData?.sources)} label="Source" />
          </div>
        </div>
      )}
    </LayoutSideMenu>
  )
}

Dashboard.auth = {
  permission: 'SUPERADMIN',
  loading: (
    <LayoutAuthenticated>
      <LayoutSideMenu>
        <Loader />
      </LayoutSideMenu>
    </LayoutAuthenticated>
  ),
}

export default Dashboard

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions)

  return { props: { session } }
}
