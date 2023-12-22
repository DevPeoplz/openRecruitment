import { gql } from '@apollo/client'

export const GET_JOB_BY_ID = gql`
  query GET_JOB_BY_ID($where: OfferWhereUniqueInput!) {
    findUniqueOffer(where: $where) {
      id
      name
      createdAt
      pipelineTemplate {
        id
        stages(orderBy: { position: asc }) {
          id
          category
          position
        }
      }
      matches {
        id
        stage {
          id
          category
          position
        }
        candidate {
          id
          firstName
          lastName
          avatar {
            path
          }
          averageScore
        }
      }
    }
  }
`
