import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_ADD_CANDIDATE_DROPDOWNS } from '@/graphql-operations/queries'
import { parseGQLData } from '@/components/utils/data-parsing'
import clsx from 'clsx'
import ComboboxWithTags from '@/components/ui/combobox-with-tags'
import { CloudArrowUpIcon, EyeSlashIcon, PencilIcon } from '@heroicons/react/24/outline'
import { Tooltip } from 'react-tooltip'
import {
  CandidateContext,
  CandidateType,
  queryToCandidate,
} from '@/components/views/candidate/candidate-view'
import { GET_CANDIDATE_BY_ID_JOBS_TALENT_POOLS } from '@/graphql-operations/queries/dashboard-candidates'

export const CandidateJobsUpdate: React.FC<{ field?: string; title?: string }> = ({
  field = 'job',
  title = 'Jobs',
}) => {
  const [btnClicked, setBtnClicked] = useState(false)
  const comboBtnRef = useRef<HTMLButtonElement>(null)
  const [candidate = { id: null, name: null, avatar: null }, refetchCandidate] =
    useContext(CandidateContext) ?? []

  const { data: dataDropdown, loading: loadingDropdown } = useQuery(GET_ADD_CANDIDATE_DROPDOWNS, {
    fetchPolicy: 'cache-and-network',
  })

  const {
    data: dataJobsTalents,
    loading: loadingJobsTalents,
    refetch: refetchJobsTalents,
  } = useQuery(GET_CANDIDATE_BY_ID_JOBS_TALENT_POOLS, {
    fetchPolicy: 'cache-and-network',
    variables: {
      where: { id: parseInt(String(candidate.id)) },
    },
  })

  const jobsTalents = useMemo(
    () => queryToJobsTalents(dataJobsTalents?.findUniqueCandidate),
    [dataJobsTalents?.findUniqueCandidate]
  )

  useEffect(() => {
    if (btnClicked) {
      comboBtnRef.current?.click()
    }
  }, [btnClicked])

  return (
    <div className={'w-full rounded bg-white'}>
      <h4 className={'border-b border-gray-200 p-1 font-bold'}>{title}:</h4>
      <div className={'w-full p-2'}>
        <button
          type="button"
          className={clsx(
            'my-2 flex items-center rounded border border-gray-400 p-1 text-sm ',
            btnClicked && 'hidden'
          )}
          onClick={() => {
            setBtnClicked(true)
          }}
        >
          <PencilIcon className={'h-5 w-5 pr-2'} />
          <p>Edit Assigned {title}</p>
        </button>
        {btnClicked && (
          <div className={'flex w-full flex-wrap'}>
            <ComboboxWithTags
              options={parseGQLData(dataDropdown[`${field}s`])}
              comboBtnRef={comboBtnRef}
              initialSelection={(jobsTalents
                ? jobsTalents[`${field}s` as 'jobs' | 'talentPools']
                : [] ?? []
              ).map((job) => ({
                value: job[`${field}Id`],
                label: job[`${field}Name`],
              }))}
              onSelectedOptionsChange={undefined}
              placeholder={`Select ${title}`}
              width={'w-full'}
              hideOnFullySelected={false}
            />
            <div className="flex w-full justify-end gap-1">
              <button
                type="button"
                className={'mt-2 rounded border border-gray-400 p-1'}
                onClick={() => {
                  setBtnClicked(false)
                }}
              >
                <EyeSlashIcon className={'h-3 w-3'} />
              </button>
              <button
                type="button"
                className={'mt-2 rounded border border-primary-500 bg-primary-100 p-1'}
                onClick={() => {
                  setBtnClicked(false)
                }}
                data-tooltip-id={`${field}-save`}
                data-tooltip-content={'Save'}
                data-tooltip-place={'bottom'}
              >
                <Tooltip id={`${field}-save`} />
                <CloudArrowUpIcon className={'h-3 w-3'} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export const queryToJobsTalents = (data: any) => {
  if (!data) return null

  return {
    id: data.id,
    jobs: [
      ...(data.candidateJobs ?? []).map((jobRow: any) => {
        return {
          matchId: jobRow.id,
          jobId: jobRow.job.id,
          jobName: jobRow.job.name,
          jobTemplateId: jobRow.job?.pipelineTemplate,
          jobStages: jobRow.job?.pipelineTemplate?.stages,
          currentStage: jobRow.currentStage,
        }
      }),
    ],
    talentPools: [
      ...(data.talentPools ?? []).map((talentPoolRow: any) => {
        return {
          matchId: talentPoolRow.id,
          talentPoolId: talentPoolRow.talentPool?.id,
          talentPoolName: talentPoolRow.talentPool?.name,
        }
      }),
    ],
  }
}
