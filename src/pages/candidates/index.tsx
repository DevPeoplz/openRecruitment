import React, { ReactNode, useMemo, useReducer, useState } from 'react'
import { LayoutSideMenu } from '@/components/layout/main/layout-side-menu'
import { ColumnDef } from '@tanstack/react-table'

import { makeData, Person } from './makeData'
import createHubTable from '@/components/table/hub-table'
import { useQuery } from '@apollo/client'
import {
  GET_HUB_CANDIDATES,
  get_hub_candidates_variables,
} from '@/components/graphql/queries'
import { useRouter } from 'next/router'
import { useFilterQueryParams } from '@/hooks/queryparams'
import CheckboxFilter from '@/components/table/filters/checkbox-filter'
import SelectFilter from '@/components/table/filters/select-filter'

type defaultColumnsProps = ColumnDef<Person> & { show?: boolean }

const defaultColumns: defaultColumnsProps[] = [
  {
    accessorKey: 'name',
    id: 'name',
    header: 'Name',
    cell: (info) => info.getValue(),
    show: true,
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

interface checkboxFilterType {
  stateKey: string
  show: boolean
  options: { label: string; value: string; count: number; checked: boolean }[]
}

interface selectFilterType {
  show: boolean
  placeholder: string
  options: {
    label: string
    value: string
    count: number
    selected: boolean
  }[]
}

interface filterDefType {
  [key: string]: {
    type: string
    param?: string
  }
}

interface ComponentDefType {
  [key: string]: {
    type: string
    props: { label: string } & (checkboxFilterType | selectFilterType)
  }
}

const filtersComponents: Record<string, React.FC<any>> = {
  checkbox: CheckboxFilter,
  select: SelectFilter,
}

const filtersDef: filterDefType = {
  status: {
    type: 'string',
  },
  score: {
    type: 'number',
  },
}

const ComponentDef: ComponentDefType = {
  status: {
    type: 'checkbox',
    props: {
      stateKey: 'status',
      label: 'Candidate Status',
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
  job: {
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

const componentsReducer = (
  state: ComponentDefType,
  action: { type: string; component: string; key: string; value: string }
) => {
  switch (action.type) {
    case 'updateCounts':
      return state
  }

  return state
}

const Page = () => {
  const {
    filters,
    dispatchFilters,
    data: dataHubCandidates,
    loading: loadingHubCandidates,
  } = useFilterQueryParams(
    filtersDef,
    GET_HUB_CANDIDATES,
    get_hub_candidates_variables
  )

  const [componentsStatus, dispatchComponentsStatus] = useReducer(
    componentsReducer,
    ComponentDef
  )

  const sidebar = (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto  border-gray-200 bg-white pt-3">
      {Object.entries(componentsStatus).map(([key, options]) => {
        const Component = filtersComponents[options.type]
        return (
          Component && (
            <Component
              key={key}
              {...options.props}
              dispatchQueryParams={dispatchFilters}
              dispatchComponentsStatus={dispatchComponentsStatus}
            />
          )
        )
      })}
    </div>
  )

  const [data, setData] = useState(() => makeData(20))

  const HubTableComponent = createHubTable<Person>()

  const defaultColumnVisibility = useMemo(() => {
    return defaultColumns.reduce((acc, col) => {
      if (col.id) {
        acc[col.id] = !!col.show
      }
      return acc
    }, {} as Record<string, boolean>)
  }, [])

  return (
    <LayoutSideMenu sidebar={sidebar}>
      <h1>Candidates</h1>
      <button
        onClick={() => {
          dispatchFilters({
            type: 'update',
            key: 'name',
            value: ['testingName', 'asdfasdfasdf'],
          })
        }}
      >
        NAME
      </button>
      <button
        onClick={() => {
          dispatchFilters({ type: 'update', key: 'name', value: '' })
        }}
      >
        DELETE NAME
      </button>
      <button
        onClick={() => {
          dispatchFilters({
            type: 'update',
            key: 'score',
            value: 'testingName',
          })
        }}
      >
        SCORE
      </button>
      <h2>{filters.name}</h2>
      <h2>{filters.score}</h2>
      <HubTableComponent
        data={
          loadingHubCandidates ? [] : dataHubCandidates?.findManyCandidate ?? []
        }
        defaultColumns={defaultColumns}
        {...(defaultColumnVisibility ? { defaultColumnVisibility } : {})}
      />
    </LayoutSideMenu>
  )
}

Page.auth = {}
export default Page
