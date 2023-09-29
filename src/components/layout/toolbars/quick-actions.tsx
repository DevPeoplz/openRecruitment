import React, { useState } from 'react'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import AddCandidateModal from '@/components/modals/add-candidate-modal'

const QuickActionsToolbar = () => {
  const [openModal, setOpenModal] = useState(false)

  return (
    <div className="fixed bottom-5 right-5 z-10">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button
            className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-secondary-400 px-3 py-2 text-sm font-semibold text-white shadow-xl ring-1 ring-inset ring-gray-300 hover:bg-secondary-200"
            onClick={() => setOpenModal(false)}
          >
            Quick Actions
            <ChevronDownIcon className="-mr-1 h-5 w-5 text-white" aria-hidden="true" />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute bottom-full right-0 z-10 mb-2 w-56 origin-top-right rounded-md bg-secondary-400 text-white shadow-xl ring-1 ring-black/5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <>
                    <div
                      className={clsx(
                        active ? 'bg-gray-100 text-gray-900' : 'text-white',
                        'flex cursor-pointer px-4 py-2 text-sm'
                      )}
                      onClick={() => setOpenModal(true)}
                    >
                      <PlusCircleIcon
                        className="mr-2 h-5 w-5 text-white hover:text-gray-900"
                        aria-hidden="true"
                      />
                      Add Candidate
                    </div>
                  </>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
      <AddCandidateModal isOpen={openModal} setIsOpen={setOpenModal} />
    </div>
  )
}

export default QuickActionsToolbar
