import React from 'react'
import ModalContainer from './modal-container'
import { Button } from '../ui/Button'
import { useMutation } from '@apollo/client'
import { DELETE_EVENT_MUTATION } from '@/graphql-operations/mutations'
import Alert from '../alert'

type Props = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  id: string
}

const DeleteEventModal: React.FC<Props> = ({ isOpen, setIsOpen, id }) => {
  const [createEntity] = useMutation(DELETE_EVENT_MUTATION)

  const deleteMutation = async () => {
    try {
      const res = await createEntity({
        variables: {
          where: {
            id: Number(id),
          },
        },
      })
      Alert({ message: 'Event deleted', type: 'success' })
      setIsOpen(false)
    } catch (err) {
      Alert({ message: 'Error deleting event', type: 'error' })
      console.error(err)
    }
  }

  return (
    <ModalContainer isOpen={isOpen} setIsOpen={setIsOpen} title="Delete Event">
      <div className="flex h-full w-full flex-col items-start justify-center gap-2">
        <p>Are you sure to delete this event?</p>
        <Button className="self-center" onClick={deleteMutation}>
          Delete
        </Button>
      </div>
    </ModalContainer>
  )
}

export default DeleteEventModal
