import * as Inputs from '@/graphql/schema/__generated__/inputs'
import {
  defineExposeObject,
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils'

export const MatchObject = definePrismaObject('Match', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.exposeID('id', MatchIdFieldObject),
    offer: t.relation('offer', MatchOfferFieldObject),
    offerId: t.exposeInt('offerId', MatchOfferIdFieldObject),
    candidate: t.relation('candidate', MatchCandidateFieldObject),
    candidateId: t.exposeInt('candidateId', MatchCandidateIdFieldObject),
    stage: t.relation('stage', MatchStageFieldObject),
    stageId: t.exposeInt('stageId', MatchStageIdFieldObject),
    isHired: t.exposeBoolean('isHired', MatchIsHiredFieldObject),
    disqualifyReason: t.relation(
      'disqualifyReason',
      MatchDisqualifyReasonFieldObject
    ),
    disqualifyReasonId: t.exposeInt(
      'disqualifyReasonId',
      MatchDisqualifyReasonIdFieldObject
    ),
  }),
})

export const MatchIdFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: false,
})

export const MatchOfferFieldObject = defineRelationObject('Match', 'offer', {
  description: undefined,
  nullable: false,
  args: undefined,
  query: undefined,
})

export const MatchOfferIdFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: false,
})

export const MatchCandidateFieldObject = defineRelationObject(
  'Match',
  'candidate',
  {
    description: undefined,
    nullable: false,
    args: undefined,
    query: undefined,
  }
)

export const MatchCandidateIdFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: false,
})

export const MatchStageFieldObject = defineRelationObject('Match', 'stage', {
  description: undefined,
  nullable: true,
  args: undefined,
  query: undefined,
})

export const MatchStageIdFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: true,
})

export const MatchIsHiredFieldObject = defineExposeObject('Boolean', {
  description: undefined,
  nullable: false,
})

export const MatchDisqualifyReasonFieldObject = defineRelationObject(
  'Match',
  'disqualifyReason',
  {
    description: undefined,
    nullable: true,
    args: undefined,
    query: undefined,
  }
)

export const MatchDisqualifyReasonIdFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: true,
})
