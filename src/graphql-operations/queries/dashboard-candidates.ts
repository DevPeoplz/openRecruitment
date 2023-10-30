import { gql, OperationVariables } from '@apollo/client'
import { subDays } from 'date-fns'

export const GET_ME_DATA_AND_COMPANIES = gql`
  query GET_ME_DATA_AND_COMPANIES {
    me {
      hiringRoles {
        company {
          name
          logo {
            path
          }
        }
        id
      }
      email
    }
  }
`

export const GET_ME_COMPANIES = gql`
  query GET_ME_COMPANIES {
    me {
      hiringRoles {
        company {
          id
          name
          logo {
            path
          }
        }
      }
    }
  }
`

export const GET_DASHBOARD_COUNTS = gql`
  query GET_DASHBOARD_COUNTS {
    countCandidate
    countOffer
    countTalentPool
  }
`

export const GET_TAGSOURCES = gql`
  query GET_TAGSOURCES(
    $where: TagSourceWhereInput
    $where2: TagSourceWhereInput
    $take: Int
    $orderBy: [TagSourceOrderByWithRelationInput!]
    $orderBy2: [TagSourceOrderByWithRelationInput!]
    $distinct: [CandidateTagScalarFieldEnum!]
  ) {
    tags: findManyTagSource(where: $where, take: $take, orderBy: $orderBy) {
      id
      name
      count: candidateTags(distinct: $distinct) {
        candidateId
      }
    }
    sources: findManyTagSource(where: $where2, take: $take, orderBy: $orderBy2) {
      id
      name
      count: candidateReferrer {
        createdAt
      }
    }
  }
`

export const get_tagSources_variables = (take = 5, order = 'desc') => {
  return {
    where: {
      type: {
        equals: 'TAG_CANDIDATE',
      },
    },
    where2: {
      type: {
        equals: 'SOURCE',
      },
    },
    take: take,
    orderBy: [
      {
        candidateTags: {
          _count: order,
        },
      },
    ],
    orderBy2: [
      {
        candidateReferrer: {
          _count: order,
        },
      },
    ],
    distinct: 'candidateId',
  }
}

export const GET_CANDIDATES_CREATED_AT_BY_DATE = gql`
  query GET_CANDIDATES_CREATED_AT_BY_DATE($where: CandidateWhereInput) {
    findManyCandidate(where: $where) {
      createdAt
      referrer {
        name
      }
    }
  }
`

export const get_candidates_created_at_by_date_variables = (
  initialDate: Date = subDays(new Date(), 30),
  finalDate?: Date
) => {
  return {
    where: {
      createdAt: {
        ...(initialDate ? { gte: initialDate } : {}),
        ...(finalDate ? { lte: finalDate } : {}),
      },
    },
  }
}

export const GET_RECENTLY_WORK_ON = gql`
  query GET_RECENTLY_WORK_ON($where: AuditLogWhereInput) {
    findManyAuditLog(where: $where) {
      eventDetails
    }
  }
`

export const get_recently_work_on_variables = (userEmail?: string | null) => {
  return {
    where: {
      actorType: {
        equals: 'user',
      },
      user: {
        user: {
          email: {
            equals: userEmail,
          },
        },
      },
    },
  }
}

export const GET_HUB_CANDIDATES = gql`
  query GET_HUB_CANDIDATES($where: CandidateWhereInput) {
    findManyCandidate(where: $where, orderBy: { createdAt: desc }) {
      id: id
      name: name
      averageScore: averageScore
      jobFitScore
      job: offers {
        id
        stage {
          id
          category
        }
        offer {
          id
          name
        }
      }
      dateCreated: createdAt
      source: name
      tag: name
      talentPool: talentPools {
        talentPool {
          id
          name
        }
      }
      disqualifiedBy: name
      disqualifyDate: name
      integrations: name
      lastActivity: name
      hireDate: createdAt
      startDate: name
      autoFitEnabled: name
      status: lastName
    }
  }
`

