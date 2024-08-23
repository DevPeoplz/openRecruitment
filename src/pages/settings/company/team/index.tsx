import React from 'react'

import { LayoutSideMenu } from '@/components/layout/main/layout-side-menu'
import { Button } from '@/components/ui/Button'
import { PlusIcon } from '@heroicons/react/20/solid'
import { GET_HUB_CANDIDATES } from '@/graphql-operations/queries'
import { useQuery } from '@apollo/client'
import useCreateHubTable, { DefaultColumnsExtendedProps } from '@/components/table/hub-table'
import { Person } from '@/pages/candidates'
import { DeleteRecord } from '@/components/views/delete-record'

//TO-DO Get Team Members Data and add new team member

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
    accessorKey: 'role',
  },
  {
    accessorKey: 'email',
  },
  {
    accessorKey: 'edit',
    id: 'edit',
    header: 'Edit',
    cell: (info) => {
      const id = info.row.original.id
      return <DeleteRecord id={id} name={info.row.original.name} />
    },
    show: true,
  },
]

const Page = () => {
  const { data: dataHubCandidates, loading: loadingHubCandidates } = useQuery(GET_HUB_CANDIDATES, {
    fetchPolicy: 'cache-and-network',
  })
  const { useHubTable, HubTable } = useCreateHubTable<Person>()

  const { table, tableStates } = useHubTable(
    'team-members-hub',
    loadingHubCandidates,
    dataHubCandidates?.findManyCandidate,
    defaultColumns
  )

  return (
    <LayoutSideMenu menu={'settings'}>
      <div className="flex w-full flex-col justify-start gap-2 p-4">
        <h2>Team members</h2>
        <div className="flex w-full justify-between">
          <p>Manage your team and invite new members</p>
          <Button variant="solid" size="large" icon={<PlusIcon className="h-4" />}>
            New Team Member
          </Button>
        </div>
        <HubTable table={table} tableStates={tableStates}></HubTable>
      </div>
    </LayoutSideMenu>
  )
}

Page.auth = {
  permission: 'SUPERADMIN',
}

export default Page
