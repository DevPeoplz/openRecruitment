import React, { useState } from 'react'
import HubTable, {
  createHubTable,
  DefaultColumnsExtendedProps,
  useHubTable,
} from '@/components/table/hub-table'

type Job = {
  id: number
  name: string
}

const defaultColumns: DefaultColumnsExtendedProps<Job> = [
  {
    accessorKey: 'name',
    id: 'name',
    header: 'Title',
    cell: (info) => info.getValue(),
    show: true,
    filterFn: 'arrIncludesSome',
    filterComponent: 'select',
  },
  {
    accessorKey: 'candidates',
    id: 'candidates',
    header: 'Candidates',
    cell: (info) => info.getValue(),
    show: true,
  },
  {
    accessorKey: 'hires',
    id: 'hires',
    header: 'Hires',
    cell: (info) => info.getValue(),
    show: true,
  },
  {
    accessorKey: 'department',
    id: 'department',
    header: 'Department',
    cell: (info) => info.getValue(),
    show: true,
  },
  {
    accessorKey: 'location',
    id: 'location',
    header: 'Location',
    cell: (info) => info.getValue(),
    show: true,
  },
  {
    accessorKey: 'region',
    id: 'region',
    header: 'State/Region',
    cell: (info) => info.getValue(),
    show: true,
  },
  {
    accessorKey: 'scheduledPublish',
    id: 'scheduledPublish',
    header: 'Scheduled Publish',
    cell: (info) => info.getValue(),
    show: true,
  },
  {
    accessorKey: 'scheduledClose',
    id: 'scheduledClose',
    header: 'Scheduled Close',
    cell: (info) => info.getValue(),
    show: true,
  },
  {
    accessorKey: 'tags',
    id: 'tags',
    header: 'Tags',
    cell: (info) => info.getValue(),
    show: true,
  },
]

const ActiveJobs = () => {
  const { useHubTable, HubTable } = createHubTable<Job>()
  const [currentRow, setCurrentRow] = useState<Job | null>(null)

  const { table, tableStates } = useHubTable('candidate-hub', [], defaultColumns)

  return (
    <HubTable
      table={table}
      tableStates={tableStates}
      rowOnClick={(row) => {
        console.log(row)
      }}
    />
  )
}

export default ActiveJobs
