import React, { useState, useEffect } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const meetings = [
  {
    id: 1,
    date: 'January 10th, 2022',
    time: '5:00 PM',
    datetime: '2022-01-10T17:00',
    name: 'Leslie Alexander',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    location: 'Starbucks',
  },
  // More meetings...
]

const DatePicker = () => {
  const [month, setMonth] = useState(months[0])
  const [days, setDays] = useState([])

  useEffect(() => {
    const daysInMonth = new Date(2022, months.indexOf(month) + 1, 0).getDate()
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
      const date = `${2022}-${months.indexOf(month) + 1}-${day.toString().padStart(2, '0')}`
      return {
        date,
        isCurrentMonth: true,
        isToday: date === new Date().toISOString().slice(0, 10),
        isSelected: date === '2023-10-12',
      }
    })
    setDays(days)
  }, [month])

  const showNextMonth = () => {
    const monthIndex = months.findIndex((m) => m === month)
    if (monthIndex === months.length - 1) {
      setMonth(months[0])
    } else {
      setMonth(months[monthIndex + 1])
    }
  }

  const showPreviousMonth = () => {
    const monthIndex = months.findIndex((m) => m === month)
    if (monthIndex === 0) {
      setMonth(months[months.length - 1])
    } else {
      setMonth(months[monthIndex - 1])
    }
  }

  return (
    <div>
      <div className="flex items-center  text-center text-gray-900">
        <button
          type="button"
          className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
          onClick={showPreviousMonth}
        >
          <span className="sr-only">Previous month</span>
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        </button>
        <div className="flex-auto text-sm font-semibold">{month}</div>
        <button
          type="button"
          className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
          onClick={showNextMonth}
        >
          <span className="sr-only">Next month</span>
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      <div className="mt-6 grid grid-cols-7 text-center text-xs leading-6 text-gray-500">
        <div>M</div>
        <div>T</div>
        <div>W</div>
        <div>T</div>
        <div>F</div>
        <div>S</div>
        <div>S</div>
      </div>
      <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200">
        {days.map((day, dayIdx) => (
          <button
            key={day.date}
            type="button"
            className={clsx(
              'py-1.5 hover:bg-gray-100 focus:z-10',
              day.isCurrentMonth ? 'bg-white' : 'bg-gray-50',
              (day.isSelected || day.isToday) && 'font-semibold',
              day.isSelected && 'text-white',
              !day.isSelected && day.isCurrentMonth && !day.isToday && 'text-gray-900',
              !day.isSelected && !day.isCurrentMonth && !day.isToday && 'text-gray-400',
              day.isToday && !day.isSelected && 'text-indigo-600',
              dayIdx === 0 && 'rounded-tl-lg',
              dayIdx === 6 && 'rounded-tr-lg',
              dayIdx === days.length - 7 && 'rounded-bl-lg',
              dayIdx === days.length - 1 && 'rounded-br-lg'
            )}
          >
            <time
              dateTime={day.date}
              className={clsx(
                'mx-auto flex  items-center justify-center rounded-full',
                day.isSelected && day.isToday && 'bg-indigo-600',
                day.isSelected && !day.isToday && 'bg-gray-900'
              )}
            >
              {day.date.split('-').pop()?.replace(/^0/, '')}
            </time>
          </button>
        ))}
      </div>
    </div>
  )
}

export default DatePicker
