import React, { useState } from 'react'
import { FieldsTable } from '@/components/ui/fields-table'
import clsx from 'clsx'
import { CloudArrowUpIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import { ADD_CUSTOM_FIELD_MUTATION } from '@/graphql-operations/mutations/signup-candidate'
import { useApolloClient, useMutation } from '@apollo/client'
import { uniq } from 'lodash'
import Alert from '@/components/alert'
import Loader from '@/components/ui/loader'

export const customFieldAvailableTypes = [
  'string',
  'int',
  'date',
  'datetime',
  'select',
  'stringArray',
  'currency',
] as const

export type CustomFieldAvailableTypes = (typeof customFieldAvailableTypes)[number]

type CustomFieldForm = {
  defaultValue?: string
  key?: string
  settings?: { label?: string; options?: { label: string; value: string }[] }
  type?: CustomFieldAvailableTypes
}

type AddCustomFieldComponentFieldsTableItemProps = {
  visibility: [string[], React.Dispatch<React.SetStateAction<string[]>>]
}

export const AddCustomFieldComponentFieldsTableItem = ({
  visibility,
}: AddCustomFieldComponentFieldsTableItemProps) => {
  const client = useApolloClient()
  const [newCustomFieldForm, setNewCustomFieldForm] = useState<CustomFieldForm>({})
  const [btnClicked, setBtnClicked] = useState(false)
  const [saving, setSaving] = useState(false)
  const [customFieldsVisibility, setCustomFieldsVisibility] = visibility
  const [addCustomField] = useMutation(ADD_CUSTOM_FIELD_MUTATION)

  const handleBtnClick = () => () => {
    setBtnClicked((prev) => !prev)
  }

  const handleInputChange = (field: string) => (e: { target: { value: string | undefined } }) => {
    if (field === 'label') {
      setNewCustomFieldForm((prev) => ({
        ...prev,
        settings: { ...prev.settings, label: e.target.value },
      }))
    } else {
      setNewCustomFieldForm((prev) => ({ ...prev, [field]: e.target.value }))
    }
  }

  const handleSave = () => {
    setSaving(true)
    addCustomField({
      variables: {
        data: newCustomFieldForm,
      },
    })
      .then((res) => {
        if (res.data?.customField) {
          setCustomFieldsVisibility(uniq([...customFieldsVisibility, res.data.customField.key]))
          setBtnClicked(false)
          setNewCustomFieldForm({})
          client
            .refetchQueries({
              include: ['GET_AVAILABLE_CUSTOM_FIELDS', 'GET_CANDIDATE_BY_ID_VISIBLE_CUSTOM_FIELDS'],
            })
            .then(() => {
              Alert({ type: 'success', message: 'Custom Field Added' }).then()
            })
        }
      })
      .catch(() => {
        Alert({ type: 'error', message: 'Something went wrong' }).then()
      })
      .finally(() => {
        setSaving(false)
      })
  }

  return (
    <FieldsTable>
      <FieldsTable.Item className={'!grid-cols-field-3.2'}>
        <FieldsTable.Item.Key>
          {btnClicked && (
            <div className={'flex flex-col gap-1'}>
              <label htmlFor="add_cf_key" className={'font-bold'}>
                Key (Unique)
              </label>
              <input
                className={clsx(
                  'block w-full min-w-[50px] rounded-lg border border-gray-200 bg-white px-[calc(theme(spacing.3)-1px)] py-[calc(theme(spacing.2)-1px)] text-gray-900 placeholder:text-gray-400 focus:border-cyan-500 focus:outline-none focus:ring-cyan-500 sm:text-sm'
                )}
                value={newCustomFieldForm.key ?? ''}
                type={'text'}
                name="'add_cf_key'"
                onChange={handleInputChange('key')}
              />
            </div>
          )}
        </FieldsTable.Item.Key>
        <FieldsTable.Item.Value>
          <div className="flex flex-wrap items-center gap-2 pr-2">
            <div className="flex w-full flex-wrap items-center justify-between">
              {btnClicked && (
                <div className="flex items-center">
                  <p className={'font-bold'}>Add New Custom Field</p>
                </div>
              )}
              <div className="flex flex-wrap items-center gap-2 ">
                <button
                  type="button"
                  className={clsx('rounded border border-gray-400 p-1')}
                  onClick={handleBtnClick()}
                >
                  <span className="flex items-center gap-2">
                    {btnClicked ? (
                      <MinusIcon className="h-3 w-3" />
                    ) : (
                      <PlusIcon className="h-3 w-3" />
                    )}
                  </span>
                </button>
                {btnClicked && (
                  <button
                    type="button"
                    className={clsx('rounded border border-gray-200 bg-primary-400 p-1')}
                    onClick={handleSave}
                  >
                    <span className="flex items-center gap-2">
                      {saving ? (
                        <Loader size="h-3 w-3" fullScreen={false} />
                      ) : (
                        <CloudArrowUpIcon className="h-3 w-3" />
                      )}
                    </span>
                  </button>
                )}
              </div>
            </div>

            {btnClicked && (
              <>
                <div className="flex grow flex-wrap items-center">
                  <label htmlFor="add_cf_label" className={'w-3/12 text-xs font-bold'}>
                    Label:
                  </label>
                  <input
                    name="add_cf_label"
                    className={clsx(
                      'block w-9/12 min-w-[50px] rounded-lg border border-gray-200 bg-white px-[calc(theme(spacing.3)-1px)] py-[calc(theme(spacing.2)-1px)] text-gray-900 placeholder:text-gray-400 focus:border-cyan-500 focus:outline-none focus:ring-cyan-500 sm:text-sm'
                    )}
                    value={newCustomFieldForm.settings?.label ?? undefined}
                    type={'text'}
                    onChange={handleInputChange('label')}
                  />
                </div>
                <div className="flex grow flex-wrap items-center">
                  <label htmlFor="add_cf_type" className={'w-3/12 text-xs font-bold'}>
                    Type:
                  </label>
                  <select
                    name="add_cf_type"
                    className={clsx(
                      'block w-9/12  min-w-[50px] rounded-lg border border-gray-200 bg-white px-[calc(theme(spacing.3)-1px)] py-[calc(theme(spacing.2)-1px)] text-gray-900 placeholder:text-gray-400 focus:border-cyan-500 focus:outline-none focus:ring-cyan-500 sm:text-sm'
                    )}
                    value={newCustomFieldForm.type ?? undefined}
                    onChange={handleInputChange('type')}
                  >
                    {customFieldAvailableTypes.map((op) => (
                      <option key={op} value={op}>
                        {op}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex grow flex-wrap items-center">
                  <label htmlFor="add_cf_defaultValue" className={'w-3/12 text-xs font-bold'}>
                    Default Value:
                  </label>
                  <input
                    name="add_cf_defaultValue"
                    className={clsx(
                      'block w-9/12 min-w-[50px] rounded-lg border border-gray-200 bg-white px-[calc(theme(spacing.3)-1px)] py-[calc(theme(spacing.2)-1px)] text-gray-900 placeholder:text-gray-400 focus:border-cyan-500 focus:outline-none focus:ring-cyan-500 sm:text-sm'
                    )}
                    value={newCustomFieldForm.defaultValue ?? ''}
                    type={'text'}
                    onChange={handleInputChange('defaultValue')}
                  />
                </div>
              </>
            )}
          </div>
        </FieldsTable.Item.Value>
      </FieldsTable.Item>
    </FieldsTable>
  )
}
