import Loader from '@/components/ui/loader'
import React from 'react'
import { TableViewProps } from '@/components/table/hub-table'
import { BriefcaseIcon } from '@heroicons/react/20/solid'
import { UserIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

interface CardViewProps<T> extends TableViewProps<T> {
  linkGenerator: (x: string) => string
}

export const CardView = <T,>({ table, tableStates, linkGenerator }: CardViewProps<T>) => {
  return (
    <div className="my-5 flex min-w-full flex-wrap items-center justify-center">
      {tableStates.loadingData ? (
        <div>
          <div className={'flex w-full items-center justify-center p-2'}>
            <Loader size="h-8 w-8" fullScreen={false} />
          </div>
        </div>
      ) : table.getRowModel().rows.length < 1 ? (
        <div>
          <div className={'flex w-full items-center justify-center p-2'}>
            <div>No items to display...</div>
          </div>
        </div>
      ) : (
        <div role="list" className="grid w-full grid-cols-1 gap-6">
          {table.getRowModel().rows.map((row) => (
            <Link
              href={linkGenerator((row.original as { id: string | number } | null)?.id as string)}
              key={row.id}
              className="col-span-1 w-10/12 max-w-[400px] divide-y divide-gray-200 justify-self-center rounded-lg bg-white shadow md:w-6/12"
            >
              <div className="flex w-full items-center justify-between space-x-6 p-6">
                <div className="flex-1 truncate">
                  <div className="flex items-center space-x-3">
                    <h3 className="truncate text-sm font-medium text-gray-900">
                      {row.getValue('name')}
                    </h3>
                    <span className="inline-flex shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                      {'Published'}
                    </span>
                  </div>
                  <p className="mt-1 truncate text-sm text-gray-500">
                    {new Date(row.getValue('createdAt')).toLocaleDateString()}
                  </p>
                </div>
                <BriefcaseIcon className="h-10 w-10 shrink-0 rounded-full" />
              </div>
              <div>
                <div className="flex flex-wrap divide-y divide-gray-200">
                  <div className="flex w-full">
                    <div className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-2 text-sm text-gray-900">
                      <UserIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      {`# of Candidates: `}
                      <span className={'font-bold'}>
                        {
                          (
                            row.getValue('candidates') as Array<{
                              id: string
                              name: string
                            }>
                          )?.length
                        }
                      </span>
                    </div>
                  </div>
                  {(row.getValue('tags') as Array<any>).length > 0 && (
                    <div className="flex w-full justify-end p-2">
                      {(row.getValue('tags') as Array<any>)?.map((val, index) => (
                        <span
                          className="mr-1 rounded-xl border-2 border-solid border-primary-200 p-2 leading-3"
                          key={btoa(`${row}${val}${index}`)}
                        >
                          {val}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
