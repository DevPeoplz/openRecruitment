<<<<<<< HEAD
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Tooltip } from 'react-tooltip'
import React, { useCallback } from 'react'
=======
import { TrashIcon } from '@heroicons/react/24/outline'
import { Tooltip } from 'react-tooltip'
import React, { useCallback, useState } from 'react'
>>>>>>> origin/develop
import Swal from 'sweetalert2'
import Alert from '@/components/alert'
import { useMutation } from '@apollo/client'
import {
  DELETE_CANDIDATE_BY_ID,
<<<<<<< HEAD
=======
  DELETE_EVALUATION_BY_ID,
>>>>>>> origin/develop
  DELETE_EVENT_BY_ID,
  DELETE_JOB_BY_ID,
  DELETE_TALENT_POOL_BY_ID,
} from '@/graphql-operations/mutations'
import { GET_HUB_CANDIDATES, GET_HUB_JOBS, GET_HUB_POOLS } from '@/graphql-operations/queries'
<<<<<<< HEAD
=======
import { GET_CANDIDATE_BY_ID_QUICK_EVALUATIONS } from '@/graphql-operations/queries/dashboard-candidates'
import Loader from '@/components/ui/loader'
>>>>>>> origin/develop

type DeleteRecordProps = {
  id: number | string | null | undefined
  name?: string | null | undefined
<<<<<<< HEAD
  type?: 'candidate' | 'job' | 'talentPool' | 'event'
}

export const DeleteRecord: React.FC<DeleteRecordProps> = ({ id, name, type = 'candidate' }) => {
=======
  type?: 'candidate' | 'job' | 'talentPool' | 'event' | 'evaluation'
}

export const DeleteRecord: React.FC<DeleteRecordProps> = ({ id, name, type = 'candidate' }) => {
  const [deleting, setDeleting] = useState(false)
>>>>>>> origin/develop
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
<<<<<<< HEAD
=======
    evaluation: {
      title: 'Evaluation',
      mutation: DELETE_EVALUATION_BY_ID,
      refetchQueries: [GET_CANDIDATE_BY_ID_QUICK_EVALUATIONS],
    },
>>>>>>> origin/develop
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
<<<<<<< HEAD
          handleDelete().then(() => {
            Alert({ message: 'Deleted successfully!', type: 'success' }).then()
          })
=======
          setDeleting(true)
          handleDelete()
            .then(() => {
              Alert({ message: 'Deleted successfully!', type: 'success' }).then()
            })
            .finally(() => {
              setDeleting(false)
            })
>>>>>>> origin/develop
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
<<<<<<< HEAD
        className={'rounded border border-gray-400 bg-red-500 p-0.5 hover:shadow-inner'}
=======
        className={'rounded bg-red-500 p-0.5 hover:bg-red-600 hover:shadow-inner'}
>>>>>>> origin/develop
        onClick={handleClickDelete}
        data-tooltip-id={`delete-${type}-${id}-tooltip`}
        data-tooltip-content={'Delete'}
      >
<<<<<<< HEAD
        <XMarkIcon className={'h-4 w-4 text-white'} />
=======
        {deleting ? (
          <Loader size="h-4 w-4" fullScreen={false} />
        ) : (
          <TrashIcon className={'h-4 w-4 text-white'} />
        )}
>>>>>>> origin/develop
        <Tooltip id={`delete-${type}-${id}-tooltip`} />
      </button>
    </>
  )
}
