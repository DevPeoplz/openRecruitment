import { PhoneField, TextField, UploadAvatar, UploadFile } from '@/components/UI/fields'
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { PlusIcon } from '@heroicons/react/20/solid'
import { Button } from '@/components/UI/Button'
import { useApolloClient, useMutation } from '@apollo/client'
import { ADD_CANDIDATE_MUTATION } from '@/components/graphql/mutations'
import Alert from '@/components/alert'
import { omit } from 'lodash'
import Loader from '@/components/UI/loader'
import { ModalControlContext } from '@/hooks/contexts'
import ComboboxWithTags, { ComboboxWithTagsProps } from '@/components/UI/combobox-with-tags'
import clsx from 'clsx'

const AddCandidateView = () => {
  const tagBtnRef = useRef<HTMLButtonElement>(null)
  const sourceBtnRef = useRef<HTMLButtonElement>(null)
  const jobBtnRef = useRef<HTMLButtonElement>(null)
  const [btnVisibility, setBtnVisibility] = useState({
    jobBtn: true,
    tagBtn: true,
    sourceBtn: true,
  })
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

  const handleBtnClick = (key: string) => {
    return () => {
      setBtnVisibility({ ...btnVisibility, [key]: false })
    }
  }

  const handleOptionsChange = useCallback(
    (key: string, selectedOptions: ComboboxWithTagsProps['options']) => {
      setFormData((prev) => ({
        ...prev,
        [key]: selectedOptions.map((option) => option.value.toString()),
      }))
    },
    [setFormData]
  )

  const handleTagOptionsChange = useCallback(
    (selectedOptions: ComboboxWithTagsProps['options']) =>
      handleOptionsChange('tags', selectedOptions),
    [handleOptionsChange]
  )

  const handleSourceOptionsChange = useCallback(
    (selectedOptions: ComboboxWithTagsProps['options']) =>
      handleOptionsChange('sources', selectedOptions),
    [handleOptionsChange]
  )

  const handleJobOptionsChange = useCallback(
    (selectedOptions: ComboboxWithTagsProps['options']) =>
      handleOptionsChange('jobs', selectedOptions),
    [handleOptionsChange]
  )

  useEffect(() => {
    if (!btnVisibility.tagBtn) {
      tagBtnRef.current?.click()
    }
  }, [btnVisibility.tagBtn])

  useEffect(() => {
    if (!btnVisibility.sourceBtn) {
      sourceBtnRef.current?.click()
    }
  }, [btnVisibility.sourceBtn])

  useEffect(() => {
    if (!btnVisibility.jobBtn) {
      jobBtnRef.current?.click()
    }
  }, [btnVisibility.jobBtn])

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
      <button
        type="button"
        className={clsx('ml-2 mt-1', !btnVisibility.jobBtn && 'hidden')}
        onClick={handleBtnClick('jobBtn')}
      >
        <span className="flex w-24 items-center gap-2 rounded border border-gray-400 p-1">
          <PlusIcon className="h-4 w-4" />
          <p>Assign</p>
        </span>
      </button>
      {!btnVisibility.jobBtn && (
        <ComboboxWithTags
          options={[]}
          comboBtnRef={jobBtnRef}
          onSelectedOptionsChange={handleJobOptionsChange}
          placeholder={'Select a Job or Talent Pool...'}
        />
      )}
      <div className="m-2 flex items-center gap-2">
        <p className={'w-16'}>Tags:</p>
        <button
          type="button"
          className={clsx('rounded border border-gray-400 p-1', !btnVisibility.tagBtn && 'hidden')}
          onClick={handleBtnClick('tagBtn')}
        >
          <PlusIcon className="h-3 w-3" />
        </button>
        {!btnVisibility.tagBtn && (
          <ComboboxWithTags
            options={[]}
            comboBtnRef={tagBtnRef}
            onSelectedOptionsChange={handleTagOptionsChange}
            placeholder={'Select a Tag...'}
          />
        )}
      </div>
      <div className="m-2 flex items-center gap-2">
        <p className={'w-16'}>Source:</p>
        <button
          type="button"
          className={clsx(
            'rounded border border-gray-400 p-1',
            !btnVisibility.sourceBtn && 'hidden'
          )}
          onClick={handleBtnClick('sourceBtn')}
        >
          <PlusIcon className="h-3 w-3" />
        </button>
        {!btnVisibility.sourceBtn && (
          <ComboboxWithTags
            options={[]}
            comboBtnRef={sourceBtnRef}
            onSelectedOptionsChange={handleSourceOptionsChange}
            placeholder={'Select a Source...'}
          />
        )}
      </div>
      <UploadFile label="CV or Resume:" id="cv" onChange={handleFileInput} />
      <UploadFile label="Cover Letter:" id="coverLetter" onChange={handleFileInput} />
      <div>
        <Button className="w-full " color="primary" type="submit">
          {onSubmitLoading ? <Loader size="h-4 w-4" fullScreen={false} /> : 'Add candidate'}
        </Button>
      </div>
    </form>
  )
}

export default AddCandidateView
