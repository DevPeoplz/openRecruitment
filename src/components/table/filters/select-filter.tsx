import React, { Fragment, useMemo, useState } from 'react'
import { CheckIcon, ChevronUpDownIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { SelectField } from '@/components/ui/fields'
import { useRouter } from 'next/router'
import { FilterProps } from '@/components/filters/filters'
import clsx from 'clsx'
import { Combobox, Transition } from '@headlessui/react'

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
  options,
  setShow,
  placeholder,
  setOption,
}) => {
  const router = useRouter()
  const { query } = router

  const column = table.getColumn(columnKey)
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
      selected: columnFilterValue.includes(option),
    }
  })

  const deleteFilter = (option: { selected: boolean; value: string }) => {
    setOption((prev: { SelectFilter: { options: { value: string }[] } }) => {
      const newOptions = prev.SelectFilter.options.map((opt) => {
        if (opt.value === option.value) {
          return { ...opt, selected: false }
        }
        return opt
      })
      return { ...prev, SelectFilter: { ...prev.SelectFilter, options: newOptions } }
    })
  }

  const addFilter = (option: string) => {
    setOption((prev: { SelectFilter: { options: { value: string }[] } }) => {
      const newOptions = prev.SelectFilter.options.map((opt) => {
        if (opt.value === option) {
          return { ...opt, selected: true }
        }
        return opt
      })
      return { ...prev, SelectFilter: { ...prev.SelectFilter, options: newOptions } }
    })
  }

  // TODO: Implement a combobox
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
      <div className="my-2 flex flex-wrap gap-1 text-xs">
        {getOptions.map(
          (option, index) =>
            option.selected && (
              <div key={index} className="flex justify-between gap-2 rounded border p-1">
                <p>{option.label}</p>
                <XMarkIcon
                  className="h-5 w-5 text-gray-500 hover:cursor-pointer"
                  onClick={() => deleteFilter(option)}
                />
              </div>
            )
        )}
      </div>

      <div
        className={
          'block h-10 rounded-md  bg-transparent text-base focus:outline-none focus:ring-cyan-500'
        }
      >
        <MyCombobox options={getOptions} column={column} router={router} columnKey={columnKey} />
      </div>
    </div>
  )
}

export default SelectFilter

const MyCombobox: React.FC<{ options: any; column: any; router: any; columnKey: any }> = ({
  options: people,
  column,
  router,
  columnKey,
}) => {
  const [selected, setSelected] = useState(people[0])
  const [query, setQuery] = useState('')

  const filteredPeople =
    query === ''
      ? people
      : people.filter((person) =>
          person.label
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        )

  return (
    <Combobox value={[]}>
      <div className="relative mt-1">
        <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
          <Combobox.Input
            className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
            displayValue={(person) => person.label}
            placeholder={`Select a ${column.columnDef.header}`}
            onChange={(event) => setQuery(event.target.value)}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </Combobox.Button>
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery('')}
        >
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredPeople.length === 0 && query !== '' ? (
              <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                Nothing found.
              </div>
            ) : (
              <>
                {filteredPeople.map((person) => (
                  <Combobox.Option
                    key={`${columnKey} ${person.value}`}
                    className={({ active }) =>
                      `z-10 relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-teal-600 text-white' : 'text-gray-900'
                      }`
                    }
                    value={person}
                    onClick={() => {
                      if (column) {
                        column.setFilterValue((prevState: string[]) => {
                          const newState = [...new Set(prevState)]

                          newState.push(person.value)

                          router
                            .replace({
                              query: { ...router.query, [columnKey]: newState },
                            })
                            .then()

                          return newState
                        })
                      }
                    }}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}
                        >
                          {person.label}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-white' : 'text-teal-600'
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))}
              </>
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  )
}
