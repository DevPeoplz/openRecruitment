import { gql } from '@apollo/client'

export const GET_COMPANY_BY_ID = gql`
  query GET_COMPANY_BY_ID($where: CompanyWhereUniqueInput!) {
    findUniqueCompany(where: $where) {
      name
      city
      country
      state
      phone
      address
    }
  }
`
