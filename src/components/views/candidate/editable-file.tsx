import SimpleImageViewer from '@/components/ui/simple-image-viewer'
import Avatar from '@/components/ui/avatar'
import React, { useContext, useId, useState } from 'react'
import Alert from '@/components/alert'
import { CandidateUploadFile } from '@/components/file-upload/file-upload'
import { CandidateContext } from '@/components/views/candidate/candidate-view'
import Loader from '@/components/ui/loader'

export const EditableFile: React.FC<{ field: string; file?: string | null }> = ({
  field,
  file,
}) => {
  const [candidate = { id: null, name: null, avatar: null }, refetchCandidate] =
    useContext(CandidateContext) ?? []
  const [updating, setUpdating] = useState(false)
  const generatedId = useId()

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // handle validations
    e.preventDefault()
    const { id } = e.target
    const file = e.target.files?.[0]

    if (!file) {
      Alert({ type: 'error', message: 'Please select a file' }).then()
    } else if (file.size > 204800) {
      Alert({ type: 'error', message: 'File size cannot exceed more than 2MB' }).then()
    } else {
      if (candidate && refetchCandidate) {
        setUpdating(true)
        CandidateUploadFile(file, field, String(candidate.id))
          .then(() => {
            refetchCandidate().then(() => {
              Alert({ type: 'success', message: 'File updated successfully' }).then()
            })
          })
          .catch((err) => {
            console.log(err)
            Alert({
              type: 'warning',
              message: 'File could not be uploaded!',
            }).then()
          })
          .finally(() => {
            setUpdating(false)
          })
      }
    }
  }

  const avatarComponent = (
    <div className="group relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-full">
      <SimpleImageViewer name={candidate.name} src={candidate.avatar}>
        <Avatar name={candidate.name} src={candidate.avatar} />
      </SimpleImageViewer>
      {updating && (
        <div className="absolute inset-0 flex items-center justify-center bg-primary-400/50">
          <Loader size={'w-5 h-5'} fullScreen={false} />
        </div>
      )}
      <div className="absolute bottom-0 left-0 hidden h-2/6 w-full cursor-pointer items-center justify-center bg-primary-400/50 pb-1 font-bold text-primary-900 drop-shadow-white-sm group-hover:flex">
        <label htmlFor={generatedId} className={'cursor-pointer'}>
          Edit
        </label>
        <input
          type="file"
          id={generatedId}
          className="hidden"
          accept="image/png, image/jpeg"
          onChange={handleFileUpload}
        />
      </div>
    </div>
  )

  const pdfComponent = (
    <>
      {updating ? (
        <Loader size={'w-5 h-5'} className={'!border-primary-500'} fullScreen={false} />
      ) : (
        <>
          <label htmlFor={generatedId} className={'cursor-pointer'}>
            {file ? 'Edit' : 'Upload'}
          </label>
          <input
            type="file"
            id={generatedId}
            className="hidden"
            accept="application/pdf"
            onChange={handleFileUpload}
          />
        </>
      )}
    </>
  )

  const editComponents: Record<string, React.ReactElement> = {
    avatar: avatarComponent,
    cv: pdfComponent,
    coverLetter: pdfComponent,
  }

  return editComponents[field] ?? null
}
