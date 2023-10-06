import { CheckboxFieldWithCount } from '@/components/ui/fields'
import React, { useEffect, useMemo, useReducer } from 'react'
import { XMarkIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import { Table } from '@tanstack/react-table'
import { useRouter } from 'next/router'
import { FilterProps } from '@/components/filters/filters'

export interface CheckboxFilterProps {
  label: string
  options: {
    value: string
    label: string
  }[]
  setShow: () => void
}

const CheckboxFilter: React.FC<FilterProps & CheckboxFilterProps> = ({
  table,
  columnKey,
  label,
  options,
  setShow,
}) => {
  const router = useRouter()
  const { query } = router

  const column = table.getColumn(columnKey)
  const columnFilterValue = (column?.getFilterValue() as string[]) ?? []

  const getOptions = options.map((option) => {
    return {
      label: option.label,
      value: option.value,
      count:
        column?.getFacetedRowModel().flatRows.filter((row) => {
          const value = row.getValue<string | number>(columnKey).toString()
          return !!(value && value.includes(option.value))
        }).length ?? 0,
      checked: columnFilterValue.includes(option.value),
    }
  })

  return (
    <div className="flex flex-col p-2">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-900">{label}</h3>
        <button
          type="button"
          onClick={setShow}
          className="font-medium text-gray-600 transition duration-150 ease-in-out hover:text-primary-500"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>
      <div className="mt-1 flex flex-col gap-1">
        {getOptions?.map((option, index) => (
          <div className="flex items-center justify-between" key={index}>
            <CheckboxFieldWithCount
              key={option.value}
              option={option}
              setOption={(checked: boolean) => {
                if (column) {
                  column.setFilterValue((prevState: string[]) => {
                    const newState = [...new Set(prevState)]
                    const index = newState.indexOf(option.value)

                    if (index > -1 && !checked) {
                      newState.splice(index, 1)
                    } else {
                      newState.push(option.value)
                    }

                    router
                      .replace({
                        query: { ...query, [columnKey]: newState },
                      })
                      .then()

                    return newState
                  })
                }
              }}
            />
            <div className=" rounded border px-1">
              <p
                className={clsx(
                  `${option.count == 0 ? 'text-gray-300' : 'text-gray-700'} text-right text-xs`
                )}
              >
                {option.count}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CheckboxFilter
