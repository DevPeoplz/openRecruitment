import React from 'react'
import { user } from '@/utils/mockdata'
import { Button } from '@/components/ui/Button'
import { GoCalendar, GoPlus } from 'react-icons/go'
import CalendarConnectedCard from '@/components/ui/cards/CalendarConnectedCard'

const EmptyState = () => {
  return (
    <div className="m-4 flex flex-col items-center gap-4 rounded-lg border bg-gray-200 py-4">
      <GoCalendar className="h-16 w-16 text-gray-500" />
      <h2 className="text-lg font-bold text-gray-500">No calendars synced</h2>
      <p className="text-center text-gray-500">Sync your calendar to start scheduling meetings</p>
      <Button icon={<GoPlus />} size="large">
        Sync Calendar
      </Button>
    </div>
  )
}

const Calendars = () => {
  return user.calendars ? (
    <div>
      {user.calendars.map((calendar) => (
        <CalendarConnectedCard key={calendar.id} calendar={calendar} />
      ))}
      <div className="mt-4 flex flex-row-reverse">
        <Button variant="solid" color="primary" size="large" icon={<GoPlus />}>
          Add Calendar
        </Button>
      </div>
    </div>
  ) : (
    <EmptyState />
  )
}

export default Calendars
