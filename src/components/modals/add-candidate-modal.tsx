import React, { useContext } from 'react'
import ModalContainer from './modal-container'
import AddCandidateView from '../views/candidate/add-candidate-view'
import { ModalControlContext } from '@/hooks/contexts'

const AddCandidateModal: React.FC = () => {
  const [isOpen, setIsOpen] = useContext(ModalControlContext)
  return (
    <ModalContainer isOpen={isOpen} setIsOpen={setIsOpen} title="Add new candidate">
      <AddCandidateView />
    </ModalContainer>
  )
}

export default AddCandidateModal
