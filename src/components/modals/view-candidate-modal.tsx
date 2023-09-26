import React from 'react'
import ModalContainer from './modal-container'
import CandidateView from '../views/candidate/candidate-view'

type Props = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  candidate: CandidateType | null
  logs: LogType[]
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

export type CandidateType = {
  id: number
  name: string
  email: string
  phone: string
  tagSource: {
    tag: {
      id: string
      name: string
    }[]
    source: {
      id: string
      name: string
    }[]
  }
}

const ViewCandidateModal: React.FC<Props> = ({ isOpen, setIsOpen, candidate, logs }) => {
  return (
    <ModalContainer isOpen={isOpen} setIsOpen={setIsOpen} className="h-full py-0 pr-0">
      <CandidateView candidate={candidate} logs={logs} />
    </ModalContainer>
  )
}

export default ViewCandidateModal
