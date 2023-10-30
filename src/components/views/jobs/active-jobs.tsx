import React from 'react'
import HubTable, { createHubTable, DefaultColumnsExtendedProps } from '@/components/table/hub-table'
import { useQuery } from '@apollo/client'
import { GET_HUB_JOBS } from '@/graphql-operations/queries'
import { useRouter } from 'next/router'
import { ButtonIconSimpleModal } from '@/components/table/actions/add-candidate'
import { AddJobView } from '@/components/views/jobs/add-job-view'
import Link from 'next/link'

type Job = {
  id: number
  name: string
  department: {
    name: string
  }
  location: string
  region: string
  scheduledPublish: string
  scheduledClose: string
  tags: {
    tag: {
      name: string
    }
  }[]
  candidates: {
    candidate: {
      id: number
      name: string
    }
    isHired: boolean
  }[]
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
    accessorFn: (originalRow) => {
      return originalRow.candidates
        ?.map((candidate) => {
          return { id: candidate.candidate?.id, name: candidate.candidate?.name }
        })
        .filter((e) => !!e.id)
    },
    id: 'candidates',
    header: 'Candidates',
    cell: (info) => {
      const value = info.getValue() as { id: number; name: string }[]
      const row = info.row.id
      return (
        <ul className="list-disc">
          {value?.map((val, index) => (
            <li key={btoa(`${row}${val.id}${index}`)}>
              <Link className="hover:text-primary-400" href={`/candidate/${val.id}`}>
                {val.name}
              </Link>
            </li>
          ))}
        </ul>
      )
    },
    show: true,
  },
  {
    accessorFn: (originalRow) => {
      return originalRow.candidates
        ?.map((candidate) => {
          return candidate.isHired ? candidate.candidate?.name : null
        })
        .filter((e) => e)
    },
    id: 'hires',
    header: 'Hires',
    cell: (info) => {
      const value = info.getValue() as string[]
      const row = info.row.id
      return (
        <ul className="list-disc">
          {value?.map((val, index) => (
            <li key={btoa(`${row}${val}${index}`)}>{val}</li>
          ))}
        </ul>
      )
    },
    show: true,
  },
  {
    accessorKey: 'department.name',
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
    cell: (info) => {
      // convert iso string to date on local time with date-fns
      const date = new Date(info.getValue() as string)
      return date.toLocaleString()
    },
    show: true,
  },
  {
    accessorKey: 'scheduledClose',
    id: 'scheduledClose',
    header: 'Scheduled Close',
    cell: (info) => {
      // convert iso string to date on local time with date-fns
      const date = new Date(info.getValue() as string)
      return date.toLocaleString()
    },
    show: true,
  },
  {
    accessorFn: (originalRow) => {
      return originalRow.tags
        ?.map((tag) => {
          return tag.tag?.name
        })
        .filter((e) => e)
    },
    id: 'tags',
    header: 'Tags',
    cell: (info) => {
      const value = info.getValue() as string[]
      const row = info.row.id
      return (
        <div className="inline">
          {value?.map((val, index) => (
            <span
              className="mr-1 rounded-xl border-2 border-solid border-primary-200 p-1 leading-3"
              key={btoa(`${row}${val}${index}`)}
            >
              {val}
            </span>
          ))}
        </div>
      )
    },
    show: true,
  },
]

const ActiveJobs = () => {
  const router = useRouter()
  const { useHubTable, HubTable } = createHubTable<Job>()
  const { data: dataHubOffers, loading: loadingHubOffers } = useQuery(GET_HUB_JOBS, {
    fetchPolicy: 'cache-and-network',
  })

  const { table, tableStates } = useHubTable(
    'jobs-hub',
    loadingHubOffers ? [] : dataHubOffers?.findManyOffer ?? [],
    defaultColumns
  )

  return (
    <HubTable table={table} tableStates={tableStates}>
      <HubTable.Toolbar>
        <ButtonIconSimpleModal
          tooltip={'Add a Job'}
          modalTitle={'Add New Job'}
          btnClassName="!bg-primary-400 hover:!bg-primary-200"
        >
          <AddJobView />
        </ButtonIconSimpleModal>
      </HubTable.Toolbar>
    </HubTable>
  )
}

export default ActiveJobs
