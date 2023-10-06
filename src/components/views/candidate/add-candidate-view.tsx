import { PhoneField, TextField, UploadAvatar, UploadFile } from '@/components/ui/fields'
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { PlusIcon } from '@heroicons/react/20/solid'
import { Button } from '@/components/ui/Button'
import { useApolloClient, useMutation } from '@apollo/client'
import { ADD_CANDIDATE_MUTATION } from '@/components/graphql/mutations'
import Alert from '@/components/alert'
import { omit } from 'lodash'
import Loader from '@/components/ui/loader'
import { ModalControlContext } from '@/hooks/contexts'
import ComboboxWithTags, { ComboboxWithTagsProps } from '@/components/ui/combobox-with-tags'
import clsx from 'clsx'
import BtnIconCombobox from '@/components/ui/btn-icon-combobox'

const AddCandidateView = () => {
  const [_, setIsOpen] = useContext(ModalControlContext)
  const client = useApolloClient()

  const [formData, setFormData] = useState<Record<string, string | string[] | null | Blob>>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    avatar: null,
    cv: null,
    coverLetter: null,
    jobs: [],
    tags: [],
    sources: [],
  })

  const [onSubmitLoading, setOnSubmitLoading] = useState(false)

  const [createEntity, { loading, error, data }] = useMutation(ADD_CANDIDATE_MUTATION)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setOnSubmitLoading(true)

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
            const blob = formData[file] as Blob
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
              Alert({ type: 'success', message: 'Candidate created successfully' })
            } else {
              Alert({
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
        console.error(err)
        console.log('Error creating candidate')
        Alert({ type: 'error', message: 'Something went wrong' })
      })
      .finally(async () => {
        setOnSubmitLoading(false)
        await client.refetchQueries({
          include: ['GET_HUB_CANDIDATES'],
        })
        setIsOpen(false)
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

  const useHandleKeyOptionsChange = (key: string) => {
    return useCallback(
      (selectedOptions: ComboboxWithTagsProps['options']) => {
        setFormData((prev) => ({
          ...prev,
          [key]: selectedOptions.map((option) => option.value.toString()),
        }))
      },
      [key]
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-2">
      <UploadAvatar id="avatar" onChange={handleFileInput} file={formData?.avatar as Blob} />
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
      <BtnIconCombobox
        options={[]}
        btnText="Assign"
        placeholderText="Select a Job or Talent Pool..."
        btnClassName="ml-2 mt-1"
        plusClassName="h-4 w-4"
        onSelectedOptionsChange={useHandleKeyOptionsChange('jobs')}
      />
      <div className="m-2 flex items-center gap-2">
        <p className={'w-16'}>Tags:</p>
        <BtnIconCombobox
          options={[]}
          placeholderText="Select a Tag..."
          onSelectedOptionsChange={useHandleKeyOptionsChange('tags')}
        />
      </div>
      <div className="m-2 flex items-center gap-2">
        <p className={'w-16'}>Source:</p>
        <BtnIconCombobox
          options={[]}
          placeholderText="Select a Source..."
          onSelectedOptionsChange={useHandleKeyOptionsChange('sources')}
        />
      </div>
      <UploadFile
        label="CV or Resume:"
        id="cv"
        file={formData?.cv as Blob}
        onChange={handleFileInput}
      />
      <UploadFile
        label="Cover Letter:"
        id="coverLetter"
        file={formData?.coverLetter as Blob}
        onChange={handleFileInput}
      />
      <div>
        <Button className="w-full " color="primary" type="submit">
          {onSubmitLoading ? <Loader size="h-4 w-4" fullScreen={false} /> : 'Add candidate'}
        </Button>
      </div>
    </form>
  )
}

export default AddCandidateView
