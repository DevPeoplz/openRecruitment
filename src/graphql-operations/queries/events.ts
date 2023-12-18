import { gql } from '@apollo/client'

export const GET_HUB_EVENTS = gql`
  query GET_HUB_EVENTS {
    findManyEvent(orderBy: { date: asc }) {
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

export const GET_HIRING_ROLES_DROPDOWN = gql`
  query GET_HIRING_ROLES_DROPDOWN {
    findManyHiringRole {
      id
      user {
        id
        name
        firstName
        lastName
      }
    }
  }
`
