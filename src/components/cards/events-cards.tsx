import React, { FC } from 'react'

export type Event = {
  date: string
  time: string
  candidate: string
  description: string
  location: string
  note: string
}

type Props = {
  event: Event
}

const EventsCard: FC<Props> = ({ event }) => {
  return (
    <div className="flex w-full flex-col gap-2 rounded-md border-2 p-2">
      <span className="flex flex-col">
        <h3 className="font-bold capitalize">{event.date}</h3>
        <p>{event.time}</p>
      </span>
      <div className="grid w-full grid-cols-2 gap-1">
        <span className="col-span-1 flex gap-1">
          <h3 className="font-bold">{event.candidate}:</h3>
          <p>{event.description}</p>
        </span>
        <span className="col-span-1 flex gap-1">
          <h3 className="font-bold">Location:</h3>
          <p className="capitalize">{event.location}</p>
        </span>
      </div>
      <span>
        <h3 className="font-bold">Note: </h3>
        <p>{event.note}</p>
      </span>
    </div>
  )
}

export default EventsCard
