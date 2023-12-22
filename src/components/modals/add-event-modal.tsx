import React from 'react'
import AddEventView from '../views/events/add-event-view'
import { SimpleModalContainer } from '@/components/modals/simple-modal-container'

type Props = {
  isOpen: boolean
  setIsOpen: any
}

const AddEventModal: React.FC<Props> = ({ isOpen, setIsOpen }) => {
  return (
    <SimpleModalContainer state={[isOpen, setIsOpen]} title={'Add Event'}>
      <AddEventView />
    </SimpleModalContainer>
  )
}

export default AddEventModal
