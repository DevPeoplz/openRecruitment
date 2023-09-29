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
  mutation createUserAndCompany($input: UserSignUpInput!) {
    signUpUser(data: $input) {
      id
      email
      companies {
        id
      }
    }
  }
`
