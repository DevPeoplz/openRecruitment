import React, { useState } from 'react'
import { NextPageWithLayout } from '../_app'
import LayoutAuthenticated from '@/components/layout/layout-authenticated'
import { LayoutSideMenu } from '@/components/layout/main/layout-side-menu'
import Loader from '@/components/ui/loader'
import EventsCard from '@/components/cards/events-cards'
import clsx from 'clsx'
import EventsTags from '@/components/views/events/events-tabs'
import EmptyState from '@/components/views/events/events-empy-state'
import { Button } from '@/components/ui/Button'
import { CalendarDaysIcon } from '@heroicons/react/24/outline'
import { GoCalendar } from 'react-icons/go'
import AddEventModal from '@/components/modals/add-event-modal'
import DatePicker from '@/components/views/events/date-picker'

const EVENTS = [
  {
    date: 'today',
    time: '2:00pm - 3:00pm',
    duration: 30,
    type: 'meeting',
    location: 'virtual',
    note: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatum, maxime dolorem ducimus neque laborum est officia distinctio esse dicta rerum voluptatem. Ipsum, nesciunt hic aut magni magnam quaerat alias nulla!',
    privateNote: 'this is a private note',
    candidate: 'Jhon Doe',
    description: 'First meeting',
  },
  {
    date: 'today',
    time: '2:00pm - 3:00pm',
    duration: 30,
    type: 'meeting',
    location: 'virtual',
    note: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatum, maxime dolorem ducimus neque laborum est officia distinctio esse dicta rerum voluptatem. Ipsum, nesciunt hic aut magni magnam quaerat alias nulla!',
    privateNote: 'this is a private note',
    candidate: 'Jhon Doe',
    description: 'First meeting',
  },
  {
    date: 'today',
    time: '2:00pm - 3:00pm',
    duration: 30,
    type: 'meeting',
    location: 'virtual',
    note: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatum, maxime dolorem ducimus neque laborum est officia distinctio esse dicta rerum voluptatem. Ipsum, nesciunt hic aut magni magnam quaerat alias nulla!',
    privateNote: 'this is a private note',
    candidate: 'Jhon Doe',
    description: 'First meeting',
  },
  {
    date: 'today',
    time: '2:00pm - 3:00pm',
    duration: 30,
    type: 'meeting',
    location: 'virtual',
    note: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatum, maxime dolorem ducimus neque laborum est officia distinctio esse dicta rerum voluptatem. Ipsum, nesciunt hic aut magni magnam quaerat alias nulla!',
    privateNote: 'this is a private note',
    candidate: 'Jhon Doe',
    description: 'First meeting',
  },
  {
    date: 'today',
    time: '2:00pm - 3:00pm',
    duration: 30,
    type: 'meeting',
    location: 'virtual',
    note: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatum, maxime dolorem ducimus neque laborum est officia distinctio esse dicta rerum voluptatem. Ipsum, nesciunt hic aut magni magnam quaerat alias nulla!',
    privateNote: 'this is a private note',
    candidate: 'Jhon Doe',
    description: 'First meeting',
  },
]

// model Event {
//   id                Int                @id @default(autoincrement())
//   date              DateTime
//   time              Int
//   duration          Int
//   type              String
//   location          String
//   note              String
//   privateNote       String
//   company           Company            @relation(fields: [companyId], references: [id])
//   companyId         String
//   eventInterviewers EventInterviewer[]
//   eventEvaluations  EventEvaluation[]
// }

const TABS = ['upcoming', 'past']

const Events: NextPageWithLayout = () => {
  const [currentTab, setCurrentTab] = useState('upcoming')
  const [openModal, setOpenModal] = useState(false)
  return (
    <LayoutSideMenu>
      <div className="grid w-9/12 grid-cols-6 gap-4">
        <div className="col-span-4 flex flex-col gap-2">
          <h2>Events</h2>
          <div className="flex justify-between">
            <EventsTags tabs={TABS} currentTab={currentTab} setCurrentTab={setCurrentTab} />
            <Button
              variant="solid"
              color="primary"
              size="small"
              icon={<GoCalendar />}
              onClick={() => setOpenModal(true)}
            >
              Schedule
            </Button>
          </div>
          <div className="flex flex-col gap-1 overflow-y-hidden">
            {EVENTS.length == 0 ? (
              <EmptyState />
            ) : (
              EVENTS.map((event, index) => {
                return <EventsCard key={index} event={event} />
              })
            )}
          </div>
        </div>
        <DatePicker />
      </div>
      <AddEventModal isOpen={openModal} setIsOpen={setOpenModal} />
    </LayoutSideMenu>
  )
}

Events.auth = {
  permission: 'SUPERADMIN',
  loading: (
    <LayoutAuthenticated>
      <LayoutSideMenu>
        <Loader />
      </LayoutSideMenu>
    </LayoutAuthenticated>
  ),
}

export default Events
