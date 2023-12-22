import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import ViewCandidateModal, { LogType } from '../../../modals/view-candidate-modal'
import { useMutation } from '@apollo/client'
import { UPDATE_CANDIDATE_MUTATION } from '@/graphql-operations/mutations/signup-candidate'
import { JobContext, JobType } from '@/components/views/jobs/job-view'
import { useLocalStorageState } from '@/hooks/localStorage'
import { isEqual } from 'lodash'
import Avatar from '@/components/ui/avatar'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import clsx from 'clsx'
import Alert from '@/components/alert'

type Props = {
  logs?: LogType[]
}

type CandidateModalContextType = {
  isOpen?: boolean
  setIsOpen?: (value: boolean) => void
  candidateId?: number
  setCandidateId?: (value: number) => void
}

const CandidateModalContext = React.createContext<CandidateModalContextType>({})
const ControlStageDNDContext = React.createContext<{
  addMatchToStage: (match: JobType['matches'][0], stageId: number, beforeMatchId?: number) => void
}>({
  addMatchToStage: () => null,
})

const OverviewTab: React.FC<Props> = ({ logs }) => {
  const [job, refetchJob] = useContext(JobContext) ?? []
  const prevJobValueRef = useRef<JobType | null>()

  const [candidateOrder, setCandidateOrder] = useLocalStorageState<Record<string, string[]>>(
    'job-view',
    'candidate-order-by-stage',
    {}
  )

  const getCandidateOrderFromLocal = useCallback(
    (candidateId: string, stageId: string) => {
      const key = `${stageId}`
      return candidateOrder[key]?.indexOf(candidateId) ?? null
    },
    [candidateOrder]
  )

  const setCandidateOrderFromLocal = useCallback(
    (matches: number[], stageId: string) => {
      setCandidateOrder({ ...candidateOrder, [stageId]: matches.map(String) })
    },
    [candidateOrder, setCandidateOrder]
  )

  const generateStagesWithCandidates = useCallback(
    (job: JobType | null | undefined) => {
      if (!job) return []

      const stages = [...job.pipelineTemplate.stages].sort((a, b) => a.position - b.position)
      const matches = job.matches

      return stages.map((stage) => {
        const candidatesInStage = matches.filter((match) => {
          return (stage.id === stages[0].id && !match.stage) || match.stage?.id === stage.id
        })

        candidatesInStage.sort((a, b) => {
          const aOrder = getCandidateOrderFromLocal(String(a.id), String(stage.id)) + 1
          const bOrder = getCandidateOrderFromLocal(String(b.id), String(stage.id)) + 1

          if (aOrder && bOrder) {
            return aOrder - bOrder
          }

          if (aOrder) {
            return -1
          }

          if (bOrder) {
            return 1
          }

          return 0
        })

        return {
          ...stage,
          matches: candidatesInStage,
        }
      })
    },
    [getCandidateOrderFromLocal]
  )

  const [stagesWithCandidates, setStagesWithCandidates] = useState(() => {
    return generateStagesWithCandidates(job)
  })

  useEffect(() => {
    if (isEqual(prevJobValueRef.current, job)) {
      setStagesWithCandidates(generateStagesWithCandidates(job))
      prevJobValueRef.current = job
    }
  }, [generateStagesWithCandidates, job]) // The dependency array ensures the effect runs when contextValue changes

  const addMatchToStage = (
    match: JobType['matches'][0],
    stageId: number,
    beforeMatchId?: number
  ) => {
    const prevStageId = match.stage?.id ?? stagesWithCandidates[0].id

    if (isNaN(match.candidate.id) || isNaN(match.id) || isNaN(stageId)) {
      return null
    }

    setStagesWithCandidates((prev) => {
      const prevStageIndex = prev.findIndex((stage) => stage.id === prevStageId)
      const stageIndex = prev.findIndex((stage) => stage.id === stageId)
      const newStages = [...prev]
      const newMatch = {
        ...match,
        stage: {
          id: stageId,
          category: prev[stageIndex].category,
          position: prev[stageIndex].position,
        },
      }

      if (prevStageIndex >= 0) {
        newStages[prevStageIndex].matches = stagesWithCandidates[prevStageIndex].matches.filter(
          (m) => m.id !== match.id
        )
      }

      if (stageIndex >= 0) {
        if (beforeMatchId && !isNaN(beforeMatchId)) {
          const beforeMatchIndex = prev[stageIndex].matches.findIndex((m) => m.id === beforeMatchId)
          newStages[stageIndex].matches.splice(beforeMatchIndex, 0, newMatch)
        } else {
          newStages[stageIndex].matches.push(newMatch)
        }

        setCandidateOrderFromLocal(
          newStages[stageIndex].matches.map((m) => m.id),
          String(stageId)
        )
      }

      return newStages
    })

    if (prevStageId !== stageId) {
      updateCandidate({
        variables: {
          where: {
            id: parseInt(String(match.candidate.id)),
          },
          data: {
            offers: {
              update: [
                {
                  where: {
                    id: parseInt(String(match.id)),
                    offer: { id: { equals: parseInt(String(job?.id)) } },
                  },
                  data: {
                    stage: {
                      connect: {
                        id: parseInt(String(stageId)),
                      },
                    },
                  },
                },
              ],
            },
          },
        },
      }).then(() => Alert({ message: 'Candidate moved!', type: 'success' }))
    }
  }

  const [updateCandidate, { data: dataCandidateUpdated, error: errorCandidateUpdated }] =
    useMutation(UPDATE_CANDIDATE_MUTATION)

  const [isOpen, setIsOpen] = useState(false)
  const [candidateId, setCandidateId] = useState<number | undefined>(undefined)

  if (!job) return null

  return (
    <CandidateModalContext.Provider
      value={{
        isOpen,
        setIsOpen,
        candidateId,
        setCandidateId,
      }}
    >
      <div className="flex min-h-[65vh] flex-1 grow gap-2 pb-5">
        <ControlStageDNDContext.Provider value={{ addMatchToStage }}>
          <DndProvider backend={HTML5Backend}>
            {stagesWithCandidates.map((stage) => (
              <DraggableStage stage={stage} key={stage.id} />
            ))}
          </DndProvider>
        </ControlStageDNDContext.Provider>
        <ViewCandidateModal
          {...{
            isOpen,
            setIsOpen,
            candidateId,
          }}
        />
      </div>
    </CandidateModalContext.Provider>
  )
}

