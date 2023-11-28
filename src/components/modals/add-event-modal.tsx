import React from 'react'
import ModalContainer from './modal-container'
import AddEventView from '../views/events/add-event-view'

type Props = {
  isOpen: boolean
  setIsOpen: any
}

const AddEventModal: React.FC<Props> = ({ isOpen, setIsOpen }) => {
  return (
    <ModalContainer isOpen={isOpen} setIsOpen={setIsOpen} title="Add Event">
      <AddEventView />
    </ModalContainer>
  )
}

export default AddEventModal
