import React, { Fragment, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'

export type ComboboxWithChecksProps = {
  comboBtnRef?: React.RefObject<HTMLButtonElement>
  options: ({
    label: string
    value: string
  } & Record<string, any>)[]
  placeholder?: string
  width?: string
  onSelectedOptionsChange?: (options: string[]) => void
  initialSelection?: string[]
}

export const ComboboxWithChecks: React.FC<ComboboxWithChecksProps> = ({
  comboBtnRef,
  options = [],
  placeholder = 'Select an option...',
  width = 'w-auto',
  onSelectedOptionsChange,
  initialSelection = [],
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>(initialSelection)
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

  const handleOnChange = (options: string[]) => {
    setSelectedOptions(options)
    if (onSelectedOptionsChange) {
      onSelectedOptionsChange(options)
    }
  }

  return (
    <div className={clsx(width, 'relative mt-1')}>
      <Combobox value={selectedOptions} onChange={handleOnChange} multiple>
        <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
          <Combobox.Input
            className={clsx(
              'w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0'
            )}
            placeholder={placeholder}
            onChange={(event) => setQuery(event.target.value)}
          />
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
          <Combobox.Options className="absolute z-30 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
            {filteredOptions.length === 0 && query !== '' ? (
              <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                Nothing found.
              </div>
            ) : (
              <>
                {filteredOptions.map((option) => (
                  <Combobox.Option
                    key={option.value}
                    className={({ active }) =>
                      clsx(
                        'relative z-10 cursor-default select-none px-4 py-2 ',
                        active ? 'bg-primary-400 text-white' : 'text-gray-900'
                      )
                    }
                    value={option.value}
                  >
                    {selectedOptions?.find((op: string) => op === option.value) && (
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        <CheckIcon className="h-5 w-5 text-success" aria-hidden="true" />
                      </div>
                    )}
                    {option.label}
                  </Combobox.Option>
                ))}
              </>
            )}
          </Combobox.Options>
        </Transition>
      </Combobox>
    </div>
  )
}
