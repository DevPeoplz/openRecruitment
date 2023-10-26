import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import Alert from '@/components/alert'
import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/20/solid'
import Loader from '@/components/ui/loader'
import { reject } from 'lodash'
import { ComboboxWithTagsProps } from '@/components/ui/combobox-with-tags'
import { CandidateTagsBtnCombobox } from '@/components/ui/dropdowns/candidate-tags-btn-combobox'
import { childrenRenderer } from '@/components/utils/basic'
import { getChildrenNotDisplayName, getChildrenOnDisplayName } from '@/components/utils'
import InputArrayWithTags from '@/components/ui/input-array-with-tags'

interface EditableFieldType<T> {
  initialValue?: T | null | undefined
  type?: string
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
  inputClassName,
  children,
  initialValue = null,
  type = 'text',
  editVisible = false,
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
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [validationError, setValidationError] = useState(false)
  const [childrenWidth, setChildrenWidth] = useState(50)
  const [value, setValue] = useState(initialValue)
  const childrenRef = React.useRef<HTMLDivElement>(null)

  let previewComponent = children
  const editIcon = <PencilSquareIcon className="h-5 w-5" />

  const editableFieldIcon = getChildrenOnDisplayName(children, 'EditableField.Icon')

  if (editableFieldIcon && editableFieldIcon.length > 0) {
    previewComponent = getChildrenNotDisplayName(children, 'EditableField.Icon')
  }

  useEffect(() => {
    if (childrenRef.current) {
      setChildrenWidth(childrenRef.current.offsetWidth)
    }
  }, [])

  let inputComponent: React.ReactNode = null

  switch (type) {
    case 'sources':
      inputComponent = (
        <CandidateTagsBtnCombobox
          key={'editable-field-sources'}
          attribute={'sources'}
          placeholder={'Select a source...'}
          initialSelection={value as ComboboxWithTagsProps['initialSelection']}
          onSelectionChange={(options) => {
            setValue(options as T)
          }}
        />
      )
      break
    case 'tags':
      inputComponent = (
        <CandidateTagsBtnCombobox
          key={'editable-field-tags'}
          attribute={'tags'}
          placeholder={'Select a tag...'}
          initialSelection={value as ComboboxWithTagsProps['initialSelection']}
          onSelectionChange={(options) => {
            setValue(options as T)
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
            setValue(options as T)
          }}
          initialSelection={initialValue as string[]}
        />
      )
      break
    case 'text':
    case 'number':
    case 'email':
    default:
      inputComponent = (
        <div className="min-w-[50px]" style={{ width: `${childrenWidth + 15}px` }}>
          <input
            className={clsx(
              'block w-full rounded-lg border border-gray-200 bg-white px-[calc(theme(spacing.3)-1px)] py-[calc(theme(spacing.2)-1px)] text-gray-900 placeholder:text-gray-400 focus:border-cyan-500 focus:outline-none focus:ring-cyan-500 sm:text-sm',
              inputClassName,
              validationError ? 'border-red-500' : ''
            )}
            value={(value as React.InputHTMLAttributes<HTMLInputElement>['value']) ?? undefined}
            type={type}
            onChange={(e) => {
              setValue(e.target.value as T)
            }}
          />
        </div>
      )
      break
  }

  return (
    <div className={clsx('group relative pr-11')}>
      {editing ? (
        inputComponent
      ) : (
        <div ref={childrenRef} className={clsx(editing ? 'invisible' : '')}>
          {previewComponent}
        </div>
      )}
      <div
        className={clsx(
          'absolute right-0 top-0 z-20 h-full w-10 items-center justify-center',
          editing || editVisible || initialValue === null ? 'flex' : 'hidden group-hover:flex'
        )}
      >
        {!editing && (
          <button
            onClick={() => {
              setChildrenWidth(childrenRef.current?.offsetWidth ?? 0)
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
                validate(value)
                  .then(() => {
                    setValidationError(false)
                    onSave(value)
                      .then((newVal) => {
                        setValue(newVal ?? null)
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
                setValue(initialValue)
                setEditing(false)
              }}
            >
              <XMarkIcon className="h-5 w-5 text-red-500"></XMarkIcon>
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
