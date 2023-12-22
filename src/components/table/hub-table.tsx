import React, { ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
import {
  ColumnDef,
  ColumnFiltersState,
  ColumnOrderState,
  FilterFn,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  Row,
  SortingState,
  Table,
  useReactTable,
} from '@tanstack/react-table'

import { RankingInfo, rankItem } from '@tanstack/match-sorter-utils'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/20/solid'
import { Select } from '@/components/ui/select'
import { useSession } from 'next-auth/react'
import { getChildrenOnDisplayName, getLocalStorageKey } from '@/components/utils'
import DropdownWithChecks from '@/components/ui/dropdown-with-checks'
import {
  ArrowPathIcon,
  CreditCardIcon,
  TableCellsIcon,
  ViewColumnsIcon,
} from '@heroicons/react/24/outline'
import { DebouncedInput } from '@/components/table/debounced-input'
import { HubTableFilters } from '@/components/table/filters'
import { StringParam, useQueryParam } from 'use-query-params'
import { TableView } from '@/components/table/views/table'
import { CardView } from '@/components/table/views/card'

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

export type DefaultColumnsExtendedProps<T> = ({
  show?: boolean
  filterComponent?: 'checkbox' | 'select'
  defaultCheckboxOptions?: { label: string; value: string }[]
} & ColumnDef<T>)[]

export const useHubTable = <T,>(
  localStorageKey: string,
  loading: boolean,
  data: T[] | undefined | null,
  defaultColumns: DefaultColumnsExtendedProps<T>
): {
  table: Table<T>
  tableStates: TableStatesType
} => {
  const { data: session } = useSession()
  const [columns] = useState(() => [...defaultColumns])
  const [sorting, setSorting] = useState<SortingState>([])
  const [queryString] = useQueryParam('global_search', StringParam)
  const [globalFilter, setGlobalFilter] = useState(queryString ?? '')

  const defaultColumnVisibility = useMemo(() => {
    return defaultColumns.reduce((acc, col) => {
      if (col.id) {
        acc[col.id] = !!col.show
      }
      return acc
    }, {} as Record<string, boolean>)
  }, [defaultColumns])

  const storageKey = useCallback(
    (key: string) => {
      if (!session?.user?.email || !session?.user?.selectedCompany) return ''

      return getLocalStorageKey(
        `${session?.user?.email}//${session?.user?.selectedCompany}`,
        localStorageKey,
        key
      )
    },
    [localStorageKey, session?.user?.email, session?.user?.selectedCompany]
  )

  const [columnVisibility, setColumnVisibility] = useState(() => {
    const storedColumnVisibility = JSON.parse(
      localStorage.getItem(storageKey('columnVisibility')) as string
    )

    if (!storedColumnVisibility && defaultColumnVisibility) {
      return defaultColumnVisibility
    }

    return storedColumnVisibility ? storedColumnVisibility : {}
  })

  const defaultFiltersVisibility = useMemo(() => {
    return defaultColumns.reduce((acc, col) => {
      if (col.id) {
        acc[col.id] = !!col.show
      }
      return acc
    }, {} as Record<string, boolean>)
  }, [defaultColumns])

  const [filtersVisibility, setFiltersVisibility] = useState(() => {
    const storedFiltersVisibility = JSON.parse(
      localStorage.getItem(storageKey('filtersVisibility')) as string
    )

    if (!storedFiltersVisibility && defaultFiltersVisibility) {
      return defaultFiltersVisibility
    }

    return storedFiltersVisibility ? storedFiltersVisibility : {}
  })

  const [columnOrder, setColumnOrder] = React.useState<ColumnOrderState>(() => {
    const storedColumnOrder = JSON.parse(localStorage.getItem(storageKey('columnOrder')) as string)

    return storedColumnOrder ? storedColumnOrder : columns.map((column) => column.id as string)
  })

  const pageSizeOptions = [10, 20, 30, 50]

  const [{ pageIndex, pageSize }, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: pageSizeOptions[0],
  })

  const pagination = React.useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  )

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])

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

  const manualPagination = false

  const table = useReactTable({
    data: !data || data.length < 1 ? [] : data,
    columns,
    state: {
      pagination,
      columnVisibility,
      columnOrder,
      sorting,
      columnFilters,
      globalFilter,
    },
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    manualPagination: manualPagination,
    onSortingChange: setSorting,
    onColumnOrderChange: setColumnOrder,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    ...(!manualPagination ? { getPaginationRowModel: getPaginationRowModel() } : {}),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(), //debugTable: true,
    //debugHeaders: true,
    //debugColumns: true,
  })

  return {
    table,
    tableStates: {
      loadingData: loading,
      columnVisibility,
      columnOrder,
      sorting,
      resetOrder,
      columnFilters,
      globalFilter,
      setGlobalFilter,
      pageSizeOptions,
      filtersVisibility,
      setFiltersVisibility,
    },
  }
}

