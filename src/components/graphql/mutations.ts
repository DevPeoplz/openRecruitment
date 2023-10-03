import { gql } from '@apollo/client'

export const SIGNUP_MUTATION = gql`
  mutation createUserAndCompany($data: UserSignUpInput!) {
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
  mutation CreateOneCandidate($data: CandidateCreateInputExtended!) {
    createOneCandidate(data: $data) {
      id
    }
  }
`
