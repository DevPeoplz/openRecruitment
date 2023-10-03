import { TextField, UploadAvatar, PhoneField, UploadFile } from '@/components/UI/fields'
import React, { useState } from 'react'
import { PlusIcon } from '@heroicons/react/20/solid'
import { Button } from '@/components/UI/Button'
import { useMutation } from '@apollo/client'
import { ADD_CANDIDATE_MUTATION } from '@/components/graphql/mutations'
import Alert from '@/components/alert'
import { omit } from 'lodash'

const AddCandidateView = () => {
  const [formData, setFormData] = useState<Record<string, string | null | Blob>>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    avatar: null,
    cv: null,
    coverLetter: null,
  })

  const [createEntity, { loading, error, data }] = useMutation(ADD_CANDIDATE_MUTATION)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    createEntity({
      variables: { data: omit(formData, ['avatar', 'cv', 'coverLetter']) },
    })
      .then(async (res) => {
        console.log('Candidate created successfully')
        if (res.data.createOneCandidate?.id) {
          //Alert({ type: 'success', message: 'Candidate created successfully' })

          // upload files
          const formDataToUpload = new FormData()
          const files = ['avatar', 'cv', 'coverLetter']

          formDataToUpload.append('candidateId', res.data.createOneCandidate.id)
          files.forEach((file) => {
            const blob = formData[file]
            if (blob) {
              formDataToUpload.append('name', file)
              formDataToUpload.append('file', blob)
            }
          })

          try {
            const response = await fetch('/api/candidate/upload-files', {
              method: 'POST',
              body: formDataToUpload,
            })

            console.log(response)

            if (response.ok) {
              await Alert({ type: 'success', message: 'Candidate created successfully' })
            } else {
              await Alert({
                type: 'warning',
                message: 'Candidate created but files were not uploaded',
              })
            }
          } catch (error) {
            console.error('Error uploading files:', error)
          }
        }
      })
      .catch((err) => {
        console.log('Error creating candidate')
        Alert({ type: 'error', message: 'Something went wrong' })
      })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData({ ...formData, [id]: value })
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // handle validations
    e.preventDefault()
    const { id } = e.target
    const file = e.target.files?.[0]

    if (!file) Alert({ type: 'error', message: 'Please select a file' })
    else if (file.size > 204800)
      Alert({ type: 'error', message: 'File size cannot exceed more than 2MB' })
    else {
      setFormData({ ...formData, [id]: file })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-2">
      <UploadAvatar id="avatar" onChange={handleFileInput} />
      <span className="flex gap-1">
        <TextField id="firstName" label="Name" onChange={(e) => handleInputChange(e)} />
        <TextField id="lastName" label="Last name" onChange={(e) => handleInputChange(e)} />
      </span>
      <TextField
        className="col-span-full"
        label="Email address"
        id="email"
        name="email"
        type="email"
        autoComplete="email"
        required
        onChange={(e) => handleInputChange(e)}
      />
      <PhoneField
        className="col-span-full"
        label="Phone number"
        id="phone"
        name="phone"
        autoComplete="tel"
        required
        onChange={(e: React.FormEvent) => setFormData({ ...formData, phone: e.toString() })}
      />
      <p className="pl-2 font-bold">Jobs or Talent Pool:</p>
      <button className="ml-2 mt-1">
        <span className="flex w-24 items-center gap-2 rounded border border-gray-400 p-1">
          <PlusIcon className="h-4 w-4" />
          <p>Assign</p>
        </span>
      </button>
      <div className="m-2 flex items-center gap-2">
        <p>Tags:</p>
        <button className="rounded border border-gray-400 p-1">
          <PlusIcon className="h-3 w-3" />
        </button>
      </div>
      <div className="m-2 flex items-center gap-2">
        <p>Source:</p>
        <button className="rounded border border-gray-400 p-1">
          <PlusIcon className="h-3 w-3" />
        </button>
      </div>

      <UploadFile label="CV or Resume:" id="upload-file" onChange={(e) => null} />
      <UploadFile label="Cover Letter:" id="upload-file" onChange={(e) => null} />
      <div>
        <Button className="w-full " color="primary" type="submit">
          Add candidate
        </Button>
      </div>
    </form>
  )
}

export default AddCandidateView
