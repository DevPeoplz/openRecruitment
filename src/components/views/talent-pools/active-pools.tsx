import React from 'react'
import HubTable, { createHubTable, DefaultColumnsExtendedProps } from '@/components/table/hub-table'
import { useQuery } from '@apollo/client'
import { GET_HUB_POOLS } from '@/graphql-operations/queries'
import { useRouter } from 'next/router'
import { ButtonIconSimpleModal } from '@/components/table/actions/add-candidate'
import { AddTalentPoolView } from '@/components/views/talent-pools/add-talent-pool-view'

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
    accessorKey: 'createdAt',
    id: 'createdAt',
    header: 'Created At',
    cell: (info) => {
      // convert iso string to date on local time with date-fns
      const date = new Date(info.getValue() as string)
      return date.toLocaleString()
    },
    show: true,
  },
]

const ActivePools = () => {
  const router = useRouter()
  const { useHubTable, HubTable } = createHubTable<Job>()
  const { data: dataHubPools, loading: loadingHubPools } = useQuery(GET_HUB_POOLS, {
    fetchPolicy: 'cache-and-network',
  })

  const { table, tableStates } = useHubTable(
    'pools-hub',
    loadingHubPools ? [] : dataHubPools?.findManyTalentPool ?? [],
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
        <ButtonIconSimpleModal
          tooltip={'Add Talent Pool'}
          modalTitle={'Add New Talent Pool'}
          btnClassName="!bg-amber-400 hover:!bg-amber-200"
        >
          <AddTalentPoolView />
        </ButtonIconSimpleModal>
      </HubTable.Toolbar>
    </HubTable>
  )
}

export default ActivePools
