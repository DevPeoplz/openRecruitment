import React, { ReactNode } from 'react'
import { getChildrenOnDisplayName } from '@/components/utils'
import clsx from 'clsx'
import { childrenRenderer } from '@/components/utils/basic'

type FieldsTableProps = {
  children?: ReactNode
  className?: string
}

type FieldsTableComponentsType = {
  Item: typeof FieldsTableItem
}

export const FieldsTable: React.FC<FieldsTableProps> & FieldsTableComponentsType = (
  props: FieldsTableProps
) => {
  const { children, className } = props
  const fieldsTableItems = getChildrenOnDisplayName(children, 'FieldsTable.Item')
  return (
    <div className={clsx('w-full divide-y divide-gray-200 border border-gray-200', className)}>
      {fieldsTableItems?.map((fieldItem) => {
        return fieldItem
      })}
    </div>
  )
}

type FieldsTableItemComponentsType = {
  Icon: typeof FieldsTableItemIcon
  Key: typeof FieldsTableItemKey
  Value: typeof FieldsTableItemValue
}

type FieldsTableItemProps = {
  children?: ReactNode
  className?: string
}

const FieldsTableItem: React.FC<FieldsTableItemProps> & FieldsTableItemComponentsType = (
  props: FieldsTableItemProps
) => {
  const { children, className } = props
  const icon = getChildrenOnDisplayName(children, 'FieldsTable.Item.Icon')
  const key = getChildrenOnDisplayName(children, 'FieldsTable.Item.Key')
  const value = getChildrenOnDisplayName(children, 'FieldsTable.Item.Value')

  return (
    <div className="flex h-12 items-center justify-center">
      <div className={'flex h-full w-1/12 flex-wrap items-center justify-center p-1'}>{icon}</div>
      <div className={'flex h-full w-3/12 flex-wrap items-center border-r p-1'}>{key}</div>
      <div className={'flex h-full w-8/12 flex-wrap items-center p-1 pl-5'}>{value}</div>
    </div>
  )
}

const FieldsTableItemIcon = childrenRenderer('FieldsTable.Item.Icon')
const FieldsTableItemKey = childrenRenderer('FieldsTable.Item.Key')
const FieldsTableItemValue = childrenRenderer('FieldsTable.Item.Value')

FieldsTableItem.Icon = FieldsTableItemIcon
FieldsTableItem.Key = FieldsTableItemKey
FieldsTableItem.Value = FieldsTableItemValue

FieldsTableItem.displayName = 'FieldsTable.Item'
FieldsTable.Item = FieldsTableItem