export const get_hub_candidates_variables = (variables: OperationVariables) => {
  return { where: {} }
}

export const GET_CANDIDATE_BY_ID = gql`
  query GET_CANDIDATE_BY_ID($where: CandidateWhereUniqueInput!) {
    findUniqueCandidate(where: $where) {
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

export const get_candidate_by_id_variables = (id?: number | string) => {
  return {
    where: {
      id: id,
    },
  }
}

export const GET_ADD_CANDIDATE_DROPDOWNS = gql`
  query GET_ADD_CANDIDATE_DROPDOWNS {
    tags: findManyTagSource(where: { type: { equals: TAG_CANDIDATE } }) {
      id
      name
      type
    }
    sources: findManyTagSource(where: { type: { equals: SOURCE } }) {
      id
      name
      type
    }
    jobs: findManyOffer {
      id
      name
      firstStage: pipelineTemplate {
        id
        stages(orderBy: { position: asc }, take: 1) {
          id
          category
          position
        }
      }
    }
    talentPools: findManyTalentPool {
      id
      name
    }
  }
`

export const GET_HUB_JOBS = gql`
  query GET_HUB_JOBS {
    findManyOffer(orderBy: { createdAt: desc }) {
      id: id
      name: name
      candidates: matches {
        candidate {
          id
          name
        }
        isHired
      }
      department: department {
        id
        name
      }
      location: locationCity
      region: locationCountry
      scheduledPublish: createdAt
      scheduledClose: createdAt
      tags: offerTags {
        tag {
          id
          name
        }
      }
    }
  }
`

export const GET_HUB_POOLS = gql`
  query GET_HUB_POOLS {
    findManyTalentPool(orderBy: { createdAt: desc }) {
      id: id
      name: name
      candidates: matches {
        candidate {
          id
          name
        }
      }
      createdAt: createdAt
    }
  }
`

export const GET_CANDIDATE_BY_ID_FILES = gql`
  query GET_CANDIDATE_BY_ID_FILES($where: CandidateWhereUniqueInput!) {
    findUniqueCandidate(where: $where) {
      id
      email
      avatar {
        path
        filename
      }
      coverLetter {
        path
        filename
      }
      cv {
        path
        filename
      }
    }
  }
`

export const GET_CANDIDATE_BY_ID_JOBS_TALENT_POOLS = gql`
  query GET_CANDIDATE_BY_ID_JOBS_TALENT_POOLS($where: CandidateWhereUniqueInput!) {
    findUniqueCandidate(where: $where) {
      id
      candidateJobs: offers(orderBy: { offer: { createdAt: desc } }) {
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

export const GET_AVAILABLE_CUSTOM_FIELDS = gql`
  query GET_AVAILABLE_CUSTOM_FIELDS {
    customFields: findManyCustomField {
      id
      companyId
      key
      defaultValue
      settings
      type
    }
  }
`
export const GET_CANDIDATE_BY_ID_VISIBLE_CUSTOM_FIELDS = gql`
  query GET_CANDIDATE_BY_ID_VISIBLE_CUSTOM_FIELDS(
    $where: CandidateWhereUniqueInput!
    $cfs_visibility: CandidateCustomFieldWhereInput
  ) {
    candidateCFs: findUniqueCandidate(where: $where) {
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

export const get_candidate_by_id_visible_custom_fields_variables = (
  candidateId: string | number | null | undefined,
  customFieldsVisibility?: string[] | null
) => {
  const cId = parseInt(String(candidateId))

  return {
    where: {
      id: cId,
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

export const GET_CANDIDATE_BY_ID_QUICK_EVALUATIONS = gql`
  query GET_CANDIDATE_BY_ID_QUICK_EVALUATIONS($where: CandidateWhereUniqueInput!) {
    candidateQuickEvaluations: findUniqueCandidate(where: $where) {
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