export interface TableStatesType {
  loadingData: boolean
  columnVisibility: Record<string, boolean>
  columnOrder: ColumnOrderState
  sorting: SortingState
  resetOrder: () => void
  columnFilters: ColumnFiltersState
  globalFilter: string
  setGlobalFilter: React.Dispatch<React.SetStateAction<string>>
  pageSizeOptions: number[]
  filtersVisibility: Record<string, boolean>
  setFiltersVisibility: React.Dispatch<React.SetStateAction<string>>
}

type HubTableSubComponents = {
  Toolbar: typeof HubTableToolbar
}

const HubTableToolbar: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <>{children}</>
}
HubTableToolbar.displayName = 'HubTable.Toolbar'

export type TableViewProps<T> = {
  table: Table<T>
  tableStates: TableStatesType
  rowOnClick?: (x: Row<T>) => void
}

const createHubTableComponent = <T,>() => {
  type HubTableProps = {
    table: Table<T>
    tableStates: TableStatesType
    rowOnClick?: (x: Row<T>) => void
    enableCardView?: boolean
    linkGenerator?: (x: string) => string
    children?: ReactNode
  }
  const HubTable: HubTableSubComponents & React.FC<HubTableProps> = (props: HubTableProps) => {
    const { table, tableStates, rowOnClick, children } = props
    const filteredToolbar = getChildrenOnDisplayName(children, 'HubTable.Toolbar')
    const [, setQueryString] = useQueryParam('global_search', StringParam)
    const [activeView, setActiveView] = useState<'card' | 'table'>(
      props.enableCardView ? 'card' : 'table'
    )

    const handleGlobalSearchChange = useCallback(
      (value: string | number) => {
        tableStates.setGlobalFilter(String(value))
        setQueryString(String(value) === '' ? undefined : String(value))
      },
      [setQueryString, tableStates]
    )

    return (
      <DndProvider backend={HTML5Backend}>
        <div className="w-full p-4">
          <div className="flex flex-wrap items-center justify-between gap-1">
            <DebouncedInput
              value={tableStates.globalFilter ?? ''}
              onChange={handleGlobalSearchChange}
              placeholder="Search all columns..."
            />
            <div className="flex flex-wrap gap-2">
              {filteredToolbar ?? null}
              {activeView === 'table' && (
                <>
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
                    onClick={() => tableStates.resetOrder()}
                    className="relative rounded-md bg-white p-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    <ArrowPathIcon className="h-5 w-5" />
                  </button>
                </>
              )}
              <button
                type="button"
                onClick={() => setActiveView((prev) => (prev === 'table' ? 'card' : 'table'))}
                className="relative rounded-md bg-white p-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                title={activeView === 'table' ? 'Card View' : 'Table View'}
              >
                {activeView === 'table' ? (
                  <CreditCardIcon className="h-5 w-5" />
                ) : (
                  <TableCellsIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              {activeView === 'table' && (
                <TableView<T> table={table} tableStates={tableStates} rowOnClick={rowOnClick} />
              )}
              {activeView === 'card' && (
                <CardView<T>
                  table={table}
                  tableStates={tableStates}
                  linkGenerator={props.linkGenerator ?? (() => '')}
                />
              )}
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
                name={`paginator-goto`}
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
                list={tableStates.pageSizeOptions.map((size) => ({
                  value: size,
                  label: size.toString(),
                }))}
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

  HubTable.Toolbar = HubTableToolbar

  return HubTable
}

const useCreateHubTable = <T,>() => {
  return useMemo(
    () => ({
      useHubTable: useHubTable<T>,
      HubTable: createHubTableComponent<T>(),
      HubTableFilters: HubTableFilters<T>,
    }),
    []
  )
}

export default useCreateHubTable
