import React, { useContext } from 'react'
import { LogType } from '../../../modals/view-candidate-modal'
import { EnvelopeIcon, PhoneIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { PlusIcon } from '@heroicons/react/20/solid'
import Avatar from '@/components/ui/avatar'
import { CandidateContext } from '@/components/views/candidate/candidate-view'
import PDFViewer from '@/components/pdf-viewer'

type Props = {
  logs?: LogType[]
}

const OverviewTab: React.FC<Props> = ({ logs }) => {
  const candidate = useContext(CandidateContext)

  if (!candidate || !logs) return null

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
            <td>
              <EnvelopeIcon className="h-5 w-5" />
              <p>Email</p>
              <p>{candidate.email}</p>
            </td>
          </tr>
          <tr className="flex items-center gap-2 py-3.5 pl-4 pr-3">
            <td>
              <PhoneIcon className="h-5 w-5" />
              <p>Phone</p>
              <p>{candidate.phone}</p>
            </td>
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
              <td>
                <span className="flex items-center gap-1">
                  <Avatar name={log.author.name} />
                  <p>{log.author.name}</p>
                  <p>{log.description}</p>
                </span>
                <p>4d ago</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="section">
        <h3 className="heading">Curriculum</h3>
        <div className="body">
          <PDFViewer file={candidate.cv}>
            <PDFViewer.ToolbarItem>
              <span>Edit</span>
            </PDFViewer.ToolbarItem>
          </PDFViewer>
          <button className="mt-2 rounded-md border bg-primary-500 p-2 text-white">
            Add cover letter
          </button>
        </div>
      </div>
    </div>
  )
}

export default OverviewTab
