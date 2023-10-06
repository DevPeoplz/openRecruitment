import React, { useCallback, useMemo } from 'react'
import { XMarkIcon } from '@heroicons/react/20/solid'
import { FilterProps } from '@/components/filters/filters'
import ComboboxWithTags, { ComboboxWithTagsProps } from '@/components/ui/combobox-with-tags'
import { flattenDeep, intersection } from 'lodash'
import { ArrayParam, useQueryParam } from 'use-query-params'

export interface SelectFilterProps {
  label: string
  options: {
    value: string
    label: string
    selected: boolean
  }[]
  setShow: () => void
  placeholder: string
  setOption: any
}

const SelectFilter: React.FC<FilterProps & SelectFilterProps> = ({
  table,
  columnKey,
  label,
  setShow,
}) => {
  const [_, setQueryString] = useQueryParam(columnKey, ArrayParam)
  const column = table.getColumn(columnKey)
  const columnFacetedKeys = column ? column.getFacetedUniqueValues().keys() : []

  const sortedUniqueValues = useMemo(() => {
    return intersection(flattenDeep(Array.from(columnFacetedKeys))).sort()
  }, [columnFacetedKeys])

  const getOptions = useMemo(
    () =>
      sortedUniqueValues.map((option) => {
        return {
          label: option,
          value: option,
        }
      }),
    [sortedUniqueValues]
  )

  const handleSelectUpdate = useCallback(
    (selectedOptions: ComboboxWithTagsProps['options']) => {
      const newState = selectedOptions.map((option) => option.value)
      column?.setFilterValue(() => newState)
      setQueryString(newState.map((e) => e.toString()))
    },
    [column, setQueryString]
  )

  return (
    <div className="flex flex-col p-2">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-900">{label}</h3>
        <button
          type="button"
          onClick={setShow}
          className="font-medium text-gray-600 transition duration-150 ease-in-out hover:text-primary-500"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>
      <ComboboxWithTags
        options={getOptions}
        width="w-full"
        placeholder={`Select a ${column?.columnDef.header ?? columnKey}`}
        onSelectedOptionsChange={handleSelectUpdate}
      />
    </div>
  )
}

export default SelectFilter
