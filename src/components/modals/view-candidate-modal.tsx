import React from 'react'
import ModalContainer from './modal-container'
import CandidateView from '../views/candidate/candidate-view'

type Props = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  candidateId?: string | number
}

export type LogType = {
  id: number
  type: string
  description: string
  createdAt: string
  author: {
    id: number
    name: string
  }
}

const ViewCandidateModal: React.FC<Props> = ({ isOpen, setIsOpen, candidateId }) => {
  return (
    <ModalContainer
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      className="h-[90vh] w-[900px] max-w-[95vw] py-0 pr-0"
    >
      <CandidateView candidateId={candidateId} />
    </ModalContainer>
  )
}

export default ViewCandidateModal
