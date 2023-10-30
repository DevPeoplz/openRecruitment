import { PhoneField, TextField, UploadAvatar, UploadFile } from '@/components/ui/fields'
import React, { useCallback, useContext, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { useApolloClient, useMutation, useQuery } from '@apollo/client'
import { ADD_CANDIDATE_MUTATION } from '@/graphql-operations/mutations'
import Alert from '@/components/alert'
import { omit } from 'lodash'
import Loader from '@/components/ui/loader'
import { ModalControlContext } from '@/hooks/contexts'
import { ComboboxWithTagsProps } from '@/components/ui/combobox-with-tags'
import { BtnIconCombobox } from '@/components/ui/btn-icon-combobox'
import { GET_ADD_CANDIDATE_DROPDOWNS } from '@/graphql-operations/queries'
import { uploadFileHelper } from '@/components/file-upload/file-upload'

const parseGQLData = (
  data: { id: number | string; name: string }[] | undefined,
  suffix?: string
) => {
  if (!Array.isArray(data)) return []

  return data.map((item) => {
    const extra = suffix ? ` ${suffix}` : ''
    return {
      value: `${item.id}${extra}`,
      label: `${item.name}${extra}`,
    }
  })
}

export const AddJobView = () => {
  const [_, setIsOpen] = useContext(ModalControlContext)
  const { data: dataDropdown, loading: loadingDropdown } = useQuery(GET_ADD_CANDIDATE_DROPDOWNS)

  const client = useApolloClient()

  const [formData, setFormData] = useState<Record<string, string | string[] | null | Blob>>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    avatar: null,
    cv: null,
    coverLetter: null,
    jobsInput: [],
    tagsInput: [],
    sourcesInput: [],
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

          return Promise.all(
            files.map(async (key) => {
              const blob = formData[key] as File
              if (blob) {
                return uploadFileHelper(blob, key, res.data.createOneCandidate.id)
              }
              return null
            })
          )
            .then((res) => {
              Alert({ type: 'success', message: 'Candidate created successfully' })
            })
            .catch((err) => {
              Alert({
                type: 'warning',
                message: 'Candidate created but files were not uploaded',
              })
            })

          // try {
          //   const response = await fetch('/api/candidate/upload-files', {
          //     method: 'POST',
          //     body: formDataToUpload,
          //   })
          //
          //   console.log(response)
          //
          //   if (response.ok) {
          //     Alert({ type: 'success', message: 'Candidate created successfully' })
          //   } else {
          //
          //   }
          // } catch (error) {
          //   console.error('Error uploading files:', error)
          // }
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
          include: ['GET_HUB_CANDIDATES', 'GET_TAGSOURCES'],
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

    if (!file) {
      Alert({ type: 'error', message: 'Please select a file' })
    } else if (file.size > 204800) {
      Alert({ type: 'error', message: 'File size cannot exceed more than 2MB' })
    } else {
      setFormData({ ...formData, [id]: file })
    }
  }

  const deleteFilePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const { id } = e.target
    setFormData({ ...formData, [id]: '' })
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
    <form onSubmit={handleSubmit} className="mb-2 h-full max-h-full p-2">
      <div className="flex max-h-[65vh] flex-col gap-2 overflow-y-auto">
        <UploadAvatar
          id="avatar"
          onChange={handleFileInput}
          deleteFilePreview={deleteFilePreview}
          file={formData?.avatar as Blob}
        />
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
          options={[
            ...parseGQLData(dataDropdown?.jobs),
            ...parseGQLData(dataDropdown?.talentPools, ' (Talent Pool)'),
          ]}
          btnText="Assign"
          placeholderText="Select a Job or Talent Pool..."
          btnClassName="ml-2 mt-1"
          plusClassName="h-4 w-4"
          onSelectedOptionsChange={useHandleKeyOptionsChange('jobsInput')}
        />
        <div className="m-2 flex items-center gap-2">
          <p className={'w-16'}>Tags:</p>
          <BtnIconCombobox
            options={parseGQLData(dataDropdown?.tags)}
            placeholderText="Select a Tag..."
            onSelectedOptionsChange={useHandleKeyOptionsChange('tagsInput')}
          />
        </div>
        <div className="m-2 flex items-center gap-2">
          <p className={'w-16'}>Source:</p>
          <BtnIconCombobox
            options={parseGQLData(dataDropdown?.sources)}
            placeholderText="Select a Source..."
            onSelectedOptionsChange={useHandleKeyOptionsChange('sourcesInput')}
          />
        </div>
        <UploadFile
          label="CV or Resume:"
          id="cv"
          file={formData?.cv as Blob}
          onChange={handleFileInput}
          deleteFilePreview={deleteFilePreview}
        />
        <UploadFile
          label="Cover Letter:"
          id="coverLetter"
          file={formData?.coverLetter as Blob}
          onChange={handleFileInput}
          deleteFilePreview={deleteFilePreview}
        />
      </div>
      <div>
        <Button className="w-full " color="primary" type="submit">
          {onSubmitLoading ? <Loader size="h-4 w-4" fullScreen={false} /> : 'Add candidate'}
        </Button>
      </div>
    </form>
  )
}
