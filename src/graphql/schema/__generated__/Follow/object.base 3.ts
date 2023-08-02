import * as Inputs from '@/graphql/schema/__generated__/inputs'
import {
  defineExposeObject,
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils'

export const FollowObject = definePrismaObject('Follow', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.exposeID('id', FollowIdFieldObject),
    offer: t.relation('offer', FollowOfferFieldObject),
    offerId: t.exposeInt('offerId', FollowOfferIdFieldObject),
    candidate: t.relation('candidate', FollowCandidateFieldObject),
    candidateId: t.exposeInt('candidateId', FollowCandidateIdFieldObject),
    talentPool: t.relation('talentPool', FollowTalentPoolFieldObject),
    talentPoolId: t.exposeInt('talentPoolId', FollowTalentPoolIdFieldObject),
    teamMember: t.relation('teamMember', FollowTeamMemberFieldObject),
    teamMemberId: t.exposeInt('teamMemberId', FollowTeamMemberIdFieldObject),
  }),
})

export const FollowIdFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: false,
})

export const FollowOfferFieldObject = defineRelationObject('Follow', 'offer', {
  description: undefined,
  nullable: true,
  args: undefined,
  query: undefined,
})

export const FollowOfferIdFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: true,
})

export const FollowCandidateFieldObject = defineRelationObject(
  'Follow',
  'candidate',
  {
    description: undefined,
    nullable: true,
    args: undefined,
    query: undefined,
  }
)

export const FollowCandidateIdFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: true,
})

export const FollowTalentPoolFieldObject = defineRelationObject(
  'Follow',
  'talentPool',
  {
    description: undefined,
    nullable: true,
    args: undefined,
    query: undefined,
  }
)

export const FollowTalentPoolIdFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: true,
})

export const FollowTeamMemberFieldObject = defineRelationObject(
  'Follow',
  'teamMember',
  {
    description: undefined,
    nullable: false,
    args: undefined,
    query: undefined,
  }
)

export const FollowTeamMemberIdFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: false,
})
