import React, { useState } from 'react'
import { PlusIcon } from '@heroicons/react/20/solid'
import { Tooltip } from 'react-tooltip'
import AddCandidateModal from '@/components/modals/add-candidate-modal'

const AddCandidate = () => {
  const [openModal, setOpenModal] = useState(false)
  return (
    <div data-tooltip-id="button-tooltip" data-tooltip-content="add candidates">
      <button
        className=" relative cursor-pointer rounded-md bg-secondary-200 p-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        data-tooltip-content="Add candidates"
        id="button-tooltip"
        onClick={() => setOpenModal(true)}
      >
        <PlusIcon className="h-5 w-5" />
      </button>
      <Tooltip place="top" content="add candidates" id="button-tooltip" className="capitalize">
        <span>Add candidates</span>
      </Tooltip>
      <AddCandidateModal isOpen={openModal} setIsOpen={setOpenModal} />
    </div>
  )
}

export default AddCandidate
