import React from 'react'
import ModalContainer from '../modal-container'
import AddCandidateView from './add-candidate-view'

type Props = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const AddCandidateModal: React.FC<Props> = ({ isOpen, setIsOpen }) => {
  return (
    <ModalContainer isOpen={isOpen} setIsOpen={setIsOpen} title="Add new candidate">
      <AddCandidateView />
    </ModalContainer>
  )
}

export default AddCandidateModal
