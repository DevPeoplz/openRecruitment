import { useRouter } from 'next/router'
import { useCallback, useReducer } from 'react'
import { DocumentNode, OperationVariables, useQuery } from '@apollo/client'
import { ParsedUrlQuery } from 'querystring'

export type FiltersProps = Record<string, string | string[] | number | number[]>

interface Action {
  type: string
  key: string
  value?: string | string[] | number | number[] | undefined
}

export const useFilterQueryParams = (
  filterDef: any,
  gqlQuery: DocumentNode,
  getVariables: (x: FiltersProps) => OperationVariables
) => {
  const router = useRouter()
  const { query } = router

  const filtersReducer = useCallback(
    (state: FiltersProps, action: Action) => {
      let updatedState: FiltersProps = {}
      let updatedQuery: Record<string, string | string[] | undefined> = {}

      switch (action.type) {
        case 'update': {
          const { key, value } = action

          const filteredQuery: ParsedUrlQuery = {}

          for (const queryKey in query) {
            if (queryKey in filterDef) {
              filteredQuery[queryKey] = query[queryKey]
            }
          }

          if (!key) return state

          if (value === undefined || value === '') {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { [key]: _S, ...restState } = state
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { [key]: _Q, ...restQuery } = filteredQuery
            updatedQuery = restQuery
            updatedState = restState
          } else {
            if (key in filterDef) {
              updatedState = { ...state, [key]: value }
              updatedQuery = {
                ...filteredQuery,
                [key]: Array.isArray(value) ? value.map((e) => e.toString()) : value.toString(),
              }
            } else {
              updatedState = state
              updatedQuery = filteredQuery
            }
          }

          router
            .replace({
              query: updatedQuery,
            })
            .then()
          return updatedState
        }
        default:
          return state
      }
    },
    [filterDef, query, router]
  )

  const syncStateWithQueryParams = useCallback(
    (query: ParsedUrlQuery) => {
      const updatedState: FiltersProps = {}

      Object.keys(filterDef).forEach((key) => {
        const value = query[key]
        if (value !== undefined && value !== '') {
          const type = filterDef[key]['type'] ?? 'string'
          let parsedValue

          if (type) {
            switch (type) {
              case 'int':
                parsedValue = Array.isArray(value)
                  ? value.map((e) => parseInt(e as string))
                  : parseInt(value as string)
                break
            }
          }

          updatedState[key] = parsedValue ?? value
        }
      })

      return updatedState
    },
    [filterDef]
  )

  const [filtersState, dispatchFiltersState] = useReducer(
    filtersReducer,
    syncStateWithQueryParams(query)
  )

  const { data, loading } = useQuery(gqlQuery, {
    variables: getVariables(filtersState),
  })

  return { filtersState, dispatchFiltersState, data, loading }
}
