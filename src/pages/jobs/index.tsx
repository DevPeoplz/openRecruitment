import React from 'react'
import LayoutAuthenticated from '@/components/layout/layout-authenticated'
import { GetServerSidePropsContext } from 'next/types'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { LayoutSideMenu } from '@/components/layout/main/layout-side-menu'
import Loader from '@/components/ui/loader'
import LayoutTabs from '@/components/layout/layout-tabs'
import { ArrowTrendingUpIcon, ArchiveBoxArrowDownIcon } from '@heroicons/react/24/outline'
import ActiveJobs from '@/components/views/jobs/active-jobs'
import ArchivedJobs from '@/components/views/jobs/archived-jobs'

const TABS = [
  {
    name: 'Active jobs',
    icon: <ArrowTrendingUpIcon className="h-5 w-5" />,
    component: <ActiveJobs />,
  },
  {
    name: 'Archived',
    icon: <ArchiveBoxArrowDownIcon className="h-5 w-5" />,
    component: <ArchivedJobs />,
  },
]

const Page = () => {
  return (
    <LayoutTabs tabs={TABS}>
      <p className={'text-xl text-primary-50'}>Jobs</p>
    </LayoutTabs>
  )
}
Page.auth = {
  loading: (
    <LayoutAuthenticated>
      <LayoutSideMenu>
        <Loader />
      </LayoutSideMenu>
    </LayoutAuthenticated>
  ),
}

export default Page
