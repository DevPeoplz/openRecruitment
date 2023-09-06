import React, { FC } from 'react'
import { LayoutSideMenu } from '@/components/layout/main/layout-side-menu'
import {
  Column,
  ColumnDef,
  ColumnOrderState,
  flexRender,
  getCoreRowModel,
  Header,
  Table,
  useReactTable,
} from '@tanstack/react-table'

import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { makeData, Person } from './makeData'
import clsx from 'clsx'
import { ArrowsRightLeftIcon } from '@heroicons/react/24/outline'

const Page = () => {
  const sidebar = (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto  border-gray-200 bg-white pt-3">
      <nav className="flex flex-1 flex-col">
        <ul>
          <li>Sidebar</li>
        </ul>
      </nav>
    </div>
  )

  return (
    <LayoutSideMenu sidebar={sidebar}>
      <p>Candidate</p>
      <DndProvider backend={HTML5Backend}>
        <HubTable />
      </DndProvider>
    </LayoutSideMenu>
  )
}

Page.auth = {}
export default Page

const defaultColumns: ColumnDef<Person>[] = [
  {
    accessorKey: 'firstName',
    id: 'firstName',
    header: 'First Name',
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
  },
  {
    accessorFn: (row) => row.lastName,
    id: 'lastName',
    cell: (info) => info.getValue(),
    header: () => <span>Last Name</span>,
    footer: (props) => props.column.id,
  },
  {
    accessorKey: 'age',
    id: 'age',
    header: 'Age',
    footer: (props) => props.column.id,
  },

  {
    accessorKey: 'visits',
    id: 'visits',
    header: 'Visits',
    footer: (props) => props.column.id,
  },
  {
    accessorKey: 'status',
    id: 'status',
    header: 'Status',
    footer: (props) => props.column.id,
  },
  {
    accessorKey: 'progress',
    id: 'progress',
    header: 'Profile Progress',
    footer: (props) => props.column.id,
  },
]

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

const DraggableColumnHeader: FC<{
  header: Header<Person, unknown>
  table: Table<Person>
}> = ({ header, table }) => {
  const { getState, setColumnOrder } = table
  const { columnOrder } = getState()
  const { column } = header

  const [, dropRef] = useDrop({
    accept: 'column',
    drop: (draggedColumn: Column<Person>) => {
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
        {header.isPlaceholder
          ? null
          : flexRender(header.column.columnDef.header, header.getContext())}
        <button ref={dragRef}>
          <ArrowsRightLeftIcon className="ml-1 h-5 w-5" />
        </button>
      </div>
    </th>
  )
}

function HubTable() {
  const [data, setData] = React.useState(() => makeData(20))
  const [columns] = React.useState(() => [...defaultColumns])

  const [columnOrder, setColumnOrder] = React.useState<ColumnOrderState>(
    columns.map((column) => column.id as string) //must start out with populated columnOrder so we can splice
  )

  const regenerateData = () => setData(() => makeData(20))

  const resetOrder = () => setColumnOrder(columns.map((column) => column.id as string))

  const table = useReactTable({
    data,
    columns,
    state: {
      columnOrder,
    },
    onColumnOrderChange: setColumnOrder,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
  })

  return (
    <div className="w-full p-4">
      <div className="h-4" />
      <div className="flex flex-wrap gap-2">
        <button onClick={() => regenerateData()} className="border p-1">
          Regenerate
        </button>
        <button onClick={() => resetOrder()} className="border p-1">
          Reset Order
        </button>
      </div>
      <div className="h-4" />
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
                      {row.getVisibleCells().map((cell, index) => (
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
                <tfoot>
                  {table.getFooterGroups().map((footerGroup) => (
                    <tr key={footerGroup.id}>
                      {footerGroup.headers.map((header) => (
                        <th key={header.id} colSpan={header.colSpan}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.footer, header.getContext())}
                        </th>
                      ))}
                    </tr>
                  ))}
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
      <pre>{JSON.stringify(table.getState().columnOrder, null, 2)}</pre>
    </div>
  )
}
