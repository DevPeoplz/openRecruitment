import React, { useContext, useEffect, useMemo, useState } from 'react'
import { useApolloClient, useMutation, useQuery } from '@apollo/client'
import { GET_ADD_CANDIDATE_DROPDOWNS } from '@/graphql-operations/queries'
import clsx from 'clsx'
import {
  BriefcaseIcon,
  CloudArrowUpIcon,
  PencilIcon,
  PlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { Tooltip } from 'react-tooltip'
import { CandidateContext } from '@/components/views/candidate/candidate-view'
import { GET_CANDIDATE_BY_ID_JOBS_TALENT_POOLS } from '@/graphql-operations/queries/dashboard-candidates'
import { ArrowUturnLeftIcon } from '@heroicons/react/20/solid'
import { FaForwardStep } from 'react-icons/fa6'
import { Select } from '@/components/ui/select'
import { SparklesIcon } from '@heroicons/react/24/solid'
import Swal from 'sweetalert2'
import Alert from '@/components/alert'
import { UPDATE_CANDIDATE_BY_ID_JOBS_TALENT_POOLS } from '@/graphql-operations/mutations/signup-candidate'
import Loader from '@/components/ui/loader'

export const CandidateJobsUpdate: React.FC<{ field?: 'job' | 'talentPool' }> = ({
  field = 'job',
}) => {
  const [fieldState, setFieldState] = useState<
    Record<
      string,
      {
        btnClicked?: boolean
        saving?: boolean
        value?: string
      }
    >
  >({})
  const [candidate = { id: null, name: null, avatar: null }, refetchCandidate] =
    useContext(CandidateContext) ?? []
  const client = useApolloClient()

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

  const [updateJobTalents] = useMutation(UPDATE_CANDIDATE_BY_ID_JOBS_TALENT_POOLS)

  const candidateJobsTalents = useMemo(
    () => queryToJobsTalents(dataJobsTalents?.findUniqueCandidate),
    [dataJobsTalents?.findUniqueCandidate]
  )

  useEffect(() => {
    if (candidateJobsTalents && field === 'job') {
      setFieldState((prevState) => ({
        ...prevState,
        ...candidateJobsTalents.jobs.reduce(
          (
            acc: Record<
              string,
              {
                btnClicked?: boolean
                value?: string
              }
            >,
            job
          ) => {
            acc[`${field}-${job?.id}`] = {
              value: job?.currentStage?.id,
            }
            return acc
          },
          {}
        ),
      }))
    }
  }, [candidateJobsTalents, field])

  const updateFieldStateBoolean = (
    key: string,
    state: 'btnClicked' | 'saving' | 'value',
    value?: any
  ) => {
    setFieldState((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [state]: typeof value === 'undefined' ? !prev[key]?.[state] : value,
      },
    }))
  }

  const handleButtonClick = (key: string) => () => {
    updateFieldStateBoolean(key, 'btnClicked')
  }

  const handleSelectChange = (key: string) => (value: string) => {
    updateFieldStateBoolean(key, 'value', value)
  }

  const handleRemove =
    (key: string, matchId: string, offerId: string, stageId: string | undefined) => () => {
      Swal.fire({
        title: `Do you want to REMOVE this candidate from the selected ${
          field === 'job' ? 'Job' : 'Talent Pool'
        }?`,
        showDenyButton: true,
        confirmButtonText: 'Remove',
        denyButtonText: `Cancel`,
        confirmButtonColor: 'rgb(239 68 68)',
        denyButtonColor: 'rgb(229 231 235)',
      }).then((result) => {
        if (result.isConfirmed) {
          handleUpdate('delete', key, matchId, offerId, stageId)()
        }
      })
    }

  const handleUpdate =
    (
      action: 'updateStage' | 'connect' | 'delete',
      key: string | undefined,
      matchId: string | undefined,
      offerId: string | undefined,
      stageId: string | undefined
    ) =>
    () => {
      if (key) {
        updateFieldStateBoolean(key, 'saving', true)
      }
      let data = null
      if (action === 'updateStage' && matchId && offerId && stageId) {
        data = {
          offers: {
            update: [
              {
                where: {
                  id: parseInt(String(matchId)),
                  offer: {
                    id: {
                      equals: parseInt(String(offerId)),
                    },
                  },
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
        }
      }
      if (action === 'connect' && offerId) {
        let defaultStage = null

        if (field === 'job') {
          defaultStage =
            dataDropdown?.jobs.find((job: { id: any }) => {
              return job.id === String(offerId)
            })?.firstStage?.stages[0]?.id ?? null
        }

        data = {
          [field === 'job' ? 'offers' : 'talentPools']: {
            create: [
              {
                [field === 'job' ? 'offer' : 'talentPool']: {
                  connect: {
                    id: parseInt(String(offerId)),
                  },
                },
                ...(field === 'job' && defaultStage
                  ? {
                      stage: {
                        connect: {
                          id: parseInt(String(defaultStage)),
                        },
                      },
                    }
                  : {}),
              },
            ],
          },
        }
      }

      if (action === 'delete' && matchId) {
        data = {
          [field === 'job' ? 'offers' : 'talentPools']: {
            delete: [
              {
                id: parseInt(String(matchId)),
              },
            ],
          },
        }
      }

      if (!data) {
        if (key) {
          updateFieldStateBoolean(key, 'saving', false)
        }
        return
      }

      return updateJobTalents({
        variables: {
          where: {
            id: parseInt(String(candidate.id)),
          },
          data: data,
        },
      }).then(() => {
        if (key) {
          updateFieldStateBoolean(key, 'saving', false)
        }
        client
          .refetchQueries({
            include: ['GET_HUB_JOBS', 'GET_HUB_POOLS'],
          })
          .then(() => {
            Alert({ message: 'Updated successfully!', type: 'success' }).then()
          })
      })
    }

  const mainObject = useMemo(
    () => (field === 'job' ? candidateJobsTalents?.jobs : candidateJobsTalents?.talentPools),
    [candidateJobsTalents?.jobs, candidateJobsTalents?.talentPools, field]
  )

  return (
    <div className={'w-full rounded bg-white'}>
      <h4 className={'border-b border-gray-200 p-1 font-bold'}>
        {field === 'job' ? 'Jobs' : 'Talent Pools'}:
      </h4>
      <div className={'w-full p-2'}>
        <div className="flex flex-col gap-2">
          {mainObject?.map((job) => {
            if (!job) return null

            return (
              <div
                key={`${field}-${job.id}`}
                className={
                  'flex w-full items-center justify-between rounded-lg border border-gray-200 p-2 text-sm'
                }
              >
                {
                  <div>
                    <div className={'flex items-center font-bold'}>
                      {field === 'job' ? (
                        <BriefcaseIcon className={'mr-1 h-3 w-3'} />
                      ) : (
                        <SparklesIcon className={'mr-1 h-3 w-3'} />
                      )}
                      {job.name}
                    </div>
                    {field === 'job' &&
                      (!fieldState[`${field}-${job.id}`]?.btnClicked ? (
                        <div className={'ml-8 flex items-center'}>
                          <FaForwardStep className={'mr-1 h-3 w-3'} />
                          {(job as JobTalentsDataType['job'])?.currentStage?.category}
                        </div>
                      ) : (
                        <div className={'flex items-center'}>
                          <Select
                            selected={fieldState[`${field}-${job.id}`]?.value ?? ''}
                            list={[
                              {
                                value: '',
                                label: `Select a stage...`,
                                placeholder: true,
                              },
                              ...((job as JobTalentsDataType['job'])?.jobStages?.map(
                                (stage: { id: any; category: any }) => {
                                  return {
                                    key: stage.id,
                                    value: stage.id,
                                    label: stage.category,
                                  }
                                }
                              ) ?? []),
                            ]}
                            defaultSize={'max-w-full w-40'}
                            onChange={handleSelectChange(`${field}-${job.id}`)}
                          />
                        </div>
                      ))}
                  </div>
                }
                <div className="flex flex-wrap items-center gap-2">
                  {!fieldState[`${field}-${job.id}`]?.btnClicked ? (
                    <button
                      type="button"
                      className={clsx('rounded border border-gray-400 p-0.5 hover:shadow-inner')}
                      onClick={handleButtonClick(`${field}-${job.id}`)}
                    >
                      <PencilIcon className={'h-4 w-4'} />
                    </button>
                  ) : (
                    <>
                      <button
                        type="button"
                        className={
                          'rounded border border-gray-400 bg-red-500 p-0.5 hover:shadow-inner'
                        }
                        onClick={handleRemove(
                          `${field}-${job.id}`,
                          job.matchId,
                          job.id,
                          fieldState[`${field}-${job.id}`]?.value
                        )}
                        data-tooltip-id={`${field}-remove`}
                        data-tooltip-content={'Remove'}
                      >
                        <XMarkIcon className={'h-4 w-4 text-white'} />
                        <Tooltip id={`${field}-remove`} />
                      </button>
                      {field === 'job' && (
                        <button
                          type="button"
                          className={
                            ' rounded border border-gray-400 bg-primary-200 p-0.5 hover:shadow-inner'
                          }
                          onClick={handleUpdate(
                            'updateStage',
                            `${field}-${job.id}`,
                            job.matchId,
                            job.id,
                            fieldState[`${field}-${job.id}`]?.value
                          )}
                          data-tooltip-id={`${field}-save`}
                          data-tooltip-content={'Save'}
                        >
                          {fieldState[`${field}-${job.id}`]?.saving ? (
                            <Loader size={'h-4 w-4'} fullScreen={false} />
                          ) : (
                            <CloudArrowUpIcon className={'h-4 w-4'} />
                          )}
                          <Tooltip id={`${field}-save`} />
                        </button>
                      )}
                      <button
                        type="button"
                        className={' rounded border border-gray-400 p-0.5 hover:shadow-inner'}
                        onClick={() => {
                          handleButtonClick(`${field}-${job.id}`)()
                          if (field === 'job') {
                            handleSelectChange(`${field}-${job.id}`)(
                              (job as JobTalentsDataType['job'])?.currentStage?.id ?? ''
                            )
                          }
                        }}
                        data-tooltip-id={`${field}-back`}
                        data-tooltip-content={'Cancel Edit'}
                      >
                        <ArrowUturnLeftIcon className={'h-4 w-4 text-red-500'} />
                        <Tooltip id={`${field}-back`} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            )
          })}
          <div
            className={
              'flex w-full items-center justify-center rounded-lg border border-gray-200 p-2 text-sm'
            }
          >
            <div className="flex flex-wrap items-center gap-2">
              {!fieldState[`${field}-add-new`]?.btnClicked ? (
                <button
                  type="button"
                  className={clsx('rounded border border-gray-400 p-0.5 hover:shadow-inner')}
                  onClick={handleButtonClick(`${field}-add-new`)}
                >
                  <PlusIcon className={'h-4 w-4'} />
                </button>
              ) : (
                <>
                  <div className={'flex items-center'}>
                    <Select
                      selected={fieldState[`${field}-add-new`]?.value ?? ''}
                      list={[
                        {
                          value: '',
                          label: `Select a ${field === 'job' ? 'Job' : 'Talent Pool'}...`,
                          placeholder: true,
                        },
                        ...(dataDropdown[field === 'job' ? 'jobs' : 'talentPools']
                          ?.map((job: { id: any; name: any }) => {
                            return {
                              key: job.id,
                              value: job.id,
                              label: job.name,
                            }
                          })
                          .filter((item: { value: string | undefined }) => {
                            return mainObject?.find((e) => e?.id === item.value) === undefined
                          }) ?? []),
                      ]}
                      defaultSize={'max-w-full w-40'}
                      onChange={handleSelectChange(`${field}-add-new`)}
                    />
                  </div>
                  <button
                    type="button"
                    className={
                      ' rounded border border-gray-400 bg-primary-200 p-0.5 hover:shadow-inner'
                    }
                    onClick={handleUpdate(
                      'connect',
                      `${field}-add-new`,
                      undefined,
                      fieldState[`${field}-add-new`]?.value,
                      ''
                    )}
                    data-tooltip-id={`${field}-save`}
                    data-tooltip-content={'Save'}
                  >
                    {fieldState[`${field}-add-new`]?.saving ? (
                      <Loader size={'h-4 w-4'} fullScreen={false} />
                    ) : (
                      <CloudArrowUpIcon className={'h-4 w-4'} />
                    )}

                    <Tooltip id={`${field}-save`} />
                  </button>
                  <button
                    type="button"
                    className={' rounded border border-gray-400 p-0.5 hover:shadow-inner'}
                    onClick={() => {
                      handleButtonClick(`${field}-add-new`)()
                    }}
                    data-tooltip-id={`${field}-back`}
                    data-tooltip-content={'Cancel Edit'}
                  >
                    <ArrowUturnLeftIcon className={'h-4 w-4 text-red-500'} />
                    <Tooltip id={`${field}-back`} />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

type JobTalentsDataType = {
  id: string
  job?: {
    matchId: string
    id: string
    name: string
    jobTemplateId: string
    jobStages: {
      id: string
      category: string
      position: number
    }[]
    currentStage: {
      id: string
      category: string
      position: number
    }
  }
  jobs: JobTalentsDataType['job'][]
  talentPool?: {
    matchId: string
    id: string
    name: string
  }
  talentPools: JobTalentsDataType['talentPool'][]
}

export const queryToJobsTalents = (data: any): JobTalentsDataType | null => {
  if (!data) return null

  return {
    id: data.id,
    jobs: [
      ...(data.candidateJobs ?? []).map((jobRow: any) => {
        return {
          matchId: jobRow.id,
          id: jobRow.job.id,
          name: jobRow.job.name,
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
          id: talentPoolRow.talentPool?.id,
          name: talentPoolRow.talentPool?.name,
        }
      }),
    ],
  }
}
