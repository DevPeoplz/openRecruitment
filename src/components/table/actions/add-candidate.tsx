import React, { useId, useState } from 'react'
import { PlusIcon } from '@heroicons/react/20/solid'
import { Tooltip } from 'react-tooltip'
import { SimpleModalContainer } from '@/components/modals/simple-modal-container'
import clsx from 'clsx'

type ButtonIconSimpleModalProps = {
  children: React.ReactNode
  tooltip: string
  icon?: React.ReactNode
  modalTitle: string
  btnClassName?: string
}

export const ButtonIconSimpleModal: React.FC<ButtonIconSimpleModalProps> = ({
  children,
  tooltip,
  icon = <PlusIcon className="h-5 w-5 text-white" />,
  modalTitle,
  btnClassName,
}) => {
  const generatedId = useId()
  const [openModal, setOpenModal] = useState(false)
  return (
    <div data-tooltip-id="button-tooltip" data-tooltip-content="add candidates">
      <button
        className={clsx(
          'relative cursor-pointer rounded-md bg-secondary-400 p-2 text-sm font-semibold text-white shadow-sm hover:bg-secondary-200',
          btnClassName
        )}
        data-tooltip-content={tooltip}
        id={`button-tooltip-${generatedId}`}
        onClick={() => setOpenModal(true)}
      >
        {icon}
      </button>
      <Tooltip
        place="top"
        content={tooltip}
        id={`button-tooltip-${generatedId}`}
        className="capitalize"
      >
        <span>{tooltip}</span>
      </Tooltip>
      <SimpleModalContainer state={[openModal, setOpenModal]} title={modalTitle}>
        {children}
      </SimpleModalContainer>
    </div>
  )
}
