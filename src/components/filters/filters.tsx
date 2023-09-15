import React, { ReactElement, ReactNode, useMemo, useReducer, useState } from 'react'
import CheckboxFilter, { CheckboxFilterProps } from '@/components/table/filters/checkbox-filter'
import SelectFilter, { SelectFilterProps } from '@/components/table/filters/select-filter'
import { Table } from '@tanstack/react-table'
import { DefaultColumnsExtendedProps, TableStatesType } from '@/components/table/hub-table'

export interface ComponentDefType {
  [key: string]: {
    type: string
    props: { label: string; options: Record<string, any>[] } & (
      | checkboxFilterType
      | selectFilterType
    )
  }
}

interface checkboxFilterType {
  stateKey: string
  show: boolean
  options: { label: string; value: string; count: number; checked: boolean }[]
}

interface selectFilterType {
  show: boolean
  placeholder: string
  options: {
    label: string
    value: string
    count: number
    selected: boolean
  }[]
}

const filtersComponents: Record<string, React.FC<any>> = {
  checkbox: CheckboxFilter,
  select: SelectFilter,
}

export interface FilterProps {
  key: string
  columnKey: string
  table: Table<any>
}

export const Filters: React.FC<{
  table: Table<any>
  tableStates: TableStatesType
  defaultColumns: DefaultColumnsExtendedProps<any>
}> = ({ table, tableStates, defaultColumns }) => {
  return (
    <>
      {defaultColumns.map((column) => {
        if (!column.filterComponent) return null

        const filterComponent = column.filterComponent
        const Component = filtersComponents[filterComponent]
        const settings: Record<string, any> = {}

        switch (filterComponent) {
          case 'checkbox':
            settings.label = column.header ?? column.id
            settings.options = column.defaultCheckboxOptions ?? []
            break
          case 'select':
            settings.label = column.header ?? column.id
            settings.placeholder = `Select a ${column.header ?? column.id}`
            break
        }

        /*!!tableStates.filtersVisibility[column.id] &&*/
        return (
          Component && (
            <Component
              key={`filter ${column.id}`}
              columnKey={column.id}
              table={table}
              {...settings}
            />
          )
        )
      })}
    </>
  )
}
