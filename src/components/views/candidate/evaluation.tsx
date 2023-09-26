import {
  CalendarDaysIcon,
  HandThumbUpIcon,
  PaperAirplaneIcon,
  ShareIcon,
} from '@heroicons/react/24/outline'
import React from 'react'

const EvaluationCandidate = () => {
  return (
    <div className="p-4">
      <div className="flex justify-between">
        <span className="flex items-center gap-1">
          <HandThumbUpIcon className="h-5 w-5" />
          <p>Evaluation</p>
        </span>
        <span className="flex items-center gap-2">
          <PaperAirplaneIcon className="h-5 w-5 cursor-pointer" />
          <CalendarDaysIcon className="h-5 w-5 cursor-pointer" />
          <ShareIcon className="h-5 w-5 cursor-pointer" />
        </span>
      </div>
      <hr className="my-2" />
    </div>
  )
}

export default EvaluationCandidate
