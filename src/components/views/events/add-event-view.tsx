import { Button } from '@/components/ui/Button'
import React, { useContext, useState, useEffect } from 'react'
import { TextField, TextareaField } from '@/components/ui/fields'
import { set } from 'lodash'
import { Select } from '@/components/ui/select'
import { DatePicker } from '@/components/ui/date-picker'
import { useMutation, useQuery } from '@apollo/client'
import { ADD_EVENT_MUTATION } from '@/graphql-operations/mutations'
import { GET_CANDIDATES, GET_HIRING_ROLES } from '@/graphql-operations/queries'
import { useSession } from 'next-auth/react'
import Alert from '@/components/alert'
import { ModalControlContext } from '@/hooks/contexts'

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
    duration?: string | number
    candidates?: any
    interviewers?: any
    type: string
    note?: string
    privateNote?: string
    location?: string
    date?: string | Date
  }>({
    date: new Date(),
    type: 'meeting',
  })
  const [_, setIsOpen] = useContext(ModalControlContext)
  const { data: session } = useSession()
  const [onSubmitLoading, setOnSubmitLoading] = useState<boolean>(false)
  const [interviewers, setInterviewers] = useState<any>([])
  const { data: loadCandidate, loading: loadingCandidates } = useQuery(GET_CANDIDATES, {
    variables: {
      where: {
        company: {
          id: {
            equals: session?.user?.selectedCompany,
          },
        },
      },
    },
  })

  const { data: dataInterviewers, loading: loadingInterviewers } = useQuery(GET_HIRING_ROLES, {
    variables: {
      where: {
        company: {
          id: {
            equals: session?.user?.selectedCompany,
          },
        },
      },
    },
  })

  useEffect(() => {
    if (dataInterviewers?.findManyHiringRole)
      setInterviewers(
        dataInterviewers?.findManyHiringRole.map(
          (elm: { user: { id: string; firstName: string; lastName: string } }) => ({
            value: elm.user.id,
            label: `${elm.user.firstName} ${elm.user.lastName}`,
          })
        )
      )
  }, [dataInterviewers?.findManyHiringRole])

  const [createEntity, { loading, error, data }] = useMutation(ADD_EVENT_MUTATION)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setOnSubmitLoading(true)
    createEntity({
      variables: {
        data: event,
      },
    })
      .then(async (res) => {
        Alert({
          type: 'success',
          message: 'Event created successfully',
        })
      })
      .catch((err) => {
        Alert({
          type: 'error',
          message: 'Error creating event',
        })
        console.error(err)
      })
      .finally(async () => {
        setIsOpen(false)

        setOnSubmitLoading(false)
      })
  }

  return (
    <form className="space-y-4 " onSubmit={handleSubmit}>
      <Select
        defaultSize="col-span-full"
        label="Candidate:"
        selected={String(event?.candidates?.connect[0]?.id)}
        list={!loadingCandidates ? loadCandidate?.findManyCandidate : []}
        onChange={(e) => {
          setEvent({
            ...event,
            candidates: {
              connect: [
                {
                  id: +e,
                },
              ],
            },
          })
        }}
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
        <DatePicker
          className="col-span-4"
          hasTime={true}
          label="Date:"
          onChange={(e) => setEvent({ ...event, date: e })}
        />
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
        selected={String(event?.interviewers?.connect[0]?.id)}
        list={interviewers}
        onChange={(e) =>
          setEvent({
            ...event,
            interviewers: {
              connect: [
                {
                  userId_companyId: {
                    userId: e,
                    companyId: session?.user?.selectedCompany,
                  },
                },
              ],
            },
          })
        }
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
