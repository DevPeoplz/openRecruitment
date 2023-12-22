import React, { FC, Fragment, useMemo, useState } from 'react'
import { ActivityTab, FileTab, OverviewTab } from './tabs'
import Loader from '@/components/ui/loader'
import { ApolloQueryResult, useQuery } from '@apollo/client'
import { GET_JOB_BY_ID } from '@/graphql-operations/queries'
import { find } from 'lodash'
import { formatDistance } from 'date-fns'
import { Tabs } from '@/components/ui/tabs'
import { BriefcaseIcon } from '@heroicons/react/24/outline'

type Props = {
  jobId?: string | number
}

const tabs = [
  {
    id: 'overview',
    name: 'Overview',
    component: OverviewTab,
  },
  {
    id: 'file',
    name: 'File',
    component: FileTab,
  },
  {
    id: 'activity',
    name: 'Activity',
    component: ActivityTab,
  },
]

export const JobContext = React.createContext<
  | [
      JobType,
      (
        variables?:
          | Partial<{
              where: { id: number }
            }>
          | undefined
      ) => Promise<ApolloQueryResult<any>>
    ]
  | null
>(null)

export const JobView: FC<Props> = ({ jobId }) => {
  const [tabSelected, setTabSelected] = useState('overview')

  const { loading, data, refetch, error } = useQuery<{ findUniqueOffer: JobType }>(GET_JOB_BY_ID, {
    fetchPolicy: 'cache-and-network',
    variables: { where: { id: parseInt(String(jobId)) } },
  })

  const job = data?.findUniqueOffer

  const createdAgo = useMemo(() => {
    if (job?.createdAt) {
      return formatDistance(new Date(job.createdAt), new Date(), { addSuffix: true })
    }

    return 0
  }, [job])

  if (loading) return <Loader />
  if (!jobId || !job || error) return <Loader className="border-red-500" />

  const Tab = find(tabs, { id: tabSelected })?.component ?? Fragment

  return (
    <JobContext.Provider value={[job, refetch]}>
      <div className="flex h-full w-full gap-0.5">
        <div className="w-full overflow-y-auto px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="group relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-full">
                <BriefcaseIcon className={'h-10 w-10 rounded-full bg-primary-400'} />
              </div>
              <div>
                <h3>{job.name}</h3>
                <p className="text-gray-600">{`Added ${createdAgo}`}</p>
              </div>
            </div>
            <div>Following</div>
          </div>
          <div className="mb-4 mt-2">
            <Tabs tabs={tabs} current={tabSelected} onTabClick={(tab) => setTabSelected(tab)} />
          </div>
          <div className={'w-full'}>{<Tab />}</div>
        </div>
      </div>
    </JobContext.Provider>
  )
}

export type JobType = {
  id: number
  name: string
  createdAt: string
  pipelineTemplate: {
    id: number
    stages: {
      id: number
      category: string
      position: number
    }[]
  }
  matches: {
    id: number
    stage: JobType['pipelineTemplate']['stages'][0]
    candidate: {
      id: number
      firstName: string
      lastName: string
      avatar: {
        path: string
      }
      averageScore: number
    }
  }[]
}
