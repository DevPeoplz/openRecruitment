import React, { useEffect, useState } from 'react'
import HubTable, {
  createHubTable,
  DefaultColumnsExtendedProps,
  useHubTable,
} from '@/components/table/hub-table'
import { useLazyQuery, useQuery } from '@apollo/client'
import { GET_CANDIDATE_BY_ID, GET_HUB_CANDIDATES, GET_HUB_JOBS } from '@/components/graphql/queries'
import ViewCandidateModal, { CandidateType } from '@/components/modals/view-candidate-modal'
import { LayoutSideMenu } from '@/components/layout/main/layout-side-menu'
import AddCandidate from '@/components/table/actions/add-candidate'
import { AUDIT_LOGS } from '@/utils/mockdata'
import { Person } from '@/pages/candidates'
import { PlusIcon } from '@heroicons/react/20/solid'
import { Tooltip } from 'react-tooltip'
import { ModalControlContext } from '@/hooks/contexts'
import AddCandidateModal from '@/components/modals/add-candidate-modal'
import { router } from 'next/client'
import { useRouter } from 'next/router'

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
        .map((candidate) => {
          return candidate.candidate?.name
        })
        .filter((e) => e)
    },
    id: 'candidates',
    header: 'Candidates',
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
    accessorFn: (originalRow) => {
      return originalRow.candidates
        .map((candidate) => {
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
        .map((tag) => {
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
  const { data: dataHubOffers, loading: loadingHubOffers } = useQuery(GET_HUB_JOBS)

  const { table, tableStates } = useHubTable(
    'jobs-hub',
    loadingHubOffers ? [] : dataHubOffers?.findManyOffer ?? [],
    defaultColumns
  )

  return (
    <HubTable
      table={table}
      tableStates={tableStates}
      rowOnClick={async (row) => {
        console.log(row)
      }}
    >
      <HubTable.Toolbar>
        <div data-tooltip-id="button-tooltip">
          <button
            className="relative cursor-pointer rounded-md bg-primary-400 p-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-200"
            id="button-tooltip"
            onClick={() => router.push('/add-offer')}
          >
            <PlusIcon className="h-5 w-5 text-white" />
          </button>
          <Tooltip place="top" id="button-tooltip" className="capitalize">
            <span>Add Job Offer</span>
          </Tooltip>
        </div>
      </HubTable.Toolbar>
    </HubTable>
  )
}

export default ActiveJobs
