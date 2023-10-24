import React, { FC } from 'react'
import { CalendarDaysIcon } from '@heroicons/react/24/outline'

const EmptyState: FC<{ tab: string }> = ({ tab }) => {
  return (
    <div className="my-4 flex w-full flex-col items-center justify-center gap-2 ">
      <CalendarDaysIcon className="h-16 w-16" />
      {tab == 'past' ? (
        <h2 className="text-xl">No past events</h2>
      ) : (
        <h2 className="text-xl">No upcoming events</h2>
      )}
      <p>When you schedule an event with a candidate, it will appear here</p>
    </div>
  )
}

export default EmptyState
