import * as Inputs from '@/graphql/schema/__generated__/inputs'
import {
  defineExposeObject,
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils'

export const TalentPoolMatchObject = definePrismaObject('TalentPoolMatch', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.exposeID('id', TalentPoolMatchIdFieldObject),
    talentPool: t.relation('talentPool', TalentPoolMatchTalentPoolFieldObject),
    talentPoolId: t.exposeInt(
      'talentPoolId',
      TalentPoolMatchTalentPoolIdFieldObject
    ),
    candidate: t.relation('candidate', TalentPoolMatchCandidateFieldObject),
    candidateId: t.exposeInt(
      'candidateId',
      TalentPoolMatchCandidateIdFieldObject
    ),
  }),
})

export const TalentPoolMatchIdFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: false,
})

export const TalentPoolMatchTalentPoolFieldObject = defineRelationObject(
  'TalentPoolMatch',
  'talentPool',
  {
    description: undefined,
    nullable: false,
    args: undefined,
    query: undefined,
  }
)

export const TalentPoolMatchTalentPoolIdFieldObject = defineExposeObject(
  'Int',
  {
    description: undefined,
    nullable: false,
  }
)

export const TalentPoolMatchCandidateFieldObject = defineRelationObject(
  'TalentPoolMatch',
  'candidate',
  {
    description: undefined,
    nullable: false,
    args: undefined,
    query: undefined,
  }
)

export const TalentPoolMatchCandidateIdFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: false,
})
