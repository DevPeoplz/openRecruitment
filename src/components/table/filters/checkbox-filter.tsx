import { CheckboxFieldWithCount } from '@/components/UI/fields'
import React, { useEffect, useReducer } from 'react'
import { XMarkIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'

const optionsReducer = (state, action) => {
  const newState = [...state]
  const index = newState.indexOf(action.key)

  if (index > -1 && !action.value) {
    newState.splice(index, 1)
  } else {
    newState.push(action.key)
  }

  return newState
}

const CheckboxFilter: React.FC<{
  stateKey: string
  label: string
  options: {
    value: string
    label: string
    count: number
    checked: boolean
  }[]
  show: boolean
  setShow: React.Dispatch<React.SetStateAction<boolean>>
  setOptions: (
    options: {
      value: string
      label: string
      count: number
      checked: boolean
    }[]
  ) => void
  dispatchQueryParams: React.Dispatch<any>
  dispatchComponentsStatus: React.Dispatch<any>
}> = ({
  stateKey,
  label,
  options,
  show,
  setShow,
  setOptions,
  dispatchQueryParams,
  dispatchComponentsStatus,
}) => {
  const [checkboxValues, dispatchCheckboxValues] = useReducer(
    optionsReducer,
    options.map((option) => option.checked)
  )

  useEffect(() => {
    dispatchQueryParams({
      type: 'update',
      key: stateKey,
      value: checkboxValues,
    })
    dispatchComponentsStatus({
      type: 'update',
      key: stateKey,
      value: checkboxValues,
    })
  }, [checkboxValues, dispatchComponentsStatus, dispatchQueryParams, stateKey])

  return show ? (
    <div className="flex flex-col p-2">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-900">{label}</h3>
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="font-medium text-gray-600 transition duration-150 ease-in-out hover:text-primary-500"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>
      <div className="mt-1 flex flex-col gap-1">
        {options?.map((option, index) => (
          <div className="flex items-center justify-between" key={index}>
            <CheckboxFieldWithCount
              key={option.value}
              option={option}
              setOption={(checked) => {
                dispatchCheckboxValues({ key: option.value, value: checked })
              }}
            />
            <div className=" rounded border px-1">
              <p
                className={clsx(
                  `${
                    option.count == 0 ? 'text-gray-300' : 'text-gray-700'
                  } text-right text-xs`
                )}
              >
                {option.count}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : null
}

export default CheckboxFilter
