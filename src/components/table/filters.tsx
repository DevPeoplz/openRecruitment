import React, { PropsWithChildren } from 'react'
import CheckboxFilter from '@/components/table/filters/checkbox-filter'
import SelectFilter from '@/components/table/filters/select-filter'
import { Table } from '@tanstack/react-table'
import { DefaultColumnsExtendedProps } from '@/components/table/hub-table'

const filtersComponents: Record<string, React.FC<any>> = {
  checkbox: CheckboxFilter,
  select: SelectFilter,
}

export interface FilterProps {
  key: string
  columnKey: string
  table: Table<never>
}

interface HubTableFiltersProps<T> {
  table: Table<T>
  defaultColumns: DefaultColumnsExtendedProps<T>
}

export const HubTableFilters: <T>(
  props: PropsWithChildren<HubTableFiltersProps<T>>
) => React.ReactElement<PropsWithChildren<HubTableFiltersProps<T>>> = ({
  table,
  defaultColumns,
}) => {
  return (
    <>
      {defaultColumns.map((column) => {
        if (!column.filterComponent) return null

        const filterComponent = column.filterComponent
        const Component = filtersComponents[filterComponent]
        const settings: Record<string, unknown> = {}

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
