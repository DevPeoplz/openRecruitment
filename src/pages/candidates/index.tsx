import React, { ReactNode, useMemo, useReducer, useState } from 'react'
import { LayoutSideMenu } from '@/components/layout/main/layout-side-menu'
import { ColumnDef } from '@tanstack/react-table'

import HubTable, {
  createHubTable,
  DefaultColumnsExtendedProps,
  useHubTable,
} from '@/components/table/hub-table'
import { useQuery } from '@apollo/client'
import { GET_HUB_CANDIDATES, get_hub_candidates_variables } from '@/components/graphql/queries'
import { useRouter } from 'next/router'
import { useFilterQueryParams } from '@/hooks/queryparams'
import CheckboxFilter from '@/components/table/filters/checkbox-filter'
import SelectFilter from '@/components/table/filters/select-filter'
import { ComponentDefType, Filters } from '@/components/filters/filters'
import { HubTableFilters } from '@/components/table/filters'
import CandidateModal from '@/components/modals/candidate-modal'
import { CANDIDATE, AUDIT_LOGS } from '@/utils/mockdata'

export type Person = {
  firstName: string
  lastName: string
  age: number
  visits: number
  progress: number
  status: 'relationship' | 'complicated' | 'single'
  subRows?: Person[]
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
    cell: (info) => info.getValue(),
    show: true,
  },
  {
    accessorKey: 'job',
    id: 'job',
    header: 'Job',
    cell: (info) => info.getValue(),
    show: true,
    filterFn: 'arrIncludesSome',
    filterComponent: 'select',
  },
  {
    accessorKey: 'stage',
    id: 'stage',
    header: 'Stage',
    cell: (info) => info.getValue(),
    show: true,
  },
  {
    accessorKey: 'jobFitScore',
    id: 'jobFitScore',
    header: 'Job Fit Score',
    cell: (info) => info.getValue(),
    show: true,
    filterFn: 'arrIncludesSome',
    filterComponent: 'select',
  },
  {
    accessorKey: 'dateCreated',
    id: 'dateCreated',
    header: 'Date Created',
    cell: (info) => info.getValue(),
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
    accessorKey: 'talentPool',
    id: 'talentPool',
    header: 'Talent Pool',
    cell: (info) => info.getValue(),
    show: true,
    filterFn: 'arrIncludesSome',
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
const componentsDef: ComponentDefType = {
  job: {
    type: 'checkbox',
    props: {
      stateKey: 'job',
      label: 'Job',
      options: [
        { label: 'Qualified', value: 'qualified', count: 10, checked: false },
        {
          label: 'Disqualified',
          value: 'disqualified',
          count: 1,
          checked: false,
        },
        { label: 'New', value: 'new', count: 2, checked: false },
        { label: 'Overdue', value: 'overdue', count: 0, checked: false },
      ],
      show: true,
    },
  },
  talentPool: {
    type: 'checkbox',
    props: {
      stateKey: 'talentPool',
      label: 'Talent Pool',
      options: [
        { label: 'Qualified', value: 'qualified', count: 10, checked: false },
        {
          label: 'Disqualified',
          value: 'disqualified',
          count: 1,
          checked: false,
        },
        { label: 'New', value: 'new', count: 2, checked: false },
        { label: 'Overdue', value: 'overdue', count: 0, checked: false },
      ],
      show: true,
    },
  },
  jobFitScore: {
    type: 'checkbox',
    props: {
      stateKey: 'jobFitScore',
      label: 'Job Fit Score',
      options: [
        { label: 'Qualified', value: 'qualified', count: 10, checked: false },
        {
          label: 'Disqualified',
          value: 'disqualified',
          count: 1,
          checked: false,
        },
        { label: 'New', value: 'new', count: 2, checked: false },
        { label: 'Overdue', value: 'overdue', count: 0, checked: false },
      ],
      show: true,
    },
  },
  job2: {
    type: 'select2',
    props: {
      label: 'In Job',
      placeholder: 'add a job',
      show: true,
      options: [
        {
          label: 'Job 1',
          value: 'job1',
          count: 10,
          selected: true,
        },
        {
          label: 'Job 2',
          value: 'job2',
          count: 10,
          selected: true,
        },
        {
          label: 'Job 3',
          value: 'job3',
          count: 10,
          selected: false,
        },
      ],
    },
  },
}

const Page = () => {
  const { useHubTable, HubTable } = createHubTable<Person>()
  /*const {
    filters,
    dispatchFilters,
    data: dataHubCandidates,
    loading: loadingHubCandidates,
  } = useFilterQueryParams(filtersDef, GET_HUB_CANDIDATES, get_hub_candidates_variables)
*/

  const { data: dataHubCandidates, loading: loadingHubCandidates } = useQuery(GET_HUB_CANDIDATES)

  const [seeCandidate, setSeeCandidate] = useState(false)

  const { table, tableStates } = useHubTable(
    'candidate-hub',
    loadingHubCandidates ? [] : dataHubCandidates?.findManyCandidate ?? [],
    defaultColumns
  )

  //           <HubTableFilters table={table} tableStates={tableStates} />
  const sidebar = (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto  border-gray-200 bg-white pt-3">
      <Filters defaultColumns={defaultColumns} table={table} tableStates={tableStates} />
    </div>
  )

  return (
    <LayoutSideMenu sidebar={sidebar}>
      <h1>Candidates</h1>
      <HubTable table={table} tableStates={tableStates} rowOnClick={() => setSeeCandidate(true)} />
      <CandidateModal
        isOpen={seeCandidate}
        setIsOpen={setSeeCandidate}
        candidate={CANDIDATE}
        logs={AUDIT_LOGS}
      />
    </LayoutSideMenu>
  )
}

Page.auth = {}
export default Page
