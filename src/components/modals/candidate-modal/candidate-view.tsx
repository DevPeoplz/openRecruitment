import React, { FC, useState } from 'react'
import Avatar from '@/components/UI/Avatar'
import { CandidateType, LogType } from '.'
import OverviewTab from './overview-tab'
import EvaluationCandidate from './evaluation'
import EvaluationTab from './evaluation-tab'
import EmailTab from './email-tab'

type Props = {
  candidate: CandidateType
  logs: LogType[]
}

const tabs = [
  {
    id: 'overview',
    name: 'Overview',
  },
  {
    id: 'email',
    name: 'Email',
  },
  {
    id: 'evaluation',
    name: 'Evaluation',
  },
  {
    id: 'file',
    name: 'File',
  },
  {
    id: 'activity',
    name: 'Activity',
  },
]

const CandidateView: FC<Props> = ({ candidate, logs }) => {
  const [tabSelected, setTabSelected] = useState('overview')

  return (
    <div className="flex h-full gap-2">
      <div className="w-100 p-2">
        <div className="flex items-center justify-between gap-16">
          <div className="flex items-center gap-2">
            <Avatar name={candidate.name} />
            <div>
              <h3>{candidate.name}</h3>
              <p className="text-gray-600">Added manually by user 4 days ago</p>
            </div>
          </div>
          <div>Following</div>
        </div>
        <div className="my-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`rounded-md px-4 py-2 ${tabSelected === tab.id ? 'bg-gray-200' : ''}`}
              onClick={() => setTabSelected(tab.id)}
            >
              {tab.name}
            </button>
          ))}
        </div>
        {
          {
            overview: <OverviewTab candidate={candidate} logs={logs} />,
            email: <EmailTab />,
            evaluation: <EvaluationTab />,
            file: <p>File</p>,
            activity: <p>Activity</p>,
          }[tabSelected]
        }
      </div>

      <div className="w-[320px] bg-gray-300 p-2">
        <EvaluationCandidate />
      </div>
    </div>
  )
}

export default CandidateView
