import React, { useContext } from 'react'
import { GET_CANDIDATE_BY_ID_QUICK_EVALUATIONS } from '@/graphql-operations/queries/dashboard-candidates'
import { CandidateContext } from '@/components/views/candidate/candidate-view'
import { useQuery } from '@apollo/client'
import { AddQuickEvaluation } from '@/components/views/candidate/evaluation'
import parse from 'html-react-parser'
import Avatar from '@/components/ui/avatar'
import { Tooltip } from 'react-tooltip'
import {
  EllipsisHorizontalCircleIcon,
  HandThumbDownIcon,
  HandThumbUpIcon,
} from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { DeleteRecord } from '@/components/views/delete-record'

const EvaluationTab = () => {
  const [candidate, refetchCandidate] = useContext(CandidateContext) ?? []
  const { data: dataCandidateEvaluations } = useQuery(GET_CANDIDATE_BY_ID_QUICK_EVALUATIONS, {
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        id: parseInt(String(candidate?.id)),
      },
    },
  })

  return (
    <div>
      <div className={'mb-5 space-y-3'}>
        {dataCandidateEvaluations?.candidateQuickEvaluations?.evaluations?.map(
          (evaluation: any) => {
            let icon = null

            const iconClass = 'h-9 w-9 rounded-md '

            if (evaluation.score === 'REJECTED') {
              icon = <HandThumbDownIcon className={clsx(iconClass, 'fill-red-500')} />
            } else if (evaluation.score === 'NEUTRAL') {
              icon = <EllipsisHorizontalCircleIcon className={clsx(iconClass, 'fill-white')} />
            } else if (evaluation.score === 'APPROVED') {
              icon = <HandThumbUpIcon className={clsx(iconClass, ' fill-success')} />
            }

            return (
              <div
                key={evaluation.id}
                className={'group relative min-h-[60px] rounded-xl border border-gray-200 p-1'}
              >
                <div className="flex h-full w-full flex-wrap items-center">
                  <div className="flex min-h-[60px] w-2/12 items-center justify-center">{icon}</div>
                  <div className="w-10/12 pr-7">
                    <div>{parse(evaluation.description)}</div>
                  </div>
                </div>
                <div className="absolute bottom-0 right-0 items-center justify-end p-1">
                  <div
                    data-tooltip-id={`eval-avatar-${evaluation.id}`}
                    data-tooltip-content={evaluation.teamMember?.user?.name}
                    data-tooltip-place="left"
                  >
                    <Avatar className={'h-7 w-7'} name={evaluation.teamMember?.user?.name}></Avatar>
                    <Tooltip id={`eval-avatar-${evaluation.id}`} />
                  </div>
                </div>
                <div className="absolute right-0 top-0 hidden items-center justify-end p-1 group-hover:flex">
                  <DeleteRecord id={evaluation.id} type={'evaluation'} />
                </div>
              </div>
            )
          }
        )}
      </div>
      <div className="mb-5 rounded border border-gray-200 p-2">
        <AddQuickEvaluation />
      </div>
    </div>
  )
}

export default EvaluationTab
