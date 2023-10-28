import React, { useState } from 'react'
import clsx from 'clsx'
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import Alert from '@/components/alert'
import { ArrowUturnLeftIcon, CheckCircleIcon } from '@heroicons/react/20/solid'
import Loader from '@/components/ui/loader'
import { ComboboxWithTagsProps } from '@/components/ui/combobox-with-tags'
import { CandidateTagsBtnCombobox } from '@/components/ui/dropdowns/candidate-tags-btn-combobox'
import { childrenRenderer } from '@/components/utils/basic'
import { getChildrenNotDisplayName, getChildrenOnDisplayName } from '@/components/utils'
import InputArrayWithTags from '@/components/ui/input-array-with-tags'
import { DatePicker } from '@/components/ui/date-picker'

interface EditableFieldType<T> {
  className?: string
  value?: T | null | undefined
  type?: string
  settings?: {
    attribute?: string
    placeholder?: string
    options?: {
      label: string
      value: string
    }[]
  }
  inputClassName?: string
  children?: React.ReactNode
  onSave?: (value: T | null | undefined) => Promise<T | null | undefined>
  validate?: (value: T | null | undefined) => Promise<void>
  editVisible?: boolean
}

type EditableFieldComponentsType = {
  Icon?: typeof EditableFieldIcon
}
export const EditableField = <T,>({
  className,
  inputClassName,
  children,
  value = null,
  type = 'text',
  editVisible = false,
  settings,
  onSave = () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(undefined)
      }, 1000)
    }),
  validate = (value) =>
    new Promise((resolve, reject) => {
      if (type === 'email') {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

        if (emailRegex.test(value as string)) {
          resolve()
        } else {
          reject()
        }
      }

      resolve()
    }),
}: EditableFieldType<T> & EditableFieldComponentsType) => {
  const initialValue = () => {
    if (value === null) {
      return null
    }

    if (['stringArray', 'candidateTags'].includes(type)) {
      return value instanceof Array ? (value.length > 0 ? value : null) : null
    }

    if (value === '') {
      return null
    }

    return value
  }
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [validationError, setValidationError] = useState(false)

  const [currentValue, setCurrentValue] = useState<T | null>(() => {
    return initialValue()
  })
  const previewRef = React.useRef<HTMLDivElement>(null)

  let previewComponent = children
  const editIcon = <PencilSquareIcon className="h-5 w-5" />

  const editableFieldIcon = getChildrenOnDisplayName(children, 'EditableField.Icon')

  if (editableFieldIcon && editableFieldIcon.length > 0) {
    previewComponent = getChildrenNotDisplayName(children, 'EditableField.Icon')
  }

  let inputComponent: React.ReactNode = null

  switch (type) {
    case 'candidateTags':
      inputComponent = (
        <CandidateTagsBtnCombobox
          attribute={settings?.attribute ?? 'tags'}
          placeholder={settings?.placeholder ?? 'Select a tag...'}
          initialSelection={currentValue as ComboboxWithTagsProps['initialSelection']}
          onSelectionChange={(options) => {
            setCurrentValue(options as T)
          }}
        />
      )
      break
    case 'stringArray':
      inputComponent = (
        <InputArrayWithTags
          placeholder="Enter a value..."
          width={'w-full'}
          onSelectedOptionsChange={(options) => {
            setCurrentValue(options as T)
          }}
          initialSelection={initialValue() as string[]}
        />
      )
      break
    case 'select':
      inputComponent = (
        <select
          className={clsx(
            'block w-full min-w-[50px] rounded-lg border border-gray-200 bg-white px-[calc(theme(spacing.3)-1px)] py-[calc(theme(spacing.2)-1px)] text-gray-900 placeholder:text-gray-400 focus:border-cyan-500 focus:outline-none focus:ring-cyan-500 sm:text-sm',
            inputClassName,
            validationError ? 'border-red-500' : ''
          )}
          value={
            (currentValue as React.InputHTMLAttributes<HTMLInputElement>['value']) ?? undefined
          }
          onChange={(e) => {
            setCurrentValue(e.target.value as T)
          }}
        >
          {settings?.options?.map((op) => (
            <option key={op.value} value={op.value}>
              {op.label}
            </option>
          ))}
        </select>
      )
      break
    case 'date':
    case 'datetime':
    case 'datetime-local':
      inputComponent = (
        <DatePicker
          hasTime={type === 'datetime'}
          onChange={(value) => {
            setCurrentValue(value as T)
          }}
          initialValue={initialValue() as string}
        />
      )
      break
    case 'text':
    case 'number':
    case 'email':
    default:
      inputComponent = (
        <input
          className={clsx(
            'block w-full min-w-[50px] rounded-lg border border-gray-200 bg-white px-[calc(theme(spacing.3)-1px)] py-[calc(theme(spacing.2)-1px)] text-gray-900 placeholder:text-gray-400 focus:border-cyan-500 focus:outline-none focus:ring-cyan-500 sm:text-sm',
            inputClassName,
            validationError ? 'border-red-500' : ''
          )}
          value={
            (currentValue as React.InputHTMLAttributes<HTMLInputElement>['value']) ?? undefined
          }
          type={type}
          onChange={(e) => {
            if (type === 'number') {
              const number = Number(e.target.value)
              if (!isNaN(number)) {
                setCurrentValue(number as T)
              }
              return
            }

            setCurrentValue(e.target.value as T)
          }}
        />
      )
      break
  }

  return (
    <div className={clsx('group relative flex flex-nowrap items-center', className)}>
      {editing ? (
        inputComponent
      ) : (
        <div ref={previewRef} className={clsx(editing ? 'invisible' : '')}>
          {previewComponent}
        </div>
      )}
      <div
        className={clsx(
          'z-20 flex h-full items-center justify-center gap-1 px-1',
          editing || editVisible || initialValue() === null
            ? 'visible'
            : 'invisible group-hover:visible'
        )}
      >
        {!editing && (
          <button
            onClick={() => {
              setEditing(true)
            }}
          >
            {editableFieldIcon && editableFieldIcon.length > 0 ? editableFieldIcon : editIcon}
          </button>
        )}
        {editing && !saving && (
          <>
            <button
              className={'rounded-xl border-gray-200 hover:border'}
              onClick={() => {
                setSaving(true)
                validate(currentValue)
                  .then(() => {
                    setValidationError(false)
                    onSave(currentValue)
                      .then((newVal) => {
                        setCurrentValue(newVal ?? null)
                        Alert({ type: 'success', message: 'Saved successfully' }).then()
                      })
                      .catch(() => {
                        Alert({ type: 'error', message: 'Error while saving' }).then()
                      })
                      .finally(() => {
                        setSaving(false)
                        setEditing(false)
                      })
                  })
                  .catch(() => {
                    setSaving(false)
                    setValidationError(true)
                  })
              }}
            >
              <CheckCircleIcon className="h-5 w-5 text-success"></CheckCircleIcon>
            </button>
            <button
              className={'rounded-xl border-gray-200 hover:border'}
              onClick={() => {
                setCurrentValue(initialValue)
                setEditing(false)
              }}
            >
              <ArrowUturnLeftIcon className="h-5 w-5 p-0.5 text-red-500"></ArrowUturnLeftIcon>
            </button>
          </>
        )}
        {editing && saving && <Loader className="h-5 w-5" fullScreen={false}></Loader>}
      </div>
    </div>
  )
}

const EditableFieldIcon = childrenRenderer('EditableField.Icon')
EditableField.Icon = EditableFieldIcon
