import React, { ReactNode, useMemo, useReducer, useState } from 'react'
import { LayoutSideMenu } from '@/components/layout/main/layout-side-menu'
import { ColumnDef } from '@tanstack/react-table'

import { makeData, Person } from './makeData'
import HubTable, { createHubTable, useHubTable } from '@/components/table/hub-table'
import { useQuery } from '@apollo/client'
import { GET_HUB_CANDIDATES, get_hub_candidates_variables } from '@/components/graphql/queries'
import { useRouter } from 'next/router'
import { useFilterQueryParams } from '@/hooks/queryparams'
import CheckboxFilter from '@/components/table/filters/checkbox-filter'
import SelectFilter from '@/components/table/filters/select-filter'
import { ComponentDefType, Filters } from '@/components/filters/filters'
import { HubTableFilters } from '@/components/table/filters'

type defaultColumnsProps = ColumnDef<Person> & { show?: boolean }

const defaultColumns: defaultColumnsProps[] = [
  {
    accessorKey: 'name',
    id: 'name',
    header: 'Name',
    cell: (info) => info.getValue(),
    show: true,
    filterFn: 'arrIncludesSome',
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
]

interface filterDefType {
  [key: string]: {
    type: string
    param?: string
  }
}

const filtersDef: filterDefType = {
  status: {
    type: 'string',
  },
  name: {
    type: 'string',
  },
}

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
  const {
    filters,
    dispatchFilters,
    data: dataHubCandidates,
    loading: loadingHubCandidates,
  } = useFilterQueryParams(filtersDef, GET_HUB_CANDIDATES, get_hub_candidates_variables)

  const defaultColumnVisibility = useMemo(() => {
    return defaultColumns.reduce((acc, col) => {
      if (col.id) {
        acc[col.id] = !!col.show
      }
      return acc
    }, {} as Record<string, boolean>)
  }, [])

  const { table, tableStates } = useHubTable(
    'candidate-hub',
    loadingHubCandidates ? [] : dataHubCandidates?.findManyCandidate ?? [],
    defaultColumns,
    defaultColumnVisibility
  )

  //           <HubTableFilters table={table} tableStates={tableStates} />
  const sidebar = (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto  border-gray-200 bg-white pt-3">
      <Filters
        componentsDef={componentsDef}
        queryParams={[filters, dispatchFilters]}
        table={table}
      />
    </div>
  )

  return (
    <LayoutSideMenu sidebar={sidebar}>
      <h1>Candidates</h1>
      <HubTable table={table} tableStates={tableStates} />
    </LayoutSideMenu>
  )
}

Page.auth = {}
export default Page
