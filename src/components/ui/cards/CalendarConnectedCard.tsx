import React from 'react'
import Avatar from '../Avatar'
import { Button } from '../Button'

interface props {
  calendar: calendar
}

interface calendar {
  id: number
  name: string
  logo: string
  email: string
}

const CalendarConnectedCard: React.FC<props> = ({ calendar }) => {
  return (
    <div className="mt-4 flex justify-between rounded-md border border-l-4 border-l-primary-500 py-2">
      <div className="flex gap-4 ">
        <Avatar name={calendar.name} />
        <div className="flex flex-col">
          <h2 className="text-sm font-bold md:text-lg">{calendar.name}</h2>
          <p className="text-xs text-gray-500 md:text-sm">{calendar.email}</p>
        </div>
      </div>
      <div className="flex items-center gap-4 p-2">
        <p className="text-xs text-gray-500 md:text-lg">Connected</p>
        <Button variant="outline" color="gray" size="small">
          Disconnect
        </Button>
      </div>
    </div>
  )
}

export default CalendarConnectedCard
