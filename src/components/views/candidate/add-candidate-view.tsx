import { TextField, UploadAvatar, PhoneField, UploadFile } from '@/components/UI/fields'
import React, { useState } from 'react'
import { PlusIcon } from '@heroicons/react/20/solid'
import { Button } from '@/components/UI/Button'
import { useMutation } from '@apollo/client'
import { ADD_CANDIDATE_MUTATION } from '@/components/graphql/mutations'
import Alert from '@/components/alert'
import { useFileUpload } from '@/hooks/upload-files'

const AddCandidateView = () => {
  const [formData, setFormData] = useState({
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
    console.log('Form data:', formData)

    /*await createEntity({
      variables: { input: formData },
    })*/

    if (true || (data && data.createEntity)) {
      Alert({ type: 'success', message: 'Candidate created successfully' })

      // upload files
      const { id } = { id: 1 }
      const formDataToUpload = new FormData()
      const { avatar, cv, coverLetter } = formData
      const files = ['avatar', 'cv', 'coverLetter']
      // files.forEach((file) => {
      //   if (formData[file]) {
      //     formDataToUpload.append(file, formData[file])
      //   }
      // })
      formDataToUpload.append('candidateId', '1')
      formDataToUpload.append('name', 'avatar')

      if (avatar) {
        formDataToUpload.append('file', avatar)
      }

      console.log('Form data tpo upload:', formDataToUpload)

      try {
        const response = await fetch('/api/candidate/upload-files', {
          method: 'POST',
          body: formDataToUpload,
        })

        if (response.ok) {
          alert('File uploaded successfully')
        } else {
          alert('File upload failed')
        }
        console.log('response')
        console.log(response)
      } catch (error) {
        console.error('Error uploading file:', error)
      }
    }
    if (error) {
      Alert({ type: 'error', message: 'Something went wrong' })
    }
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
    console.log(file)
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

      <UploadFile label="CV or Resume:" id="upload-file" />
      <UploadFile label="Cover Letter:" id="upload-file" />
      <div>
        <Button className="w-full " color="primary" type="submit">
          Add candidate
        </Button>
      </div>
    </form>
  )
}

export default AddCandidateView
