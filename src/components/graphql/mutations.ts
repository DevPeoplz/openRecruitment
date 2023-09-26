import { gql } from "@apollo/client";

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