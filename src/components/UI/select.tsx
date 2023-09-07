import React, { Fragment, ReactNode } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'

export function Select({
  selected,
  list,
  onChange,
  defaultSize = 'w-36 sm:w-48',
  label,
}: {
  selected: string | number
  list: { label: string; value: string | number; placeholder?: boolean }[]
  onChange?: (value: string) => void
  defaultSize?: string
  label?: ReactNode | string
}) {
  const selectedElement = list.find((elm) => elm.value === selected) ?? list[0]

  return (
    <Listbox value={selected} onChange={onChange}>
      {({ open }) => (
        <>
          {label && (
            <Listbox.Label>
              {typeof label === 'string' ? <span className="font-bold">{label}</span> : label}
            </Listbox.Label>
          )}
          <div className={clsx('relative', defaultSize)}>
            <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-2 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 sm:pr-10 sm:text-sm sm:leading-6">
              <span className="block truncate">{selectedElement?.label}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 hidden items-center pr-2 sm:flex">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-30 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                {list.map((element) => (
                  <Listbox.Option
                    key={element.value}
                    className={({ active }) =>
                      clsx(
                        active ? 'bg-primary-500 text-white' : 'text-gray-900',
                        element.placeholder ? 'cursor-not-allowed opacity-50' : '',
                        'relative cursor-default select-none p-2 sm:pl-8 sm:pr-4'
                      )
                    }
                    value={element.value}
                    disabled={element.placeholder}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={clsx(
                            selected ? 'font-semibold' : 'font-normal',
                            'block truncate'
                          )}
                        >
                          {element.label}
                        </span>

                        {selected ? (
                          <span
                            className={clsx(
                              active ? 'text-white' : 'text-primary-600',
                              'absolute inset-y-0 left-0 hidden items-center pl-1.5 sm:flex'
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}
