import React, { useRef, useState } from 'react'
import { Menu } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import { useClickAway } from 'react-use'

interface DropdownWithChecksProps {
  icon?: React.FC
  columns: {
    id: string
    label: string
    checked: boolean
    onClick?: (event: unknown) => void
    needsDivider?: boolean
  }[]
}

const DropdownWithChecks: React.FC<DropdownWithChecksProps> = ({
  icon: ButtonIcon = ChevronDownIcon,
  columns,
}) => {
  const ref = useRef(null)
  const [customOpen, setCustomOpen] = useState(false)

  function buttonClicked() {
    setCustomOpen((prev) => !prev)
  }

  useClickAway(ref, () => {
    setCustomOpen(false)
  })

  return (
    <Menu ref={ref} as="div" className="relative inline-block text-left">
      {({ open }) => (
        <>
          <div>
            <Menu.Button
              onClick={buttonClicked}
              className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white p-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              <ButtonIcon className="h-5 w-5" aria-hidden="true" />
            </Menu.Button>
          </div>

          {customOpen && (
            <Menu.Items
              static
              className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
            >
              <div className="py-1">
                {columns.map((column) => (
                  <Menu.Item key={column.id}>
                    {({ active, close }) => (
                      <span
                        className={clsx(
                          column.needsDivider ? 'border-b-2 border-b-gray-100 ' : '',
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'relative block cursor-pointer select-none px-4 py-2 text-sm'
                        )}
                        {...{
                          ...(column.onClick ? { onClick: column.onClick } : {}),
                        }}
                      >
                        {column.label === '' ? column.id : column.label}

                        {column.checked && (
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                            <CheckIcon className="h-5 w-5 text-primary-500" aria-hidden="true" />
                          </div>
                        )}
                      </span>
                    )}
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          )}
        </>
      )}
    </Menu>
  )
}

export default DropdownWithChecks
