import React, { useState } from 'react'
import { NextPageWithLayout } from '../_app'
import LayoutAuthenticated from '@/components/layout/layout-authenticated'
import { LayoutSideMenu } from '@/components/layout/main/layout-side-menu'
import Loader from '@/components/ui/loader'
import EventsCard from '@/components/views/events/event-card'
import EventsTags from '@/components/views/events/events-tabs'
import EmptyState from '@/components/views/events/events-empy-state'
import { Button } from '@/components/ui/Button'
import { GoCalendar } from 'react-icons/go'
import AddEventModal from '@/components/modals/add-event-modal'
import DateSelector from '@/components/views/events/date-selector'
import ButtonDropdown from '@/components/ui/btn-dropdown'
import { BarsArrowDownIcon } from '@heroicons/react/24/outline'
import { compareAsc } from 'date-fns'
import { Event } from '@/components/views/events/event-card'
import { useMutation, useQuery } from '@apollo/client'
import { GET_HUB_EVENTS } from '@/graphql-operations/queries/dashboard-candidates'

const LIST_TYPES = ['meeting', 'interview', 'call', 'all events']
const EVENT_TYPES = ['meeting', 'interview', 'call']
const EVENTS = [
  {
    date: new Date(2023, 9, 21),
    time: '2:00pm - 3:00pm',
    type: `${EVENT_TYPES[Math.floor(Math.random() * EVENT_TYPES.length)]}`,
    location: 'virtual',
    note: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatum, maxime dolorem ducimus neque laborum est officia distinctio esse dicta rerum voluptatem. Ipsum, nesciunt hic aut magni magnam quaerat alias nulla!',
    privateNote: 'this is a private note',
    candidate: 'Jhon Doe',
    description: 'First meeting',
    candidateAvatar: `https://randomuser.me/api/portraits/women/${Math.floor(
      Math.random() * 99
    )}.jpg`,
    interviewers: [
      {
        id: 1,
        name: 'Jhon Doe',
        avatar: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 99)}.jpg`,
      },
      {
        id: 2,
        name: 'Jhon Doe',
        avatar: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 99)}.jpg`,
      },
      {
        id: 3,
        name: 'Jhon Doe',
        avatar: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 99)}.jpg`,
      },
    ],
  },
  {
    date: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 30)),
    time: '2:00pm - 3:00pm',
    type: `${EVENT_TYPES[Math.floor(Math.random() * EVENT_TYPES.length)]}`,
    location: 'virtual',
    note: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatum, maxime dolorem ducimus neque laborum est officia distinctio esse dicta rerum voluptatem. Ipsum, nesciunt hic aut magni magnam quaerat alias nulla!',
    privateNote: 'this is a private note',
    candidate: 'Jhon Doe',
    description: 'First meeting',
    candidateAvatar: `https://randomuser.me/api/portraits/women/${Math.floor(
      Math.random() * 99
    )}.jpg`,
    interviewers: [
      {
        id: 1,
        name: 'Jhon Doe',
        avatar: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 99)}.jpg`,
      },
      {
        id: 2,
        name: 'Jhon Doe',
        avatar: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 99)}.jpg`,
      },
      {
        id: 3,
        name: 'Jhon Doe',
        avatar: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 99)}.jpg`,
      },
    ],
  },

  {
    date: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 30)),
    time: '2:00pm - 3:00pm',
    type: `${EVENT_TYPES[Math.floor(Math.random() * EVENT_TYPES.length)]}`,
    location: 'virtual',
    note: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatum, maxime dolorem ducimus neque laborum est officia distinctio esse dicta rerum voluptatem. Ipsum, nesciunt hic aut magni magnam quaerat alias nulla!',
    privateNote: 'this is a private note',
    candidate: 'Jhon Doe',
    description: 'First meeting',
    candidateAvatar: `https://randomuser.me/api/portraits/women/${Math.floor(
      Math.random() * 99
    )}.jpg`,
    interviewers: [
      {
        id: 1,
        name: 'Jhon Doe',
        avatar: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 99)}.jpg`,
      },
      {
        id: 2,
        name: 'Jhon Doe',
        avatar: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 99)}.jpg`,
      },
      {
        id: 3,
        name: 'Jhon Doe',
        avatar: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 99)}.jpg`,
      },
    ],
  },
  {
    date: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 30)),
    time: '2:00pm - 3:00pm',
    type: `${EVENT_TYPES[Math.floor(Math.random() * EVENT_TYPES.length)]}`,
    location: 'virtual',
    note: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatum, maxime dolorem ducimus neque laborum est officia distinctio esse dicta rerum voluptatem. Ipsum, nesciunt hic aut magni magnam quaerat alias nulla!',
    privateNote: 'this is a private note',
    candidate: 'Jhon Doe',
    description: 'First meeting',
    candidateAvatar: `https://randomuser.me/api/portraits/men/${Math.floor(
      Math.random() * 99
    )}.jpg`,
    interviewers: [
      {
        id: 1,
        name: 'Jhon Doe',
        avatar: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 99)}.jpg`,
      },
      {
        id: 2,
        name: 'Jhon Doe',
        avatar: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 99)}.jpg`,
      },
      {
        id: 3,
        name: 'Jhon Doe',
        avatar: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 99)}.jpg`,
      },
    ],
  },
  {
    date: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 30)),
    time: '2:00pm - 3:00pm',
    type: `${EVENT_TYPES[Math.floor(Math.random() * EVENT_TYPES.length)]}`,
    location: 'virtual',
    note: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatum, maxime dolorem ducimus neque laborum est officia distinctio esse dicta rerum voluptatem. Ipsum, nesciunt hic aut magni magnam quaerat alias nulla!',
    privateNote: 'this is a private note',
    candidate: 'Jhon Doe',
    description: 'First meeting',
    candidateAvatar: `https://randomuser.me/api/portraits/men/${Math.floor(
      Math.random() * 99
    )}.jpg`,
    interviewers: [
      {
        id: 1,
        name: 'Jhon Doe',
        avatar: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 99)}.jpg`,
      },
      {
        id: 2,
        name: 'Jhon Doe',
        avatar: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 99)}.jpg`,
      },
      {
        id: 3,
        name: 'Jhon Doe',
        avatar: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 99)}.jpg`,
      },
    ],
  },
  {
    date: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 30)),
    time: '2:00pm - 3:00pm',
    type: `${EVENT_TYPES[Math.floor(Math.random() * EVENT_TYPES.length)]}`,
    location: 'virtual',
    note: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatum, maxime dolorem ducimus neque laborum est officia distinctio esse dicta rerum voluptatem. Ipsum, nesciunt hic aut magni magnam quaerat alias nulla!',
    privateNote: 'this is a private note',
    candidate: 'Jhon Doe',
    description: 'First meeting',
    candidateAvatar: `https://randomuser.me/api/portraits/men/${Math.floor(
      Math.random() * 99
    )}.jpg`,
    interviewers: [
      {
        id: 1,
        name: 'Jhon Doe',
        avatar: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 99)}.jpg`,
      },
      {
        id: 2,
        name: 'Jhon Doe',
        avatar: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 99)}.jpg`,
      },
      {
        id: 3,
        name: 'Jhon Doe',
        avatar: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 99)}.jpg`,
      },
    ],
  },
  {
    date: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 30)),
    time: '2:00pm - 3:00pm',
    type: `${EVENT_TYPES[Math.floor(Math.random() * EVENT_TYPES.length)]}`,
    location: 'virtual',
    note: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatum, maxime dolorem ducimus neque laborum est officia distinctio esse dicta rerum voluptatem. Ipsum, nesciunt hic aut magni magnam quaerat alias nulla!',
    privateNote: 'this is a private note',
    candidate: 'Jhon Doe',
    description: 'First meeting',
    candidateAvatar: `https://randomuser.me/api/portraits/men/${Math.floor(
      Math.random() * 99
    )}.jpg`,
    interviewers: [
      {
        id: 1,
        name: 'Jhon Doe',
        avatar: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 99)}.jpg`,
      },
      {
        id: 2,
        name: 'Jhon Doe',
        avatar: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 99)}.jpg`,
      },
      {
        id: 3,
        name: 'Jhon Doe',
        avatar: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 99)}.jpg`,
      },
    ],
  },
].sort((a, b) => a.date.getTime() - b.date.getTime())
const TABS = ['upcoming', 'past']

const Events: NextPageWithLayout = () => {
  const [currentTab, setCurrentTab] = useState('upcoming')
  const [openModal, setOpenModal] = useState(false)
  const [filter, setFilter] = useState('')
  const [dateSelected, setDateSelected] = useState<Date>()

  const { data: dataHubEvents, loading: loadingHubPools } = useQuery(GET_HUB_EVENTS, {
    fetchPolicy: 'cache-and-network',
  })
  const [createEntity, { loading, error, data }] = useMutation(ADD_TALENT_POOL_MUTATION)

  console.log('data', dataHubEvents)

  const currentTime = new Date().getTime()

  const events = EVENTS.filter((event) => {
    if (dateSelected) return compareAsc(event.date, dateSelected) === 0
    if (filter === 'all events') return true
    if (filter === '')
      return currentTab === 'upcoming'
        ? event.date.getTime() > currentTime
        : event.date.getTime() < currentTime
    return (
      event.type === filter &&
      (currentTab === 'upcoming'
        ? event.date.getTime() > currentTime
        : event.date.getTime() < currentTime)
    )
  })

  const selectFilter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.innerText.toLowerCase() === 'all events') {
      setDateSelected(undefined)
      setFilter('')
    } else {
      setDateSelected(undefined)
      setFilter(e.currentTarget.innerText.toLowerCase())
    }
  }

  const handleTab = (e: React.MouseEvent<HTMLButtonElement>) => {
    setDateSelected(undefined)
    setCurrentTab(e.currentTarget.id)
  }

  return (
    <LayoutSideMenu>
      <h2 className="w-8/12 justify-self-start">Events</h2>
      <div className="grid w-8/12 grid-cols-6 gap-4">
        <div className="col-span-4 flex flex-col gap-2">
          <div className="flex justify-between">
            <EventsTags tabs={TABS} currentTab={currentTab} setCurrentTab={handleTab} />
            <div className="flex items-center gap-1">
              <ButtonDropdown
                list={LIST_TYPES}
                label={filter ? filter.charAt(0).toUpperCase() + filter.slice(1) : 'My events'}
                Icon={BarsArrowDownIcon}
                selectOption={selectFilter}
              />
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
          </div>
          <div className="mt-2 flex flex-col gap-2 overflow-y-hidden">
            <p className="text-xl font-bold">{dateSelected?.toDateString()}</p>
            {events.length == 0 ? (
              <EmptyState tab={currentTab} />
            ) : (
              events.map((event: Event) => {
                return <EventsCard key={event.type} event={event} />
              })
            )}
          </div>
        </div>
        <div className="col-span-2">
          <DateSelector
            selectDate={setDateSelected}
            dateSelected={dateSelected ? dateSelected.toDateString() : ''}
            events={EVENTS}
          />
        </div>
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
