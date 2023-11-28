import { gql } from '@apollo/client'

export const GET_HUB_EVENTS = gql`
  query GET_HUB_EVENTS {
    findManyEvent(orderBy: { date: desc }) {
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

export const GET_CANDIDATES = gql`
  query GET_CANDIDATES($where: CandidateWhereInput!) {
    findManyCandidate(where: $where, orderBy: { firstName: asc }) {
      value: id
      label: name
    }
  }
`

export const GET_HIRING_ROLES = gql`
  query GET_HIRING_ROLES($where: HiringRoleWhereInput) {
    findManyHiringRole(where: $where) {
      user {
        firstName
        lastName
        id
      }
    }
  }
`
