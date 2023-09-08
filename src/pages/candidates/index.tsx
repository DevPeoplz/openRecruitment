import React, { useMemo, useState } from 'react'
import { LayoutSideMenu } from '@/components/layout/main/layout-side-menu'
import { ColumnDef } from '@tanstack/react-table'

import { makeData, Person } from './makeData'
import createHubTable from '@/components/table/hub-table'
import { useQuery } from '@apollo/client'
import { GET_HUB_CANDIDATES, get_hub_candidates_variables } from '@/components/graphql/queries'

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

const SidebarProvisional = (
  <nav className="flex flex-1 flex-col">
    <ul>
      <div className="max-w-[100] border-t border-gray-200 p-5">
        <h2 className="text-lg font-medium text-gray-900">Filters Placeholder...</h2>

        <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
          <div>
            <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
              First name
            </label>
            <div className="mt-1">
              <input
                type="text"
                id="first-name"
                name="first-name"
                autoComplete="given-name"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
              Last name
            </label>
            <div className="mt-1">
              <input
                type="text"
                id="last-name"
                name="last-name"
                autoComplete="family-name"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="company" className="block text-sm font-medium text-gray-700">
              Company
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="company"
                id="company"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="address"
                id="address"
                autoComplete="street-address"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="apartment" className="block text-sm font-medium text-gray-700">
              Apartment, suite, etc.
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="apartment"
                id="apartment"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">
              City
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="city"
                id="city"
                autoComplete="address-level2"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700">
              Country
            </label>
            <div className="mt-1">
              <select
                id="country"
                name="country"
                autoComplete="country-name"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option>United States</option>
                <option>Canada</option>
                <option>Mexico</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="region" className="block text-sm font-medium text-gray-700">
              State / Province
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="region"
                id="region"
                autoComplete="address-level1"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
              Postal code
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="postal-code"
                id="postal-code"
                autoComplete="postal-code"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="phone"
                id="phone"
                autoComplete="tel"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </ul>
  </nav>
)

const Page = () => {
  const sidebar = (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto  border-gray-200 bg-white pt-3">
      {SidebarProvisional}
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

  console.log('data', dataHubCandidates)

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
