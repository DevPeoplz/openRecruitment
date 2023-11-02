import { XMarkIcon } from '@heroicons/react/24/outline'
import { Tooltip } from 'react-tooltip'
import React, { useCallback } from 'react'
import Swal from 'sweetalert2'
import Alert from '@/components/alert'
import { useMutation } from '@apollo/client'
import {
  DELETE_CANDIDATE_BY_ID,
  DELETE_EVALUATION_BY_ID,
  DELETE_EVENT_BY_ID,
  DELETE_JOB_BY_ID,
  DELETE_TALENT_POOL_BY_ID,
} from '@/graphql-operations/mutations'
import { GET_HUB_CANDIDATES, GET_HUB_JOBS, GET_HUB_POOLS } from '@/graphql-operations/queries'
import { GET_CANDIDATE_BY_ID_QUICK_EVALUATIONS } from '@/graphql-operations/queries/dashboard-candidates'

type DeleteRecordProps = {
  id: number | string | null | undefined
  name?: string | null | undefined
  type?: 'candidate' | 'job' | 'talentPool' | 'event' | 'evaluation'
}

export const DeleteRecord: React.FC<DeleteRecordProps> = ({ id, name, type = 'candidate' }) => {
  const recordData = {
    candidate: {
      title: 'Candidate',
      mutation: DELETE_CANDIDATE_BY_ID,
      refetchQueries: [GET_HUB_CANDIDATES, GET_HUB_JOBS, GET_HUB_POOLS],
    },
    job: {
      title: 'Job',
      mutation: DELETE_JOB_BY_ID,
      refetchQueries: [GET_HUB_CANDIDATES, GET_HUB_JOBS],
    },
    talentPool: {
      title: 'Talent Pool',
      mutation: DELETE_TALENT_POOL_BY_ID,
      refetchQueries: [GET_HUB_CANDIDATES, GET_HUB_POOLS],
    },
    event: {
      title: 'Event',
      mutation: DELETE_EVENT_BY_ID,
      refetchQueries: ['GET_HUB_EVENTS'],
    },
    evaluation: {
      title: 'Evaluation',
      mutation: DELETE_EVALUATION_BY_ID,
      refetchQueries: [GET_CANDIDATE_BY_ID_QUICK_EVALUATIONS],
    },
  }

  const [deleteRecord, { loading: deleteRecordLoading }] = useMutation(recordData[type].mutation)

  const handleDelete = useCallback(() => {
    return new Promise((resolve, reject) => {
      deleteRecord({
        variables: {
          where: {
            // TODO: Add custom parser if needed
            id: parseInt(String(id)),
          },
        },
        refetchQueries: recordData[type].refetchQueries,
      })
        .then((res) => {
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }, [deleteRecord, id])

  const handleClickDelete = () => {
    Swal.fire({
      title: `<p class='text-lg'>Do you want to DELETE the ${type}: <b>${
        name ? name : id
      }</b> ?</p>`,
      showDenyButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Cancel`,
      confirmButtonColor: 'rgb(239 68 68)',
      denyButtonColor: 'rgb(229 231 235)',
    })
      .then((result) => {
        if (result.isConfirmed) {
          handleDelete().then(() => {
            Alert({ message: 'Deleted successfully!', type: 'success' }).then()
          })
        }
      })
      .catch((error) => {
        console.log(error)
        Alert({ message: 'Error deleting record', type: 'error' }).then()
      })
  }

  return (
    <>
      <button
        type="button"
        className={'rounded border border-gray-400 bg-red-500 p-0.5 hover:shadow-inner'}
        onClick={handleClickDelete}
        data-tooltip-id={`delete-${type}-${id}-tooltip`}
        data-tooltip-content={'Delete'}
      >
        <XMarkIcon className={'h-4 w-4 text-white'} />
        <Tooltip id={`delete-${type}-${id}-tooltip`} />
      </button>
    </>
  )
}
