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

export const UPDATE_CANDIDATE_MUTATION = gql`
  mutation UpdateOneCandidate($data: CandidateUpdateInput!, $where: CandidateWhereUniqueInput!) {
    updateOneCandidate(data: $data, where: $where) {
      id
      firstName
      lastName
      name
      email
      phone
      tags: candidateTags {
        tag {
          id
          name
        }
      }
      source: referrer {
        id
        name
      }
      avatar {
        path
        filename
      }
      coverLetter {
        path
        filename
      }
      coverLetterText
      cv {
        path
        filename
      }
      birthday
      skills
      mainLanguage
      languages
      educationLevel
      salaryExpectation
      socials
      links
      createdAt
    }
  }
`
