import { gql } from '@apollo/client'

export const ADD_EVENT_MUTATION = gql`
  mutation ADD_EVENT_MUTATION($data: EventCreateInputExtended!) {
    createOneEvent(data: $data) {
      id
      date
      duration
      type
      location
      candidates {
        firstName
        lastName
        name
        id
      }
      note
      privateNote
      interviewers {
        user {
          name
          id
        }
      }
    }
  }
`

export const DELETE_EVENT_MUTATION = gql`
  mutation DELETE_EVENT($where: EventWhereUniqueInput!) {
    deleteOneEvent(where: $where) {
      id
    }
  }
`
