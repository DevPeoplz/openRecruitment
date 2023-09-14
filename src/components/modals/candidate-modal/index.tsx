import React from 'react'
import ModalContainer from '../modal-container'
import CandidateView from './candidate-view'

type Props = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  candidate: CandidateType
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
      id: number
      name: string
    }[]
    source: {
      id: number
      name: string
    }[]
  }
}

const CandidateModal: React.FC<Props> = ({ isOpen, setIsOpen, candidate, logs }) => {
  return (
    <ModalContainer isOpen={isOpen} setIsOpen={setIsOpen} className="h-full py-0 pr-0">
      <CandidateView candidate={candidate} logs={logs} />
    </ModalContainer>
  )
}

export default CandidateModal
