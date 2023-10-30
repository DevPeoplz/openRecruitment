import { useId, useState } from 'react'
import Alert from '@/components/alert'
import { uploadFileHelper } from '@/components/file-upload/file-upload'
import { useLazyQuery } from '@apollo/client'
import { GET_CANDIDATE_BY_ID_FILES } from '@/graphql-operations/queries/dashboard-candidates'

export const useCandidateUpdateFile = (candidateId: string | number | null | undefined) => {
  const [updating, setUpdating] = useState(false)
  const generatedId = useId()

  const [loadCandidate] = useLazyQuery(GET_CANDIDATE_BY_ID_FILES, {
    fetchPolicy: 'network-only',
    variables: {
      where: { id: parseInt(String(candidateId)) },
    },
  })

  const handleFileUpload = (field: string) => async (file: File | undefined) => {
    if (!file) {
      return Alert({ type: 'error', message: 'Please select a file' })
    } else if (file.size > 2048000) {
      return Alert({ type: 'error', message: 'File size cannot exceed more than 2MB' })
    } else {
      if (candidateId) {
        setUpdating(true)
        try {
          try {
            await uploadFileHelper(file, field, String(candidateId))
            loadCandidate().then(() => {
              Alert({ type: 'success', message: 'File updated successfully' }).then()
            })
          } catch (err) {
            console.log(err)
            Alert({
              type: 'warning',
              message: 'File could not be uploaded!',
            }).then()
          }
        } finally {
          setUpdating(false)
        }
      }
    }

    return Promise.resolve()
  }

  return { handleFileUpload, updating, generatedId }
}
