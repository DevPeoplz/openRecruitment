import React, { ReactNode, useEffect, useMemo, useReducer, useState } from 'react'
import { LayoutSideMenu } from '@/components/layout/main/layout-side-menu'
import { ColumnDef, Row } from '@tanstack/react-table'

import HubTable, {
  createHubTable,
  DefaultColumnsExtendedProps,
  useHubTable,
} from '@/components/table/hub-table'
import { useLazyQuery, useQuery } from '@apollo/client'
import {
  GET_CANDIDATE_BY_ID,
  get_candidate_by_id_variables,
  GET_HUB_CANDIDATES,
  get_hub_candidates_variables,
} from '@/components/graphql/queries'
import { useRouter } from 'next/router'
import { useFilterQueryParams } from '@/hooks/queryparams'
import CheckboxFilter from '@/components/table/filters/checkbox-filter'
import SelectFilter from '@/components/table/filters/select-filter'
import { ComponentDefType, Filters } from '@/components/filters/filters'
import { HubTableFilters } from '@/components/table/filters'
import ViewCandidateModal, { CandidateType } from '@/components/modals/view-candidate-modal'
import { CANDIDATE, AUDIT_LOGS } from '@/utils/mockdata'
import AddCandidate from '@/components/table/actions/add-candidate'

export type Person = {
  id: string
  name: string
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

const Page = () => {
  const { useHubTable, HubTable } = createHubTable<Person>()
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

  const [currentCandidate, setCurrentCandidate] = useState<CandidateType | null>(null)
  const [currentRow, setCurrentRow] = useState<Person | null>(null)
  const [
    loadCandidate,
    {
      called: calledCandidate,
      loading: loadingCandidate,
      data: dataCandidate,
      refetch: refetchCandidate,
    },
  ] = useLazyQuery(GET_CANDIDATE_BY_ID, {
    fetchPolicy: 'cache-and-network',
    variables: { where: { id: { equals: currentRow ? parseInt(currentRow?.id) : 0 } } },
  })

  useEffect(() => {
    const action = !calledCandidate ? loadCandidate : refetchCandidate
    if (currentRow && currentRow?.id != '') {
      action().then(() => {
        setCurrentCandidate(rowToCandidate(currentRow, dataCandidate))
      })
    }
  }, [calledCandidate, currentRow, currentRow?.id, dataCandidate, loadCandidate, refetchCandidate])

  return (
    <LayoutSideMenu sidebar={sidebar}>
      <h1>Candidates</h1>
      <HubTable
        table={table}
        tableStates={tableStates}
        rowOnClick={async (row) => {
          setCurrentRow(row.original)
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
        candidate={currentCandidate}
        logs={AUDIT_LOGS}
      />
    </LayoutSideMenu>
  )
}

const rowToCandidate = (row: Person, data: any): CandidateType => {
  const candidate = {
    id: parseInt(row.id),
    name: row.name,
    email: data?.findManyCandidate[0]?.email,
    phone: data?.findManyCandidate[0]?.phone,
    tagSource: {
      tag: [
        { id: 'tag1', name: 'tag1' },
        { id: 'tag2', name: 'tag2' },
      ],
      source: [
        { id: 'source1', name: 'source1' },
        { id: 'source2', name: 'source2' },
      ],
    },
  }

  return candidate
}

Page.auth = {}
export default Page
