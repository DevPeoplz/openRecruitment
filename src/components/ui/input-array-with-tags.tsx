import React, { Fragment, useEffect, useState } from 'react'
import { PlusIcon, XMarkIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'

export type InputArrayWithTagsProps = {
  placeholder?: string
  width?: string
  onSelectedOptionsChange?: (x: string[]) => void
  initialSelection?: string[]
}

const InputArrayWithTags: React.FC<InputArrayWithTagsProps> = ({
  placeholder = 'Enter an option...',
  width = 'w-[250px]',
  onSelectedOptionsChange,
  initialSelection = [],
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>(() =>
    initialSelection ? initialSelection : []
  )

  const [inputValue, setInputValue] = useState('')

  const removeSelectedOption = (option: string) => {
    setSelectedOptions((prev) => {
      if (prev) {
        return prev.filter((opt) => opt !== option)
      }
      return []
    })
  }

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // Trigger the button click when the Enter key is pressed
      handleOnClick()
    }
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value && e.target.value !== '') {
      setInputValue(e.target.value)
    }
  }

  const handleOnClick = () => {
    if (inputValue && inputValue !== '') {
      setSelectedOptions((prev) => {
        if (prev) {
          // return an array with unique values
          if (!prev.includes(inputValue)) {
            return [...prev, inputValue]
          } else {
            return prev
          }
        }
        return [inputValue]
      })
      setInputValue('')
    }
  }

  useEffect(() => {
    if (onSelectedOptionsChange) {
      onSelectedOptionsChange(selectedOptions)
    }
  }, [onSelectedOptionsChange, selectedOptions])

  return (
    <div className={clsx(width)}>
      <div className="flex flex-wrap gap-1 text-xs">
        {selectedOptions.length > 0 && (
          <div
            className={
              'absolute -top-10 z-20 mb-2 flex h-7 w-full gap-1 overflow-x-auto overflow-y-hidden'
            }
          >
            {selectedOptions.map((option) => (
              <div key={option} className="flex justify-between gap-2 rounded border bg-white p-1">
                <p>{option}</p>
                <XMarkIcon
                  className="h-5 w-5 text-gray-500 hover:cursor-pointer"
                  onClick={() => removeSelectedOption(option)}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
        <input
          className={clsx(
            'w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0'
          )}
          placeholder={placeholder}
          value={inputValue}
          onChange={handleOnChange}
          onKeyDown={handleInputKeyDown}
        />
        <button
          className="absolute inset-y-0 right-0 flex items-center pr-2"
          onClick={handleOnClick}
        >
          <PlusIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}

export default InputArrayWithTags
