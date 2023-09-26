import { TextField, UploadAvatar, PhoneField, UploadFile } from '@/components/UI/fields'
import React from 'react'
import { PlusIcon } from '@heroicons/react/20/solid'
import { Button } from '@/components/UI/Button'

const AddCandidateView = () => {
  return (
    <div className="flex flex-col gap-2 p-2">
      <UploadAvatar id="upload-avatar" />
      <span className="flex gap-1">
        <TextField id="name" label="Name" />
        <TextField id="last-name" label="Last name" />
      </span>
      <TextField
        className="col-span-full"
        label="Email address"
        id="email"
        name="email"
        type="email"
        autoComplete="email"
        required
        onChange={() => console.log('email')}
      />
      <PhoneField
        className="col-span-full"
        label="Phone number"
        id="phone"
        name="phone"
        autoComplete="tel"
        required
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
        <Button className="w-full " color="primary">
          Add candidate
        </Button>
      </div>
    </div>
  )
}

export default AddCandidateView
