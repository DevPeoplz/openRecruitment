import { Menu, Transition } from '@headlessui/react'
import React, { Fragment, FC } from 'react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'
import { Button } from './Button'

const ButtonDropdown: FC<{ list: string[]; Icon?: FC; label: string; selectOption: any }> = ({
  list,
  Icon,
  label,
  selectOption,
}) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      {({ open }) => (
        <>
          <Menu.Button className="flex items-center">
            <Button variant="solid" color="primary" size="full">
              <span className="flex h-full items-center gap-1">
                <Icon name="home" className="h-5 w-5" />
                {label}
                {open ? (
                  <ChevronUpIcon className="h-5 w-5" />
                ) : (
                  <ChevronDownIcon className="h-5 w-5" />
                )}
              </span>
            </Button>
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white p-2 shadow-lg ring-1 ring-black focus:outline-none">
              {list.map((item, index) => {
                return (
                  <Menu.Item key={index}>
                    <span
                      className="flex h-full cursor-pointer items-center gap-1 rounded-md px-0 hover:bg-primary-500 hover:text-white"
                      onClick={selectOption}
                      id={item}
                    >
                      <p className="p-1 capitalize">{item}</p>
                    </span>
                  </Menu.Item>
                )
              })}
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  )
}

export default ButtonDropdown
