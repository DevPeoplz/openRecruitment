import React, { FC, useCallback, useEffect, useState } from 'react'
import {
  Column,
  ColumnDef,
  ColumnOrderState,
  FilterFn,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Header,
  PaginationState,
  SortingState,
  Table,
  useReactTable,
} from '@tanstack/react-table'

import { RankingInfo, rankItem } from '@tanstack/match-sorter-utils'

import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import clsx from 'clsx'
import {
  ArrowsRightLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/20/solid'
import { ArrowDownCircleIcon, ArrowUpCircleIcon } from '@heroicons/react/20/solid'
import { Select } from '@/components/UI/select'
import { useSession } from 'next-auth/react'
import { getLocalStorageKey } from '@/components/utils'
import DropdownWithChecks from '@/components/UI/dropdown-with-checks'
import { ArrowPathIcon, ViewColumnsIcon } from '@heroicons/react/24/outline'

declare module '@tanstack/table-core' {
  interface FilterMeta {
    itemRank: RankingInfo
  }
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // Store the itemRank info
  addMeta({
    itemRank,
  })

  // Return if the item should be filtered in/out
  return itemRank.passed
}

const reorderColumn = (
  draggedColumnId: string,
  targetColumnId: string,
  columnOrder: string[]
): ColumnOrderState => {
  columnOrder.splice(
    columnOrder.indexOf(targetColumnId),
    0,
    columnOrder.splice(columnOrder.indexOf(draggedColumnId), 1)[0] as string
  )
  return [...columnOrder]
}

const createDraggableColumnHeader = <T,>() => {
  const DraggableColumnHeader: FC<{
    header: Header<T, unknown>
    table: Table<T>
  }> = ({ header, table }) => {
    const { getState, setColumnOrder } = table
    const { columnOrder } = getState()
    const { column } = header

    const [, dropRef] = useDrop({
      accept: 'column',
      drop: (draggedColumn: Column<T>) => {
        const newColumnOrder = reorderColumn(draggedColumn.id, column.id, columnOrder)
        setColumnOrder(newColumnOrder)
      },
    })

    const [{ isDragging }, dragRef, previewRef] = useDrag({
      collect: (monitor: { isDragging: () => any }) => ({
        isDragging: monitor.isDragging(),
      }),
      item: () => column,
      type: 'column',
    })

    return (
      <th
        ref={dropRef}
        colSpan={header.colSpan}
        style={{ opacity: isDragging ? 0.5 : 1 }}
        className={clsx('px-3 py-3.5 text-left text-sm font-semibold text-gray-900')}
      >
        <div ref={previewRef} className="flex flex-wrap items-center">
          {header.isPlaceholder ? null : (
            <div
              {...{
                className: header.column.getCanSort()
                  ? 'cursor-pointer select-none flex items-center'
                  : '',
                onClick: header.column.getToggleSortingHandler(),
              }}
            >
              {flexRender(header.column.columnDef.header, header.getContext())}
              {{
                asc: <ArrowUpCircleIcon className="ml-1 h-4 w-4" />,
                desc: <ArrowDownCircleIcon className="ml-1 h-4 w-4" />,
              }[header.column.getIsSorted() as string] ?? null}
            </div>
          )}
          <button ref={dragRef}>
            <ArrowsRightLeftIcon className="ml-1 h-5 w-5" />
          </button>
        </div>
      </th>
    )
  }
  return DraggableColumnHeader
}

const createHubTable = <T,>() => {
  const HubTable: React.FC<{
    data: T[]
    defaultColumns: ColumnDef<T>[]
    defaultColumnVisibility?: Record<string, boolean>
  }> = ({ data, defaultColumns, defaultColumnVisibility }) => {
    const { data: session } = useSession()
    const [columns] = useState(() => [...defaultColumns])
    const [sorting, setSorting] = useState<SortingState>([])
    const [globalFilter, setGlobalFilter] = useState('')

    const storageKey = useCallback(
      (key: string) => {
        if (!session?.user?.email || !session?.user?.selectedCompany) return ''

        return getLocalStorageKey(
          `${session?.user?.email}//${session?.user?.selectedCompany}`,
          'candidate-hub',
          key
        )
      },
      [session?.user?.email, session?.user?.selectedCompany]
    )

    const [columnVisibility, setColumnVisibility] = useState(() => {
      const storedColumnVisibility = JSON.parse(
        localStorage.getItem(storageKey('columnVisibility')) as string
      )

      console.log(storedColumnVisibility)
      console.log(defaultColumnVisibility)

      if (!storedColumnVisibility && defaultColumnVisibility) {
        return defaultColumnVisibility
      }

      return storedColumnVisibility ? storedColumnVisibility : {}
    })

    const [columnOrder, setColumnOrder] = React.useState<ColumnOrderState>(() => {
      const storedColumnOrder = JSON.parse(
        localStorage.getItem(storageKey('columnOrder')) as string
      )

      return storedColumnOrder ? storedColumnOrder : columns.map((column) => column.id as string)
    })

    const pageSizeOptions = [10, 20, 30, 50]

    const [{ pageIndex, pageSize }, setPagination] = React.useState<PaginationState>({
      pageIndex: 0,
      pageSize: pageSizeOptions[0],
    })

    const fetchDataOptions = {
      pageIndex,
      pageSize,
    }

    const pagination = React.useMemo(
      () => ({
        pageIndex,
        pageSize,
      }),
      [pageIndex, pageSize]
    )

    const resetOrder = () => {
      localStorage.removeItem(storageKey('columnOrder'))
      setColumnOrder(columns.map((column) => column.id as string))
    }

    useEffect(() => {
      // store the column order in local storage
      if (storageKey('columnOrder') !== '') {
        localStorage.setItem(storageKey('columnOrder'), JSON.stringify(columnOrder))
      }
    }, [columnOrder, storageKey])

    useEffect(() => {
      // store the column order in local storage
      if (storageKey('columnVisibility') !== '') {
        localStorage.setItem(storageKey('columnVisibility'), JSON.stringify(columnVisibility))
      }
    }, [columnVisibility, storageKey])

    const dataQuery = { data: { pageCount: undefined } }

    const manualPagination = false

    const DraggableColumnHeader = createDraggableColumnHeader<T>()

    const table = useReactTable({
      data,
      columns,
      state: {
        pagination,
        columnVisibility,
        columnOrder,
        sorting,
        globalFilter,
      },
      onColumnVisibilityChange: setColumnVisibility,
      onPaginationChange: setPagination,
      manualPagination: manualPagination,
      pageCount: dataQuery?.data?.pageCount ?? -1,
      onSortingChange: setSorting,
      onColumnOrderChange: setColumnOrder,
      onGlobalFilterChange: setGlobalFilter,
      globalFilterFn: fuzzyFilter,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      ...(!manualPagination ? { getPaginationRowModel: getPaginationRowModel() } : {}),
      //debugTable: true,
      //debugHeaders: true,
      //debugColumns: true,
    })

    return (
      <DndProvider backend={HTML5Backend}>
        <div className="w-full p-4">
          <div className="flex flex-wrap items-center justify-between gap-1">
            <DebouncedInput
              value={globalFilter ?? ''}
              onChange={(value) => setGlobalFilter(String(value))}
              placeholder="Search all columns..."
            />
            <div className="flex flex-wrap gap-2">
              <DropdownWithChecks
                icon={ViewColumnsIcon}
                columns={[
                  {
                    id: 'toggle-all',
                    label: 'Toggle All',
                    checked: table.getIsAllColumnsVisible(),
                    onClick: table.getToggleAllColumnsVisibilityHandler(),
                    needsDivider: true,
                  },
                  ...table.getAllLeafColumns().map((column) => ({
                    id: column.id,
                    label:
                      typeof column.columnDef.header === 'string'
                        ? column.columnDef.header
                        : column.id,
                    checked: column.getIsVisible(),
                    onClick: column.getToggleVisibilityHandler(),
                  })),
                ]}
              />
              <button
                type="button"
                onClick={() => resetOrder()}
                className="relative rounded-md bg-white p-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                <ArrowPathIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black/5 sm:rounded-lg">
                  <table className="flex min-w-full flex-wrap divide-y divide-gray-300 lg:table">
                    <thead className="bg-gray-50">
                      {table.getHeaderGroups().map((headerGroup, index) => (
                        <tr key={headerGroup.id}>
                          {headerGroup.headers.map((header) => (
                            <DraggableColumnHeader key={header.id} header={header} table={table} />
                          ))}
                        </tr>
                      ))}
                    </thead>
                    <tbody className="flex w-full flex-wrap divide-y divide-gray-200 bg-white lg:table-row-group">
                      {table.getRowModel().rows.map((row) => (
                        <tr key={row.id} className="flex w-full even:bg-gray-50 lg:table-row">
                          {row.getVisibleCells().map((cell) => (
                            <td
                              key={cell.id}
                              className={clsx(
                                'flex w-full grow whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:w-auto lg:table-cell'
                              )}
                            >
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="h-2" />
          <div className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-1">
              <div>Page</div>
              <strong>
                {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
              </strong>
            </span>
            <nav
              className="isolate inline-flex -space-x-px rounded-md text-center shadow-sm"
              aria-label="Pagination"
            >
              <button
                className="relative inline-flex items-center rounded-l-md p-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Start</span>
                <ChevronDoubleLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                className="relative inline-flex items-center rounded-r-md p-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">End</span>
                <ChevronDoubleRightIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </nav>

            <span className="flex items-center gap-1">
              Go to page:
              <input
                type="number"
                defaultValue={table.getState().pagination.pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0
                  table.setPageIndex(page)
                }}
                className="w-16 rounded border p-1"
              />
              <Select
                selected={table.getState().pagination.pageSize}
                list={pageSizeOptions.map((size) => ({ value: size, label: size.toString() }))}
                onChange={(value: string | number) => table.setPageSize(Number(value))}
                defaultSize="w-auto"
                label="Page Size"
              />
            </span>
          </div>
        </div>
      </DndProvider>
    )
  }

  return HubTable
}

function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
  const [value, setValue] = React.useState(initialValue)

  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [debounce, onChange, value])

  return (
    <div className="relative w-full min-w-[200px] rounded-md shadow-sm sm:w-4/12">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
      </div>
      {
        <input
          className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          {...props}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      }
    </div>
  )
}

export default createHubTable
