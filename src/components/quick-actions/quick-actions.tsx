import React, { Fragment, useCallback, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { SimpleModalContainer } from '@/components/modals/simple-modal-container'
import { AddCandidateView } from '@/components/views/candidate/add-candidate-view'
import { AddJobView } from '@/components/views/jobs/add-job-view'
import { AddTalentPoolView } from '@/components/views/talent-pools/add-talent-pool-view'
import AddEventView from '../views/events/add-event-view'

const QuickActionsToolbar = () => {
  const [openModal, setOpenModal] = useState<string | null>(null)

  const getModalKeyState = (key: string) => {
    return openModal === key
  }

  const setModalKeyState = useCallback(
    (key: string) => {
      return (value: boolean) => {
        if (value) {
          setOpenModal(key)
        } else {
          if (key === openModal) {
            setOpenModal(null)
          }
        }
      }
    },
    [openModal]
  )

  const getModalState = (key: string): [boolean, (x: boolean) => void] => {
    return [getModalKeyState(key), setModalKeyState(key)]
  }

  const handleClickOpenModalKey = useCallback((key: string) => {
    return () => {
      setOpenModal(key)
    }
  }, [])

  return (
    <div className="fixed bottom-5 right-5 z-10">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button
            className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-secondary-400 px-3 py-2 text-sm font-semibold text-white shadow-xl ring-1 ring-inset ring-gray-300 hover:bg-secondary-200"
            onClick={() => setOpenModal(null)}
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
          <Menu.Items className="absolute bottom-full right-0 z-10 mb-2 w-56 origin-top-right rounded-md text-white">
            <div className="space-y-1 py-1">
              {[
                { key: 'add-talent-pool-view', title: 'Add Talent Pool' },
                {
                  key: 'add-job-view',
                  title: 'Add Job',
                },
                { key: 'add-candidate-view', title: 'Add Candidate' },
                { key: 'add-event-view', title: 'Add Event' },
              ].map((item) => {
                return (
                  <Menu.Item key={item.key}>
                    <div
                      className={clsx(
                        'flex cursor-pointer rounded-md bg-secondary-400 px-4 py-2 text-sm shadow-xl ring-1 ring-black/5 hover:bg-secondary-300 focus:outline-none'
                      )}
                      onClick={handleClickOpenModalKey(item.key)}
                    >
                      <PlusCircleIcon
                        className="mr-2 h-5 w-5 text-white hover:text-primary-500"
                        aria-hidden="true"
                      />
                      {item.title}
                    </div>
                  </Menu.Item>
                )
              })}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
      <SimpleModalContainer state={getModalState('add-candidate-view')} title={'Add New Candidate'}>
        <AddCandidateView />
      </SimpleModalContainer>
      <SimpleModalContainer state={getModalState('add-job-view')} title={'Add New Job'}>
        <AddJobView />
      </SimpleModalContainer>
      <SimpleModalContainer
        state={getModalState('add-talent-pool-view')}
        title={'Add New Talent Pool'}
      >
        <AddTalentPoolView />
      </SimpleModalContainer>
      <SimpleModalContainer state={getModalState('add-event-view')} title={'Add New Event'}>
        <AddEventView />
      </SimpleModalContainer>
    </div>
  )
}

export default QuickActionsToolbar
