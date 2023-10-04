import { gql } from '@apollo/client'

export const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION($data: UserSignUpInput!) {
    signUpUser(data: $data) {
      id
      email
      companies {
        id
      }
    }
  }
`

export const ADD_CANDIDATE_MUTATION = gql`
  mutation ADD_CANDIDATE_MUTATION($data: CandidateCreateInputExtended!) {
    createOneCandidate(data: $data) {
      id
    }
  }
`