export default OverviewTab

const DraggableStage = ({
  stage,
}: {
  stage: JobType['pipelineTemplate']['stages'][0] & {
    matches: JobType['matches']
  }
}) => {
  const { addMatchToStage } = useContext(ControlStageDNDContext)

  const [{ onHover }, dropRef] = useDrop({
    accept: 'match',
    drop: (draggedMatch: JobType['matches'][0], monitor) => {
      if (monitor.didDrop()) {
        return
      }
      if (!isNaN(draggedMatch.candidate.id) && !isNaN(draggedMatch.id) && !isNaN(stage.id)) {
        addMatchToStage(draggedMatch, stage.id)
      }
    },
    collect: (monitor) => ({
      onHover: monitor.isOver({ shallow: true }),
    }),
  })

  return (
    <div className="flex-1">
      <div className="mb-1 w-full select-none p-1 text-center">
        <h4 className="font-bold">{stage.category}</h4>
      </div>
      <div
        ref={dropRef}
        className={clsx(
          'h-full w-full space-y-2 rounded-md border border-gray-200 p-2 transition-all hover:border-primary-400 hover:shadow-md',
          onHover && 'border-yellow-400 shadow-md'
        )}
      >
        {stage.matches.map((match) => (
          <DraggableMatch key={match.id} match={match} stageId={stage.id} />
        ))}
      </div>
    </div>
  )
}

const DraggableMatch = ({ match, stageId }: { match: JobType['matches'][0]; stageId: number }) => {
  const { setIsOpen, setCandidateId } = useContext(CandidateModalContext)
  const { addMatchToStage } = useContext(ControlStageDNDContext)

  const [{ onHover }, dropRef] = useDrop({
    accept: 'match',
    drop: (draggedMatch: JobType['matches'][0]) => {
      if (!isNaN(draggedMatch.candidate.id) && !isNaN(draggedMatch.id) && !isNaN(stageId)) {
        addMatchToStage(draggedMatch, stageId, match.id)
      }
    },
    collect: (monitor) => ({
      onHover: monitor.isOver({ shallow: true }),
    }),
  })

  const [{ isDragging }, dragRef, previewRef] = useDrag(
    {
      collect: (monitor: { isDragging: () => any }) => ({
        isDragging: monitor.isDragging(),
      }),
      item: () => match,
      type: 'match',
    },
    [match]
  )

  return (
    <div
      ref={(node) => previewRef(dropRef(node))}
      className={clsx(
        'w-full cursor-pointer rounded-md border p-1 shadow-md',
        onHover && 'border-t border-t-yellow-400'
      )}
      onClick={() => {
        setCandidateId && setCandidateId(match.candidate.id)
        setIsOpen && setIsOpen(true)
      }}
    >
      <div className="grid grid-cols-12 gap-1" ref={dragRef}>
        <div className="col-span-4 flex items-center justify-center">
          <Avatar
            className="h-7 w-7 bg-primary-400 !object-contain"
            src={match.candidate.avatar?.path}
            name={`${match.candidate.firstName} ${match.candidate.lastName.charAt(0)}.`}
          />
        </div>
        <div className="col-span-7 flex flex-col ">
          <p
            className="truncate text-sm font-bold capitalize"
            title={`${match.candidate.firstName} ${match.candidate.lastName}`}
          >
            {`${match.candidate.firstName.split(' ')[0]} ${match.candidate.lastName.split(' ')[0]}`}
          </p>
          <p className="text-xs italic text-gray-400">
            {`${
              match.candidate.averageScore ? Number(match.candidate.averageScore).toFixed(2) : '--'
            }%`}
          </p>
        </div>
      </div>
    </div>
  )
}
