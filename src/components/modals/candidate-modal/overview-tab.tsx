import React, { FC } from 'react'
import { CandidateType, LogType } from '.'
import { PhoneIcon, XMarkIcon, EnvelopeIcon } from '@heroicons/react/24/outline'
import { PlusIcon } from '@heroicons/react/20/solid'
import { log } from 'console'
import Avatar from '@/components/UI/Avatar'
import { subDays } from 'date-fns'

type Props = {
  candidate: CandidateType
  logs: LogType[]
}

const overviewTab: FC<Props> = ({ candidate, logs }) => {
  const currentDate = new Date()
  return (
    <div className="flex flex-col gap-4 ">
      <div className="flex items-center gap-2">
        <span className="flex flex-wrap gap-2">
          <p>Tag:</p>
          {candidate.tagSource.tag.map((tag) => (
            <span key={tag.id} className="flex items-center gap-1 rounded-sm border px-2">
              <p>{tag.name}</p>
              <XMarkIcon className="h-4 w-4" />
            </span>
          ))}
        </span>
        <button className="rounded-sm border">
          <PlusIcon className="h-5 w-5" />
        </button>
      </div>
      <table className="min-w-full divide-y divide-gray-200 border">
        <thead className="bg-gray-300">
          <tr>
            <th
              scope="col"
              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
            >
              Information
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          <tr className="flex items-center gap-2 py-3.5 pl-4 pr-3">
            <EnvelopeIcon className="h-5 w-5" />
            <p>Email</p>
            <p>{candidate.email}</p>
          </tr>
          <tr className="flex items-center gap-2 py-3.5 pl-4 pr-3">
            <PhoneIcon className="h-5 w-5" />
            <p>Phone</p>
            <p>{candidate.phone}</p>
          </tr>
        </tbody>
      </table>
      <div className="flex items-center gap-2">
        <span className="flex flex-wrap gap-2">
          <p>Source:</p>
          {candidate.tagSource.source.map((source) => (
            <span key={source.id} className="flex items-center gap-1 rounded-sm border px-2">
              <p>{source.name}</p>
              <XMarkIcon className="h-4 w-4" />
            </span>
          ))}
        </span>
        <button className="rounded-sm border">
          <PlusIcon className="h-5 w-5" />
        </button>
      </div>
      <table className="min-w-full divide-y divide-gray-200 border">
        <thead className="bg-gray-300">
          <tr>
            <th
              scope="col"
              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
            >
              Recent Activity
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {logs.map((log, index) => (
            <tr key={index} className="flex items-center justify-between gap-2 py-3.5 pl-4 pr-3">
              <span className="flex items-center gap-1">
                <Avatar name={log.author.name} />
                <p>{log.author.name}</p>
                <p>{log.description}</p>
              </span>

              <p>4d ago</p>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center justify-between border px-1 py-4">
        <p>Cover letter</p>
        <button className="rounded-sm border p-2">Add cover letter</button>
      </div>
    </div>
  )
}

export default overviewTab
