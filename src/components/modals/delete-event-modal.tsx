import React from 'react'
import ModalContainer from './modal-container'
import { Button } from '../ui/Button'
import { useApolloClient, useMutation } from '@apollo/client'
import { DELETE_EVENT_MUTATION } from '@/graphql-operations/mutations'
import Alert from '../alert'
import { GET_HUB_EVENTS } from '@/graphql-operations/queries'

type Props = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  id: string
}

const DeleteEventModal: React.FC<Props> = ({ isOpen, setIsOpen, id }) => {
  const client = useApolloClient()
  const [deleteEvent] = useMutation(DELETE_EVENT_MUTATION)

  const deleteMutation = async () => {
    deleteEvent({
      variables: {
        where: {
          id: Number(id),
        },
      },
    })
      .then(() => {
        Alert({ message: 'Event deleted', type: 'success' }).then()
      })
      .catch((err) => {
        Alert({ message: 'Error deleting event', type: 'error' }).then()
        console.error(err)
      })
      .finally(() => {
        setIsOpen(false)
        client.refetchQueries({
          include: [GET_HUB_EVENTS],
        })
      })
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
