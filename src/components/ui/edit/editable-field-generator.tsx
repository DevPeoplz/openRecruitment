import { FieldsTable } from '@/components/ui/fields-table'
import { EditableField } from '@/components/ui/edit/editable-field'
import { FieldRenderer } from '@/components/ui/edit/field-renderer'
import React, { ForwardRefExoticComponent } from 'react'
import { IconType } from 'react-icons'
import { ComboboxWithTagsProps } from '@/components/ui/combobox-with-tags'
import { parseGQLData } from '@/components/utils/data-parsing'
import { PlusIcon } from '@heroicons/react/24/outline'

export type EditableFieldsValidTypes = {
  string: string
  number: number
  boolean: boolean
  stringArray: string[]
  numberArray: number[]
  booleanArray: boolean[]
  selectOptions: ComboboxWithTagsProps['options']
}

export type EditableFieldItemType = {
  key: string
  value: EditableFieldsValidTypes[keyof EditableFieldsValidTypes] | null | undefined
  icon?: ForwardRefExoticComponent<any> | IconType
  title: string
  type: keyof EditableFieldsValidTypes
  inputType: string
  fieldType?: string
  settings?: {
    attribute?: string
    placeholder?: string
    options?: {
      label: string
      value: string
    }[]
  }
}

export type EditableFieldFixOnSaveType<T> = (
  value: T | null | undefined
) => Promise<T | null | undefined>

export type EditableFieldHandleOnUpdateType = (
  typeName: keyof EditableFieldsValidTypes,
  field: string
) => (
  value: EditableFieldsValidTypes[typeof typeName] | null | undefined
) => Promise<EditableFieldsValidTypes[typeof typeName] | null | undefined>

export const generateFieldItemComponent = (
  field: EditableFieldItemType,
  handleOnUpdate: EditableFieldHandleOnUpdateType
) => {
  const Icon = field.icon ?? null
  return (
    <FieldsTable.Item key={field.key}>
      <FieldsTable.Item.Icon>{Icon ? <Icon className={'h-5 w-5'} /> : null}</FieldsTable.Item.Icon>
      <FieldsTable.Item.Key>
        <p>{field.title}</p>
      </FieldsTable.Item.Key>
      <FieldsTable.Item.Value>
        <EditableField<EditableFieldsValidTypes[typeof field.type]>
          type={field.inputType}
          value={field.value}
          onSave={handleOnUpdate(field.type, field.key)}
          {...(field.settings ? { settings: field.settings } : {})}
        >
          <FieldRenderer
            type={field.fieldType ?? field.inputType}
            value={field.value}
            {...(field.settings ? { settings: field.settings } : {})}
          />
        </EditableField>
      </FieldsTable.Item.Value>
    </FieldsTable.Item>
  )
}

export const generateFullEditableCandidateTags = (
  field: 'tags' | 'source',
  data: {
    id: string
    name: string
  }[],
  handleOnUpdate: EditableFieldHandleOnUpdateType
) => {
  return (
    <EditableField<EditableFieldsValidTypes['selectOptions']>
      type="candidateTags"
      value={parseGQLData(data)}
      onSave={
        handleOnUpdate('selectOptions', field) as EditableFieldFixOnSaveType<
          EditableFieldsValidTypes['selectOptions']
        >
      }
      editVisible={true}
      settings={{
        attribute: field === 'tags' ? 'tags' : 'sources',
        placeholder: `Select a ${field === 'tags' ? 'tag' : 'source'}...`,
      }}
      className={'z-30'}
    >
      <EditableField.Icon>
        <PlusIcon className="h-5 w-5 rounded-sm border" />
      </EditableField.Icon>
      <FieldRenderer<EditableFieldsValidTypes['stringArray']>
        type={'stringArray'}
        value={data?.map((tag) => tag?.name) ?? []}
      />
    </EditableField>
  )
}
