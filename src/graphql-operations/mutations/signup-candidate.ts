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
  mutation UPDATE_CANDIDATE_MUTATION(
    $data: CandidateUpdateInput!
    $where: CandidateWhereUniqueInput!
    $cfs_visibility: CandidateCustomFieldWhereInput
  ) {
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
      candidateCustomFields(where: $cfs_visibility) {
        customField {
          key
        }
        value
      }
    }
  }
`
export const ADD_CUSTOM_FIELD_MUTATION = gql`
  mutation ADD_CUSTOM_FIELD_MUTATION($data: CustomFieldCreateInputExtended!) {
    customField: createOneCustomField(data: $data) {
      id
      companyId
      key
      defaultValue
      settings
      type
    }
  }
`

export const UPSERT_CANDIDATE_CUSTOM_FIELDS_MUTATION = gql`
  mutation UPSERT_CANDIDATE_CUSTOM_FIELDS_MUTATION(
    $data: CandidateUpdateInput!
    $where: CandidateWhereUniqueInput!
    $cfs_visibility: CandidateCustomFieldWhereInput
  ) {
    candidateCFs: updateOneCandidate(data: $data, where: $where) {
      id
      candidateCustomFields(where: $cfs_visibility) {
        customField {
          id
          key
        }
        value
      }
    }
  }
`

export const upsert_one_candidate_custom_fields_variables = (
  candidateId: string | number | null | undefined,
  customFieldId: string | number | null | undefined,
  value: string | null,
  customFieldsVisibility?: string[] | null
) => {
  const cId = parseInt(String(candidateId))
  const cfId = parseInt(String(customFieldId))

  return {
    where: {
      id: cId,
    },
    data: {
      candidateCustomFields: {
        upsert: [
          {
            update: {
              value: {
                set: value,
              },
            },
            create: {
              customField: {
                connect: {
                  id: cfId,
                },
              },
              value: value,
            },
            where: {
              customFieldId: {
                equals: cfId,
              },
            },
          },
        ],
      },
    },
    cfs_visibility: {
      customField: {
        key: {
          in:
            customFieldsVisibility && customFieldsVisibility.length > 0
              ? customFieldsVisibility
              : [],
        },
      },
    },
  }
}

export const UPDATE_CANDIDATE_BY_ID_JOBS_TALENT_POOLS = gql`
  mutation UPDATE_CANDIDATE_BY_ID_JOBS_TALENT_POOLS(
    $data: CandidateUpdateInput!
    $where: CandidateWhereUniqueInput!
  ) {
    candidateJobTalents: updateOneCandidate(data: $data, where: $where) {
      id
      offers(orderBy: { offer: { createdAt: desc } }) {
        id
        job: offer {
          id
          name
          pipelineTemplate {
            id
            stages(orderBy: { position: asc }) {
              id
              category
              position
            }
          }
        }
        currentStage: stage {
          id
          category
          position
        }
      }
      talentPools {
        id
        talentPool {
          id
          name
        }
      }
    }
  }
`

export const UPDATE_CANDIDATE_BY_ID_QUICK_EVALUATION = gql`
  mutation UPDATE_CANDIDATE_BY_ID_QUICK_EVALUATION(
    $data: CandidateUpdateInput!
    $where: CandidateWhereUniqueInput!
  ) {
    candidateQuickEvaluation: updateOneCandidate(data: $data, where: $where) {
      id
      evaluations {
        id
        isQuickEval
        description
        score
        teamMember {
          user {
            name
          }
        }
      }
    }
  }
`
export const ADD_JOB_MUTATION = gql`
  mutation ADD_JOB_MUTATION($data: OfferCreateInputExtended!) {
    job: createOneOffer(data: $data) {
      id
      name
      pipelineTemplate {
        id
        stages(orderBy: { position: asc }) {
          id
          category
          position
        }
      }
    }
  }
`
export const ADD_TALENT_POOL_MUTATION = gql`
  mutation ADD_TALENT_POOL_MUTATION($data: TalentPoolCreateInputExtended!) {
    talentPool: createOneTalentPool(data: $data) {
      id
      name
    }
  }
`

export const DELETE_CANDIDATE_BY_ID = gql`
  mutation DELETE_CANDIDATE_BY_ID($where: CandidateWhereUniqueInput!) {
    candidate: deleteOneCandidate(where: $where) {
      id
      name
    }
  }
`
export const DELETE_JOB_BY_ID = gql`
  mutation DELETE_JOB_BY_ID($where: OfferWhereUniqueInput!) {
    job: deleteOneOffer(where: $where) {
      id
      name
    }
  }
`
export const DELETE_TALENT_POOL_BY_ID = gql`
  mutation DELETE_TALENT_POOL_BY_ID($where: TalentPoolWhereUniqueInput!) {
    talentPool: deleteOneTalentPool(where: $where) {
      id
      name
    }
  }
`
export const DELETE_EVENT_BY_ID = gql`
  mutation DELETE_EVENT_BY_ID($where: EventWhereUniqueInput!) {
    event: deleteOneEvent(where: $where) {
      id
      name
    }
  }
`
export const DELETE_EVALUATION_BY_ID = gql`
  mutation DELETE_EVALUATION_BY_ID($where: EvaluationWhereUniqueInput!) {
    event: deleteOneEvaluation(where: $where) {
      id
    }
  }
`
