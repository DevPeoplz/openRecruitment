import React from 'react'
import { XMarkIcon } from '@heroicons/react/20/solid'
import { SelectField } from '@/components/UI/fields'

const SelectFilter = ({
  show,
  label,
  options,
  setShow,
  placeholder,
  setOption,
}: {
  show: boolean
  label: string
  options: {
    label: string
    value: string
    count: number
    selected: boolean
  }[]
  setShow: React.Dispatch<React.SetStateAction<boolean>>
  placeholder: string
  setOption: any
}) => {
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

  return show ? (
    <div className="flex flex-col p-2">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-900">{label}</h3>
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="font-medium text-gray-600 transition duration-150 ease-in-out hover:text-primary-500"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>
      <div className="my-2 flex flex-wrap gap-1 text-xs">
        {options.map(
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
      <SelectField
        id="select-filter"
        options={options}
        placeholder={placeholder}
        className="block h-10 rounded-md bg-transparent  text-base focus:outline-none focus:ring-cyan-500"
        setOption={addFilter}
      />
    </div>
  ) : null
}

export default SelectFilter
