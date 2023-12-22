import Loader from '@/components/ui/loader'
import clsx from 'clsx'
import { ColumnOrderState, flexRender, Header, Table } from '@tanstack/react-table'
import React, { PropsWithChildren } from 'react'
import { TableViewProps } from '@/components/table/hub-table'
import { useDrag, useDrop } from 'react-dnd'
import {
  ArrowDownCircleIcon,
  ArrowsRightLeftIcon,
  ArrowUpCircleIcon,
} from '@heroicons/react/20/solid'

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

//const DraggableColumnHeader: React.FC<{
//  header: Header<T, unknown>
//  table: Table<T>
//}> = ({ header, table }) => {

interface DraggableColumnHeaderProps<T> {
  header: Header<T, unknown>
  table: Table<T>
}

const DraggableColumnHeader: <T>(
  props: PropsWithChildren<DraggableColumnHeaderProps<T>>
) => React.ReactElement<PropsWithChildren<DraggableColumnHeaderProps<T>>> = ({ table, header }) => {
  const { getState, setColumnOrder } = table
  const { columnOrder } = getState()
  const { column } = header

  const [, dropRef] = useDrop({
    accept: 'column',
    drop: (draggedColumn: typeof column) => {
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

/*const createDragableColumnHeader = <T,>() => {
  const DraggableColumnHeader: React.FC<{
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
}*/

export const TableView = <T,>({ table, tableStates, rowOnClick }: TableViewProps<T>) => {
  return (
    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
      <div className="overflow-hidden shadow ring-1 ring-black/5 sm:rounded-lg">
        <table className="flex min-w-full flex-wrap divide-y divide-gray-300 lg:table">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <DraggableColumnHeader<T> key={header.id} header={header} table={table} />
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="flex w-full flex-wrap divide-y divide-gray-200 bg-white lg:table-row-group">
            {tableStates.loadingData ? (
              <tr>
                <td colSpan={table.getFlatHeaders().length}>
                  <div className={'flex w-full items-center justify-center p-2'}>
                    <Loader size="h-8 w-8" fullScreen={false} />
                  </div>
                </td>
              </tr>
            ) : table.getRowModel().rows.length < 1 ? (
              <tr>
                <td colSpan={table.getFlatHeaders().length}>
                  <div className={'flex w-full items-center justify-center p-2'}>
                    <div>No rows to display...</div>
                  </div>
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr
                  onClick={rowOnClick ? () => rowOnClick(row) : undefined}
                  key={row.id}
                  className={clsx(
                    'flex w-full  even:bg-gray-50 lg:table-row',
                    rowOnClick ? 'cursor-pointer' : ''
                  )}
                >
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
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
