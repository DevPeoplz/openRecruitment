import {
  CalendarDaysIcon,
  HandThumbUpIcon,
  PaperAirplaneIcon,
  PlusIcon,
  ShareIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import React, { useState } from 'react'
import { Editor, EditorProvider } from 'react-simple-wysiwyg'

export const AddQuickEvaluation = () => {
  const [btnClicked, setBtnClicked] = useState(false)
  const [note, setNote] = useState('<b>Quick</b> <i>Evaluation</i>')

  const handleBtnClick = () => {
    setBtnClicked(!btnClicked)
  }

  const handleOnChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    setNote(e.target.value)
  }

  return (
    <div className="w-full px-1 py-2">
      <div className="flex justify-between">
        <span className="flex items-center gap-1">
          <button type="button">
            <HandThumbUpIcon className="h-5 w-5" />
          </button>
          <p className={'font-semibold'}>Quick Evaluation</p>
        </span>
        <span className="flex items-center gap-2">
          {btnClicked && (
            <>
              <button type="button">
                <PaperAirplaneIcon className="h-5 w-5 cursor-pointer" />
              </button>
              <button
                type="button"
                className="rounded border border-gray-500"
                onClick={handleBtnClick}
              >
                <XMarkIcon className="h-5 w-5 cursor-pointer" />
              </button>
            </>
          )}
          {!btnClicked && (
            <button
              type="button"
              className="rounded border border-gray-500"
              onClick={handleBtnClick}
            >
              <PlusIcon className="h-5 w-5 cursor-pointer" />
            </button>
          )}
        </span>
      </div>
      <hr className="my-2" />
      {btnClicked && (
        <div className={'rounded-lg bg-white'}>
          <EditorProvider>
            <Editor value={note} onChange={handleOnChange} />
          </EditorProvider>
        </div>
      )}
    </div>
  )
}
