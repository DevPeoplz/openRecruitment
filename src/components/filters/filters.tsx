import React, { useReducer } from 'react'
import CheckboxFilter from '@/components/table/filters/checkbox-filter'
import SelectFilter from '@/components/table/filters/select-filter'

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

const componentsReducer = (
  state: ComponentDefType,
  action: {
    type: string
    component: string
    key: string
    value: string | number | boolean | undefined
    extra?: any
  }
) => {
  switch (action.type) {
    case 'updateCounts':
      return state
    case 'updateProps':
      return {
        ...state,
        [action.component]: {
          ...state[action.component],
          props: {
            ...state[action.component].props,
            [action.key]: action.value,
          },
        },
      }
    case 'updatePropsOptions': {
      const newState = state
      newState[action.component].props.options.map((option, index) => {
        if (action.extra.value && option.value === action.extra.value) {
          newState[action.component].props.options[index][action.key] = action.value
        }
      })

      return newState
    }
  }

  return state
}
export const Filters: React.FC<{ componentsDef: ComponentDefType; queryParams: [any, any] }> = ({
  componentsDef,
  queryParams,
}) => {
  const [componentsStatus, dispatchComponentsStatus] = useReducer(componentsReducer, componentsDef)

  return (
    <>
      {Object.entries(componentsStatus).map(([key, settings]) => {
        const Component = filtersComponents[settings.type]
        return (
          Component && (
            <Component
              key={key}
              componentKey={key}
              {...settings.props}
              filterQueryParams={queryParams}
              dispatchComponentsStatus={dispatchComponentsStatus}
            />
          )
        )
      })}
    </>
  )
}
