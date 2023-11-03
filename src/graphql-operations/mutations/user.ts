import { gql } from '@apollo/client'

export const UPDATE_USER_PASSWORD_MUTATION = gql`
  mutation UPDATE_USER_PASSWORD_MUTATION($data: UpdatePasswordInput!) {
    user: updatePasswordUser(data: $data) {
      id
      name
    }
  }
`
