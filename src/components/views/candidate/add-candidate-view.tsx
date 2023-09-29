import { TextField, UploadAvatar, PhoneField, UploadFile } from '@/components/UI/fields'
import React, { useState } from 'react'
import { PlusIcon } from '@heroicons/react/20/solid'
import { Button } from '@/components/UI/Button'
import { useMutation } from '@apollo/client'
import { ADD_CANDIDATE_MUTATION } from '@/components/graphql/mutations'

const AddCandidateView = () => {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    phone: '',
  })

  const [createEntity, { loading, error }] = useMutation(ADD_CANDIDATE_MUTATION)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form data:', formData)
    try {
      const { data } = await createEntity({
        variables: { input: formData },
      })

      // Handle the data or redirect as needed
      console.log('Created entity:', data.createEntity)
    } catch (err) {
      console.error('Error creating entity:', err)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData({ ...formData, [id]: value })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-2">
      <UploadAvatar id="upload-avatar" />
      <span className="flex gap-1">
        <TextField id="name" label="Name" onChange={(e) => handleInputChange(e)} />
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
