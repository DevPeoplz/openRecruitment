import { Button } from '@/components/ui/Button'
import React, { useState } from 'react'
import { DatePicker, SelectField, TextField, TextareaField } from '@/components/ui/fields'
import { set } from 'lodash'
import { format, parse, parseISO } from 'date-fns'

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
]

const AddEventView = () => {
  const [event, setEvent] = useState({ date: '2023-10-06T19:22:00.000-05:00' })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(event)
  }

  const getDate = (date: string) => {
    const localDate = parseISO(date)
    const UTCString = format(localDate, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx")
    return UTCString
  }

  return (
    <form className="space-y-4 " onSubmit={handleSubmit}>
      <SelectField
        className="col-span-full"
        label="Candidate:"
        id="candidate"
        name="candidate"
        options={CANDIDATES}
        onChange={(e: any) => setEvent(set(event, 'candidate', e.target.value))}
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
        <SelectField
          className="col-span-2"
          label="Type:"
          id="type"
          name="type"
          options={EVENT_TYPES}
          onChange={(e: any) => setEvent(set(event, 'type', e.target.value))}
        />
      </div>
      <div className="grid grid-cols-6 gap-1">
        <DatePicker className="col-span-4 grid" setState={setEvent} hasTime={true} state={event} />
        <SelectField
          className="col-span-2"
          label="Duration:"
          id="duration"
          name="duration"
          options={DURATION_OPTIONS}
          onChange={(e: any) => setEvent(set(event, 'duration', e.target.value))}
        />
      </div>
      <SelectField
        className="col-span-full"
        label="Interviewer:"
        id="interviewer"
        name="interviewer"
        options={[]}
        onChange={(e: any) => setEvent(set(event, 'interviewer', e.target.value))}
      />
      <TextareaField
        className="col-span-full"
        label="Description:"
        id="description"
        name="description"
        onChange={(e: any) => setEvent(set(event, 'description', e.target.value))}
      />
      <TextareaField
        className="col-span-full"
        label="Note:"
        id="note"
        name="note"
        onChange={(e: any) => setEvent(set(event, 'note', e.target.value))}
      />

      <Button type="submit" color="primary" className="mt-8 w-full">
        Create
      </Button>
    </form>
  )
}

export default AddEventView
