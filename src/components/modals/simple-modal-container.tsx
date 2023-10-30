import React from 'react'
import ModalContainer from './modal-container'

type SimpleModalContainerProps = {
  children: React.ReactNode
  state: [boolean, (x: boolean) => void]
  title: string
}

export const SimpleModalContainer: React.FC<SimpleModalContainerProps> = ({
  children,
  state,
  title,
}) => {
  const [isOpen, setIsOpen] = state
  return (
    <ModalContainer isOpen={isOpen} setIsOpen={setIsOpen} title={title}>
      {children}
    </ModalContainer>
  )
}
