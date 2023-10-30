import React from 'react'
import ModalContainer from './modal-container'
import { ModalControlContext } from '@/hooks/contexts'

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
    <ModalControlContext.Provider value={[isOpen, setIsOpen]}>
      <ModalContainer isOpen={isOpen} setIsOpen={setIsOpen} title={title}>
        {children}
      </ModalContainer>
    </ModalControlContext.Provider>
  )
}
