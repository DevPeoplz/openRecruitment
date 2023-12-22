import React from 'react'
import useCreateHubTable, { DefaultColumnsExtendedProps } from '@/components/table/hub-table'
import { useQuery } from '@apollo/client'
import { GET_HUB_POOLS } from '@/graphql-operations/queries'
import { useRouter } from 'next/router'
import { ButtonIconSimpleModal } from '@/components/table/actions/add-candidate'
import { AddTalentPoolView } from '@/components/views/talent-pools/add-talent-pool-view'
import Link from 'next/link'
import { DeleteRecord } from '@/components/views/delete-record'

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
        .map((candidate) => {
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
  {
    accessorKey: 'edit',
    id: 'edit',
    header: 'Edit',
    cell: (info) => {
      const id = info.row.original.id
      return <DeleteRecord id={id} name={info.row.original.name} type={'talentPool'} />
    },
    show: true,
  },
]

const ActivePools = () => {
  const router = useRouter()
  const { useHubTable, HubTable } = useCreateHubTable<Job>()
  const { data: dataHubPools, loading: loadingHubPools } = useQuery(GET_HUB_POOLS, {
    fetchPolicy: 'cache-and-network',
  })

  const { table, tableStates } = useHubTable(
    'pools-hub',
    loadingHubPools,
    dataHubPools?.findManyTalentPool,
    defaultColumns
  )

  return (
    <HubTable table={table} tableStates={tableStates}>
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
