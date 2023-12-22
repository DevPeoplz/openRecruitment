import {
  ChevronDownIcon,
  EllipsisHorizontalCircleIcon,
  HandThumbDownIcon,
  HandThumbUpIcon,
  PaperAirplaneIcon,
  PlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import React, { useCallback, useContext, useState } from 'react'
import { Editor, EditorProvider } from 'react-simple-wysiwyg'
import { Tooltip } from 'react-tooltip'
import clsx from 'clsx'
import Loader from '@/components/ui/loader'
import { useMutation } from '@apollo/client'
import { UPDATE_CANDIDATE_BY_ID_QUICK_EVALUATION } from '@/graphql-operations/mutations/signup-candidate'
import { useSession } from 'next-auth/react'
import Alert from '@/components/alert'
import { CandidateContext } from '@/components/views/candidate/candidate-view'

type QuickNoteType = {
  description?: string
  score?: 'APPROVED' | 'NEUTRAL' | 'REJECTED'
}

export const AddQuickEvaluation = () => {
  const { data: session } = useSession()
  const [candidate = { id: null, name: null, avatar: null }, refetchCandidate] =
    useContext(CandidateContext) ?? []
  const [btnClicked, setBtnClicked] = useState(false)
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [quickEvaluation, setQuickEvaluation] = useState<QuickNoteType>({
    description: 'Add a <b>Quick</b> <i>Evaluation...</i>',
    score: 'NEUTRAL',
  })

  const handleBtnClick = () => {
    setEditing(!editing)
  }

  const handleWYSIWYGOnChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    setQuickEvaluation((prev) => ({ ...prev, description: e.target.value as string }))
  }

  const handleScoreChange = (score: QuickNoteType['score']) => () => {
    setQuickEvaluation((prev) => ({ ...prev, score }))
  }

  const [updateCandidateQuickEvaluations] = useMutation(UPDATE_CANDIDATE_BY_ID_QUICK_EVALUATION)

  const handleSave = useCallback(() => {
    setSaving(true)

    updateCandidateQuickEvaluations({
      variables: {
        data: {
          evaluations: {
            create: [
              {
                description: quickEvaluation.description,
                isQuickEval: true,
                score: quickEvaluation.score,
                teamMember: {
                  connect: {
                    user: {
                      email: { equals: session?.user?.email as string },
                    },
                  },
                },
              },
            ],
          },
        },
        where: {
          id: parseInt(String(candidate.id)),
        },
      },
    })
      .then((res) => {
        if (res.data?.candidateQuickEvaluation?.id) {
          setQuickEvaluation({ description: '', score: 'NEUTRAL' })
          setEditing(false)
          Alert({ message: 'Quick Evaluation Saved!', type: 'success' }).then()
        }
      })
      .catch((e) => {
        console.log(e)
        Alert({ message: 'Something went wrong!', type: 'error' }).then()
      })
      .finally(() => {
        setBtnClicked(false)
        setSaving(false)
      })
  }, [
    candidate.id,
    quickEvaluation.description,
    quickEvaluation.score,
    session?.user?.email,
    updateCandidateQuickEvaluations,
  ])

  return (
    <div className="w-full px-1 py-2">
      <div className="flex justify-between">
        <span className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => {
              setBtnClicked(true)
              setEditing(true)
            }}
          >
            <HandThumbUpIcon
              className={clsx(
                editing && {
                  'fill-red-500': quickEvaluation.score === 'REJECTED',
                  'fill-white': quickEvaluation.score === 'NEUTRAL',
                  'fill-success': quickEvaluation.score === 'APPROVED',
                },
                'h-5 w-5',
                !editing && 'hover:fill-white'
              )}
            />
          </button>
          {btnClicked && (
            <div
              className={
                'absolute -ml-20 -mt-10 flex h-10 w-32 flex-wrap items-center justify-center gap-1 rounded-xl bg-gray-600'
              }
            >
              <HandThumbDownIcon
                className={clsx(
                  quickEvaluation.score === 'REJECTED' && 'bg-white',
                  'h-7 w-7 cursor-pointer rounded-md fill-red-500'
                )}
                onClick={handleScoreChange('REJECTED')}
              />
              <EllipsisHorizontalCircleIcon
                className={clsx(
                  quickEvaluation.score === 'NEUTRAL' && 'bg-white',
                  'h-7 w-7 cursor-pointer rounded-md fill-white'
                )}
                onClick={handleScoreChange('NEUTRAL')}
              />
              <HandThumbUpIcon
                className={clsx(
                  quickEvaluation.score === 'APPROVED' && 'bg-white',
                  'h-7 w-7 cursor-pointer rounded-md fill-success'
                )}
                onClick={handleScoreChange('APPROVED')}
              />
              <ChevronDownIcon
                className={clsx('mt-3 h-5 w-5 cursor-pointer fill-white')}
                onClick={() => {
                  setBtnClicked((prev) => !prev)
                }}
              />
            </div>
          )}
          <p className={'font-semibold'}>Quick Evaluation</p>
        </span>
        <span className="flex items-center gap-2">
          {editing && (
            <>
              <button
                type="button"
                data-tooltip-id="add-quick-eval"
                data-tooltip-content={'Save'}
                onClick={handleSave}
              >
                {saving ? (
                  <Loader size={'w-4 h-4'} fullScreen={false} />
                ) : (
                  <PaperAirplaneIcon className="h-5 w-5 cursor-pointer hover:fill-primary-300" />
                )}
                <Tooltip id="add-quick-eval" />
              </button>
              <button
                type="button"
                className="rounded border border-gray-500 hover:bg-red-500 hover:text-white"
                onClick={handleBtnClick}
              >
                <XMarkIcon className="h-5 w-5 cursor-pointer" />
              </button>
            </>
          )}
          {!editing && (
            <button
              type="button"
              className="rounded border border-gray-500 hover:bg-primary-200 hover:text-white"
              onClick={handleBtnClick}
            >
              <PlusIcon className="h-5 w-5 cursor-pointer" />
            </button>
          )}
        </span>
      </div>
      <hr className="my-2" />
      {editing && (
        <div className={'rounded-lg bg-white'}>
          <EditorProvider>
            <Editor value={quickEvaluation.description} onChange={handleWYSIWYGOnChange} />
          </EditorProvider>
        </div>
      )}
    </div>
  )
}
