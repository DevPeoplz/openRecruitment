import React, { useEffect, useState } from 'react'
import { LayoutSideMenu } from '@/components/layout/main/layout-side-menu'
import { createHubTable, DefaultColumnsExtendedProps } from '@/components/table/hub-table'
import { useLazyQuery, useQuery } from '@apollo/client'
import { GET_CANDIDATE_BY_ID, GET_HUB_CANDIDATES } from '@/graphql-operations/queries'
import ViewCandidateModal from '@/components/modals/view-candidate-modal'
import { AUDIT_LOGS } from '@/utils/mockdata'
import AddCandidate from '@/components/table/actions/add-candidate'
import { CandidateType } from '@/components/views/candidate/candidate-view'

export type Person = {
  id: number
  name: string
  firstName: string
  lastName: string
  age: number
  visits: number
  progress: number
  status: 'relationship' | 'complicated' | 'single'
  subRows?: Person[]
  job: { offer: { name: string }; stage: { category: string } }[]
  talentPool: { talentPool: { name: string } }[]
  jobFitScore: number
}

const defaultColumns: DefaultColumnsExtendedProps<Person> = [
  {
    accessorKey: 'name',
    id: 'name',
    header: 'Name',
    cell: (info) => info.getValue(),
    show: true,
    filterFn: 'arrIncludesSome',
    filterComponent: 'select',
  },
  {
    accessorKey: 'averageScore',
    id: 'averageScore',
    header: 'Average Score',
    cell: (info) => {
      return `${info.getValue()}%`
    },
    show: true,
  },
  {
    accessorFn: (originalRow) => {
      return originalRow.job
        .map((job) => {
          return job.offer?.name
        })
        .filter((e) => e)
    },
    id: 'job',
    header: 'Job',
    cell: (info) => {
      const job = info.getValue() as string[]
      const row = info.row.id
      return (
        <ul className="list-disc">
          {job?.map((job) => (
            <li key={btoa(`${row}${job}`)}>{job}</li>
          ))}
        </ul>
      )
    },
    show: true,
    filterFn: 'arrIncludesSome',
    filterComponent: 'select',
  },
  {
    accessorFn: (originalRow) => {
      return originalRow.job
        .map((job) => {
          return job.stage?.category
        })
        .filter((e) => e)
    },
    id: 'stage',
    header: 'Stage',
    cell: (info) => {
      const stage = info.getValue() as string[]
      const row = info.row.id
      return (
        <ul className="list-disc">
          {stage?.map((stage, index) => (
            <li key={btoa(`${row}${stage}${index}`)}>{stage}</li>
          ))}
        </ul>
      )
    },
    show: true,
  },
  {
    accessorKey: 'jobFitScore',
    accessorFn: (originalRow) => {
      return originalRow.jobFitScore.toString()
    },
    id: 'jobFitScore',
    header: 'Job Fit Score',
    cell: (info) => {
      return `${info.getValue()}%`
    },
    show: true,
    filterFn: 'arrIncludesSome',
    filterComponent: 'select',
  },
  {
    accessorKey: 'dateCreated',
    id: 'dateCreated',
    header: 'Date Created',
    cell: (info) => {
      // convert iso string to date on local time with date-fns
      const date = new Date(info.getValue() as string)
      return date.toLocaleString()
    },
    show: true,
  },
  {
    accessorKey: 'source',
    id: 'source',
    header: 'Source',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'tag',
    id: 'tag',
    header: 'Tag',
    cell: (info) => info.getValue(),
  },
  {
    accessorFn: (originalRow) => {
      return originalRow.talentPool
        .map((talentPool) => {
          return talentPool.talentPool?.name
        })
        .filter((e) => e)
    },
    id: 'talentPool',
    header: 'Talent Pool',
    cell: (info) => {
      const talentPool = info.getValue() as string[]
      const row = info.row.id
      return (
        <ul className="list-[square]">
          {talentPool?.map((talentPool) => (
            <li key={btoa(`${row}${talentPool}`)}>{talentPool}</li>
          ))}
        </ul>
      )
    },
    show: true,
    filterFn: 'arrIncludesSome',
    filterComponent: 'select',
  },
  {
    accessorKey: 'disqualifiedBy',
    id: 'disqualifiedBy',
    header: 'Disqualified By',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'disqualifyDate',
    id: 'disqualifyDate',
    header: 'Disqualify Date',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'integrations',
    id: 'integrations',
    header: 'Integrations',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'lastActivity',
    id: 'lastActivity',
    header: 'Last Activity',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'hireDate',
    id: 'hireDate',
    header: 'Hire Date',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'startDate',
    id: 'startDate',
    header: 'Start Date',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'autoFitEnabled',
    id: 'autoFitEnabled',
    header: 'Auto Fit Enabled',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'status',
    id: 'status',
    header: 'Status',
    cell: (info) => info.getValue(),
    filterFn: 'arrIncludesSome',
    filterComponent: 'checkbox',
    defaultCheckboxOptions: [
      { label: 'Qualified', value: 'qualified' },
      { label: 'Disqualified', value: 'disqualified' },
      { label: 'New', value: 'new' },
      { label: 'Overdue', value: 'overdue' },
    ],
  },
]

const Page = () => {
  const { useHubTable, HubTable, HubTableFilters } = createHubTable<Person>()
  const { data: dataHubCandidates, loading: loadingHubCandidates } = useQuery(GET_HUB_CANDIDATES)
  const [seeCandidate, setSeeCandidate] = useState(false)

  const { table, tableStates } = useHubTable(
    'candidate-hub',
    loadingHubCandidates ? [] : dataHubCandidates?.findManyCandidate ?? [],
    defaultColumns
  )

  const [currentCandidate, setCurrentCandidate] = useState<number | undefined>(undefined)

  return (
    <LayoutSideMenu>
      <LayoutSideMenu.Sidebar>
        <div className="flex grow flex-col gap-y-5 overflow-y-auto  border-gray-200 bg-white pt-3">
          <HubTableFilters defaultColumns={defaultColumns} table={table} />
        </div>
      </LayoutSideMenu.Sidebar>
      <h1>Candidates</h1>
      <HubTable
        table={table}
        tableStates={tableStates}
        rowOnClick={async (row) => {
          setCurrentCandidate(row.original.id)
          setSeeCandidate(true)
        }}
      >
        <HubTable.Toolbar>
          <AddCandidate key="add-candidate" />
        </HubTable.Toolbar>
      </HubTable>
      <ViewCandidateModal
        isOpen={seeCandidate}
        setIsOpen={setSeeCandidate}
        candidateId={currentCandidate}
      />
    </LayoutSideMenu>
  )
}

Page.auth = {}
export default Page
