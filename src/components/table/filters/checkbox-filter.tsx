import { CheckboxFieldWithCount } from '@/components/UI/fields'
import React, { useEffect, useMemo, useReducer } from 'react'
import { XMarkIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import { Table } from '@tanstack/react-table'
import { useRouter } from 'next/router'

const optionsReducer = (state, action) => {
  const newState = [...new Set(state)]
  const index = newState.indexOf(action.key)

  console.log(newState)
  console.log(index)
  console.log(action)

  if (index > -1 && !action.value) {
    newState.splice(index, 1)
  } else {
    newState.push(action.key)
  }

  return newState
}

const CheckboxFilter: React.FC<{
  table: Table<any>
  componentKey: string
  stateKey: string
  label: string
  options: {
    value: string
    label: string
    count: number
    checked: boolean
  }[]
  show: boolean
  setShow: React.Dispatch<React.SetStateAction<boolean>>
  setOptions: (
    options: {
      value: string
      label: string
      count: number
      checked: boolean
    }[]
  ) => void
  filterQueryParams: [any, any]
  dispatchComponentsStatus: React.Dispatch<any>
}> = ({
  table,
  componentKey,
  stateKey,
  label,
  options,
  show,
  setShow,
  setOptions,
  filterQueryParams,
  dispatchComponentsStatus,
}) => {
  const [filters, dispatchQueryParams] = filterQueryParams
  const [checkboxValues, dispatchCheckboxValues] = useReducer(
    optionsReducer,
    options.map((option) => option.checked).filter((checked) => checked)
  )

  console.log(componentKey)
  useEffect(() => {
    dispatchQueryParams({
      type: 'update',
      key: stateKey,
      value: checkboxValues,
    })
  }, [checkboxValues, dispatchComponentsStatus, dispatchQueryParams, stateKey])
  const router = useRouter()
  const { query } = router

  const column = table.getColumn(stateKey)
  const columnFacetedKeys = column ? column.getFacetedUniqueValues().keys() : []
  const columnFilterValue = (column?.getFilterValue() as string[]) ?? []

  const sortedUniqueValues = useMemo(
    () => Array.from(columnFacetedKeys).sort(),
    [columnFacetedKeys]
  )

  const getOptions = sortedUniqueValues.map((option) => {
    return {
      label: option,
      value: option,
      count:
        column
          ?.getFacetedRowModel()
          .flatRows.filter((row, index) => row.getValue(stateKey) === option).length ?? 0,
      checked: columnFilterValue.includes(option),
    }
  })

  return show ? (
    <div className="flex flex-col p-2">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-900">{label}</h3>
        <button
          type="button"
          onClick={() => setShow(!show)}
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
                        query: { ...query, [stateKey]: newState },
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
  ) : null
}

export default CheckboxFilter
