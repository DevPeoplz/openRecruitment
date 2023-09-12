import React, { useMemo, useState } from 'react'
import { LayoutSideMenu } from '@/components/layout/main/layout-side-menu'
import { ColumnDef } from '@tanstack/react-table'

import { makeData, Person } from './makeData'
import createHubTable from '@/components/table/hub-table'
import { useQuery } from '@apollo/client'
import { GET_HUB_CANDIDATES, get_hub_candidates_variables } from '@/components/graphql/queries'
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

const Page = () => {
  const [filters, setfilters] = useState({
    CheckboxFilter: {
      label: 'Candidate Status',
      show: true,
      options: [
        { label: 'Qualified', value: 'qualified', count: 10, checked: true },
        { label: 'Disqualified', value: 'disqualified', count: 1, checked: true },
        { label: 'New', value: 'new', count: 2, checked: false },
        { label: 'Overdue', value: 'overdue', count: 0, checked: false },
      ],
    },
    SelectFilter: {
      id: 'job-filter',
      show: true,
      label: 'In Job',
      placeholder: 'add a job',
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
  })
  const sidebar = (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto  border-gray-200 bg-white pt-3">
      <CheckboxFilter
        label={filters.CheckboxFilter.label}
        options={filters.CheckboxFilter.options}
        show={filters.CheckboxFilter.show}
        setShow={() =>
          setfilters({ ...filters, CheckboxFilter: { ...filters.CheckboxFilter, show: false } })
        }
        setOptions={(
          options: { label: string; value: string; count: number; checked: boolean }[]
        ) => setfilters({ ...filters, CheckboxFilter: { ...filters.CheckboxFilter, options } })}
      />
      <SelectFilter
        label={filters.SelectFilter.label}
        options={filters.SelectFilter.options}
        show={filters.SelectFilter.show}
        setShow={() =>
          setfilters({ ...filters, SelectFilter: { ...filters.SelectFilter, show: false } })
        }
        placeholder={filters.SelectFilter.placeholder}
        setOption={setfilters}
      />
    </div>
  )

  const [data, setData] = useState(() => makeData(20))
  const {
    data: dataHubCandidates,
    loading: loadingHubCandidates,
    refetch,
  } = useQuery(GET_HUB_CANDIDATES, {
    variables: get_hub_candidates_variables(),
  })

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
      <HubTableComponent
        data={loadingHubCandidates ? [] : dataHubCandidates?.findManyCandidate ?? []}
        defaultColumns={defaultColumns}
        {...(defaultColumnVisibility ? { defaultColumnVisibility } : {})}
      />
    </LayoutSideMenu>
  )
}

Page.auth = {}
export default Page
