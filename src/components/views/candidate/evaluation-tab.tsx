import { EllipsisHorizontalIcon, PlusIcon } from '@heroicons/react/24/outline'
import React from 'react'

const EVALUATION = [
  {
    id: 1,
    name: 'Evaluation 1',
    date: '2021-08-01',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
    status: 'completed',
  },
  {
    id: 2,
    name: 'Evaluation 2',
    date: '2021-08-01',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
    status: 'completed',
  },
]

const EvaluationTab = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <div className="h-10 border border-r-0 border-gray-400 p-2">
          <span className="flex gap-1">
            <p>Completed</p>
            <p>{EVALUATION.filter((eva) => eva.status === 'completed').length}</p>
          </span>
        </div>
        <div className="h-10 border border-r-0 border-gray-400 p-2">Summary</div>
        <div className="h-10 border border-gray-400 p-2">
          <EllipsisHorizontalIcon className="h-5 w-5" />
        </div>
      </div>
      <button className="h-10 rounded-md bg-primary-400 px-2 text-white">
        <span className="flex items-center gap-1">
          <PlusIcon className="h-5 w-5 font-bold" />
          <p>Evaluation</p>
        </span>
      </button>
    </div>
  )
}

export default EvaluationTab
