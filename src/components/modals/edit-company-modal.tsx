import React, { FC } from 'react'
import ModalContainer from './modal-container'
import EditCompany from '../views/settings/company/edit-company'

type Props = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const EditCompanyModal: FC<Props> = ({ isOpen, setIsOpen }) => {
  return (
    <ModalContainer isOpen={isOpen} setIsOpen={setIsOpen} title="Edit company">
      <EditCompany />
    </ModalContainer>
  )
}

export default EditCompanyModal
