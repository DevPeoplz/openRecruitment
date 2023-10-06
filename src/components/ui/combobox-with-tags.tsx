import React, { Fragment, useEffect, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { ChevronUpDownIcon, XMarkIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'

const optionsDefault = [
  { value: 1, label: 'Durward Reynolds' },
  { value: 2, label: 'Kenton Towne' },
  { value: 3, label: 'Therese Wunsch' },
  { value: 4, label: 'Benedict Kessler' },
  { value: 5, label: 'Katelyn Rohan' },
]

export type ComboboxWithTagsProps = {
  comboBtnRef?: React.RefObject<HTMLButtonElement>
  options: ({ label: string; value: string | number } & Record<string, string | number>)[]
  placeholder?: string
  width?: string
  onSelectedOptionsChange?: (options: ComboboxWithTagsProps['options']) => void
}

const ComboboxWithTags: React.FC<ComboboxWithTagsProps> = ({
  comboBtnRef,
  options = optionsDefault,
  placeholder = 'Select an option...',
  width = 'w-[250px]',
  onSelectedOptionsChange,
}) => {
  options = options.length > 0 ? options : optionsDefault
  const [selectedOptions, setSelectedOptions] = useState<ComboboxWithTagsProps['options']>([])
  const [query, setQuery] = useState('')

  const filteredOptions: typeof options =
    query === ''
      ? options
      : options.filter((option: { label: string }) => {
          return option.label
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        })

  const removeSelectedOption = (option: (typeof options)[0]) => {
    setSelectedOptions((prev) => prev.filter((opt) => opt.value !== option.value))
  }

  useEffect(() => {
    if (onSelectedOptionsChange) {
      onSelectedOptionsChange(selectedOptions)
    }
  }, [onSelectedOptionsChange, selectedOptions])

  return (
    <>
      <Combobox
        value={selectedOptions}
        onChange={setSelectedOptions}
        multiple={true}
        className={width}
      >
        <div className="relative mt-1">
          <div className="mb-1 flex flex-wrap gap-1 text-xs">
            {selectedOptions.length > 0 && (
              <>
                {selectedOptions.map((option, index) => (
                  <div key={option.value} className="flex justify-between gap-2 rounded border p-1">
                    <p>{option.label}</p>
                    <XMarkIcon
                      className="h-5 w-5 text-gray-500 hover:cursor-pointer"
                      onClick={() => removeSelectedOption(option)}
                    />
                  </div>
                ))}
              </>
            )}
          </div>

          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            {selectedOptions.length !== options.length && (
              <Combobox.Input
                className={clsx(
                  width,
                  'border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0'
                )}
                placeholder={placeholder}
                onChange={(event) => setQuery(event.target.value)}
              />
            )}
            <Combobox.Button
              ref={comboBtnRef}
              className="absolute inset-y-0 right-0 flex items-center pr-2"
            >
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
            <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {filteredOptions.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                <>
                  {filteredOptions
                    .filter((option) => !selectedOptions.includes(option))
                    .map((option) => (
                      <Combobox.Option
                        key={option.value}
                        className={({ active }) =>
                          `z-10 relative cursor-default select-none py-2 px-4 ${
                            active ? 'bg-primary-400 text-white' : 'text-gray-900'
                          }`
                        }
                        value={option}
                      >
                        {option.label}
                      </Combobox.Option>
                    ))}
                </>
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </>
  )
}

export default ComboboxWithTags
