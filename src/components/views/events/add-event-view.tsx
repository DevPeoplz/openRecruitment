import { Button } from '@/components/ui/Button'
import React, { useState } from 'react'
import { TextField, TextareaField } from '@/components/ui/fields'
import { set } from 'lodash'
import { Select } from '@/components/ui/select'
import { DatePicker } from '@/components/ui/date-picker'

const CANDIDATES = [
  {
    value: '1',
    label: 'Jhon Doe',
  },
  {
    value: '2',
    label: 'Jane Doe',
  },
  {
    value: '3',
    label: 'Jhon Smith',
  },
]

const EVENT_TYPES = [
  { value: 'meeting', label: 'Meeting' },
  { value: 'interview', label: 'Interview' },
  { value: 'call', label: 'Call' },
]

const DURATION_OPTIONS = [
  { value: 900, label: '15 min' },
  { value: 1800, label: '30 min' },
  { value: 2700, label: '45 min' },
  { value: 3600, label: '1 hour' },
  { value: 5400, label: '1 hour 30 min' },
  { value: 7200, label: '2 hours' },
  { value: 9000, label: '2 hours 30 min' },
  { value: 10800, label: '3 hours' },
  { value: 12600, label: '3 hours 30 min' },
  { value: 14400, label: '4 hours' },
]

const AddEventView = () => {
  const [event, setEvent] = useState<{
    duration: string | number
    candidate: string
    interviewer: string
    type: string
    note?: string
    privateNote?: string
  }>({
    candidate: '',
    duration: 900,
    interviewer: '',
    type: '',
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(event)
  }

  return (
    <form className="space-y-4 " onSubmit={handleSubmit}>
      <Select
        defaultSize="col-span-full"
        label="Candidate:"
        selected={event.candidate}
        list={CANDIDATES}
        onChange={(e) => setEvent({ ...event, candidate: e })}
      />
      <div className="grid grid-cols-6 gap-1">
        <TextField
          className="col-span-4"
          label="Location:"
          id="location"
          name="location"
          type="text"
          autoComplete="location"
          required
          onChange={(e) => setEvent(set(event, 'location', e.target.value))}
        />
        <div className="col-span-2">
          <Select
            label="Type:"
            selected={event.type}
            list={EVENT_TYPES}
            onChange={(e) => setEvent({ ...event, type: e })}
          />
        </div>
      </div>

      <div className="grid grid-cols-6 gap-1">
        <DatePicker className="col-span-4" hasTime={true} label="Date:" />
        <div className="col-span-2 flex flex-col items-start justify-center">
          <Select
            list={DURATION_OPTIONS}
            label="Duration:"
            onChange={(e) => setEvent({ ...event, duration: e })}
            selected={event.duration}
          />
        </div>
      </div>
      <Select
        defaultSize="col-span-full"
        label="Interviewer:"
        selected={event.interviewer}
        list={[{ value: '1', label: 'Jhon Doe' }]}
      />

      <TextareaField
        className="col-span-full"
        label="Description:"
        id="description"
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setEvent({ ...event, note: e.target.value })
        }
      />
      <TextareaField
        className="col-span-full"
        label="Note:"
        id="note"
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setEvent({ ...event, privateNote: e.target.value })
        }
      />

      <Button type="submit" color="primary" className="mt-8 w-full">
        Create
      </Button>
    </form>
  )
}

export default AddEventView
