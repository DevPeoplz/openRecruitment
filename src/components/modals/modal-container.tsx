import React from 'react'
import { Dialog } from '@headlessui/react'
import clsx from 'clsx'

type props = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>> | ((x: boolean) => void)
  title?: string
  children: React.ReactNode
  className?: string
}

const ModalContainer: React.FC<props> = ({ isOpen, setIsOpen, children, title, className }) => {
  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50 ">
      <div className="fixed inset-0  bg-black/80 " aria-hidden="true" />
      <div className="fixed  inset-0 my-2 flex items-center justify-center overflow-auto">
        <Dialog.Panel
          className={clsx(
            `mx-auto max-h-[90vh]  min-h-[200px] min-w-[400px] overflow-y-auto overflow-x-hidden scroll-smooth rounded-xl bg-white p-4 ${className}`
          )}
        >
          {title && <Dialog.Title className="p-2 text-2xl font-bold">{title}</Dialog.Title>}
          {children}
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}

export default ModalContainer
