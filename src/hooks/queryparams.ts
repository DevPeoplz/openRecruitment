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
  filtersDef: any,
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
            if (queryKey in filtersDef) {
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
            if (key in filtersDef) {
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
    [filtersDef, query, router]
  )

  const syncStateWithQueryParams = useCallback(
    (query: ParsedUrlQuery) => {
      const updatedState: FiltersProps = {}

      Object.keys(filtersDef).forEach((key) => {
        const value = query[key]
        if (value !== undefined && value !== '') {
          const type = filtersDef[key]['type'] ?? 'string'
          let parsedValue

          if (type) {
            switch (type) {
              case 'int':
                parsedValue = Array.isArray(value)
                  ? value.map((e) => parseInt(e as string))
                  : parseInt(value as string)
                break
              case 'float':
                parsedValue = Array.isArray(value)
                  ? value.map((e) => parseFloat(e as string))
                  : parseFloat(value as string)
            }
          }

          updatedState[key] = parsedValue ?? value
        }
      })

      return updatedState
    },
    [filtersDef]
  )

  const [filters, dispatchFilters] = useReducer(filtersReducer, syncStateWithQueryParams(query))

  const { data, loading } = useQuery(gqlQuery, {
    variables: getVariables(filters),
  })

  return { filters, dispatchFilters, data, loading }
}
