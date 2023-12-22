import DeleteEventModal from '@/components/modals/delete-event-modal'
import Avatar from '@/components/ui/avatar'
import {
  CalendarDaysIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ClockIcon,
  MapPinIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import React, { FC, useState } from 'react'
import { Tooltip } from 'react-tooltip'

export type Event = {
  id: string
  date: Date
  duration: number
  candidates: { id: string; name: string }[]
  description: string
  location: string
  note?: string
  candidateAvatar: string
  type: string
  privateNote?: string
  interviewers: {
    user: {
      id: string
      photo: {
        path: string
      }
      name: string
    }
  }[]
}

type Props = {
  event: Event
}

const EventsCard: FC<Props> = ({ event }) => {
  const [showNotes, setShowNotes] = useState(false)
  const [openDeleteEventModal, setOpenDeleteEventModal] = useState(false)

  return (
    <div className="flex flex-col gap-2  rounded-md border py-2 shadow-md">
      <div className="grid grid-cols-12 px-4">
        <div className="col-span-2 ">
          <Avatar src={event.candidateAvatar} name={event.candidates[0]?.name} />
        </div>
        <div className="col-span-9 flex flex-col ">
          <h3 className="font-bold capitalize">
            {event.type} - {event?.candidates[0]?.name}:
          </h3>
          <div className="grid grid-cols-3">
            <span className="col-span-1 flex items-center gap-1">
              <CalendarDaysIcon className="h-5 w-5 text-gray-500" />
              <p className="capitalize">{new Date(event.date).toLocaleString()}</p>
            </span>
            <span className="col-span-1 flex items-center gap-1">
              <ClockIcon className="h-5 w-5 text-gray-500" />
              <p className="capitalize">{`${event.duration / 60} min`}</p>
            </span>
            <span className="col-span-1 flex items-center gap-1">
              <MapPinIcon className="h-5 w-5 text-gray-500" />
              <p className="capitalize">{event.location}</p>
            </span>
          </div>
        </div>
        <div className="col-span-1 flex flex-col items-end justify-between">
          <Tooltip
            place="right"
            content="Delete event"
            id="delete-event-tooltip"
            className="z-10 capitalize"
          >
            <span className="text-xs ">Delete event</span>
          </Tooltip>

          <button
            data-tooltip-id="delete-event-tooltip"
            data-tooltip-content="Delete event"
            onClick={() => setOpenDeleteEventModal(true)}
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
          <DeleteEventModal
            isOpen={openDeleteEventModal}
            setIsOpen={setOpenDeleteEventModal}
            id={event.id}
          />
          <button onClick={() => setShowNotes(!showNotes)}>
            {showNotes ? (
              <ChevronUpIcon className="h-5 w-5" />
            ) : (
              <ChevronDownIcon className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
      {showNotes && (
        <div className="flex flex-col gap-2 border-t-2 border-dashed px-4 pt-2">
          {event.note && (
            <div className="flex flex-col gap-1">
              <h3 className="font-bold">Note: </h3>
              <p>{event.note}</p>
            </div>
          )}
          {event.privateNote && (
            <div className="flex flex-col gap-1">
              <h3 className="font-bold">Private Note: </h3>
              <p>{event.privateNote}</p>
            </div>
          )}
          <div className="flex -space-x-1 self-end overflow-hidden">
            {event.interviewers.map((interviewer: Event['interviewers'][0]) => (
              <>
                <div data-tooltip-id={`interviewer-${interviewer.user.id}`}>
                  <Avatar
                    size="small"
                    src={interviewer.user.photo?.path}
                    name={interviewer.user.name}
                    className="inline-block cursor-pointer"
                    key={interviewer.user.id}
                  />
                  <Tooltip
                    id={`interviewer-${interviewer.user.id}`}
                    content={interviewer.user.name}
                  />
                </div>
              </>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default EventsCard
