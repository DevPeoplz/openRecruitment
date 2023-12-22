import React, { useState, useEffect, FC } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { compareAsc, isSameDay } from 'date-fns'
import { Event } from './event-card'

type DaysInCalendar = {
  date: Date
  isCurrentMonth: boolean
  isToday: boolean
  isSelected: boolean
  thereIsEvent: boolean
  year: number
  month: number
  day: number
}[]

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

const currentDate = new Date()

type Props = {
  dateSelected: string
  selectDate: (date: Date) => void
  events: Event[]
}

const DateSelector: FC<Props> = ({ selectDate, dateSelected, events }) => {
  const [month, setMonth] = useState(currentDate.toLocaleString('default', { month: 'long' }))
  const [days, setDays] = useState<DaysInCalendar | []>([])

  useEffect(() => {
    const currentYear = currentDate.getFullYear()
    currentDate.setFullYear(currentYear)
    const currentMonth = months.indexOf(month)
    currentDate.setMonth(currentMonth)
    const currentDay = currentDate.getDate()

    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()

    const daysArray = Array.from({ length: daysInMonth + firstDay }, (_, i) => {
      if (i < firstDay) {
        return null
      } else {
        const day = i - firstDay + 1
        const date = new Date(currentYear, currentMonth, day)
        return {
          date,
          isCurrentMonth: true,
          isToday: compareAsc(date, new Date(currentYear, new Date().getMonth(), currentDay)) === 0,
          isSelected: compareAsc(date, new Date(dateSelected)) === 0,
          thereIsEvent: events?.some((event: Event) => {
            return isSameDay(date, new Date(event.date))
          }),
          year: currentYear,
          month: currentMonth + 1,
          day,
        }
      }
    })
    setDays(daysArray.filter((day) => day !== null) as DaysInCalendar)
  }, [month, dateSelected, events])

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
        <div>S</div>
        <div>M</div>
        <div>T</div>
        <div>W</div>
        <div>T</div>
        <div>F</div>
        <div>S</div>
      </div>
      <div className="isolate mt-2 grid grid-cols-7 gap-px overflow-hidden rounded-lg bg-gray-100 text-sm shadow ring-1 ring-gray-200">
        {days.map((day: DaysInCalendar[number], index) => (
          <button
            key={index}
            type="button"
            className={clsx(
              'flex  py-1.5 hover:bg-gray-100 focus:z-10',
              day?.isCurrentMonth ? 'bg-white' : 'bg-gray-100',
              day?.isSelected && 'font-semibold',
              day?.isSelected && 'text-white',
              !day?.isSelected && day?.isCurrentMonth && !day?.isToday && ' text-gray-900',
              !day?.isSelected && !day?.isCurrentMonth && !day?.isToday && 'text-gray-400',
              day?.isToday && !day?.isSelected && ' text-white'
            )}
            onClick={() => {
              const year = day?.year ?? 0
              const month = day?.month ? day.month - 1 : 0
              const dayOfMonth = day?.day ?? 1
              const date = new Date(year, month, dayOfMonth)
              selectDate(date)
            }}
          >
            <time
              dateTime={day?.date.toISOString()}
              className={clsx(
                'mx-auto flex items-center justify-center  rounded-full px-1 ',
                day?.isToday && !day?.isSelected && 'bg-tertiary-500 text-white',
                day?.isSelected && day?.isToday && 'bg-tertiary-500',
                day?.isSelected && !day?.isToday && ' bg-gray-900'
              )}
            >
              {day?.date.getDate().toString().split('-').pop()?.replace(/^0/, '')}
            </time>
            {day?.thereIsEvent && (
              <div className=" relative right-1 h-1 w-1 rounded-full bg-warning" />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

export default DateSelector
