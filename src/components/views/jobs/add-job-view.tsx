import { TextField } from '@/components/ui/fields'
import React, { useContext, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { useApolloClient, useMutation } from '@apollo/client'
import Alert from '@/components/alert'
import Loader from '@/components/ui/loader'
import { ModalControlContext } from '@/hooks/contexts'
import { ADD_JOB_MUTATION } from '@/graphql-operations/mutations/signup-candidate'

export const AddJobView = () => {
  const [_, setIsOpen] = useContext(ModalControlContext)
  const client = useApolloClient()

  const [formData, setFormData] = useState<Record<string, string | string[] | null | Blob>>({
    name: null,
  })

  const [onSubmitLoading, setOnSubmitLoading] = useState(false)

  const [createEntity, { loading, error, data }] = useMutation(ADD_JOB_MUTATION)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setOnSubmitLoading(true)

    createEntity({
      variables: { data: formData },
    })
      .then(async (res) => {
        setIsOpen(false)
        setFormData({ name: null })
        client
          .refetchQueries({
            include: ['GET_HUB_JOBS', 'GET_ADD_CANDIDATE_DROPDOWNS'],
          })
          .then(() => {
            Alert({ type: 'success', message: 'Job created successfully' }).then()
          })
      })
      .catch((err) => {
        console.error(err)
        console.log('Error creating job')
        Alert({ type: 'error', message: 'Something went wrong' })
      })
      .finally(async () => {
        setOnSubmitLoading(false)
      })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData({ ...formData, [id]: value })
  }

  return (
    <form onSubmit={handleSubmit} className="mb-2 h-full max-h-full p-2">
      <div className="flex max-h-[65vh] flex-col gap-2 overflow-y-auto">
        <TextField
          className="col-span-full"
          label="Name"
          id="name"
          name="new-job-name"
          type="text"
          required
          onChange={(e) => handleInputChange(e)}
        />
      </div>
      <div>
        <Button className="w-full " color="primary" type="submit">
          {onSubmitLoading ? <Loader size="h-4 w-4" fullScreen={false} /> : 'Add Job'}
        </Button>
      </div>
    </form>
  )
}
