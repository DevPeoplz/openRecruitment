import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { builder } from '../../builder';
import {
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils';

export const MatchObject = definePrismaObject('Match', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.field(MatchIdFieldObject),
    offer: t.relation('offer', MatchOfferFieldObject),
    offerId: t.field(MatchOfferIdFieldObject),
    candidate: t.relation('candidate', MatchCandidateFieldObject),
    candidateId: t.field(MatchCandidateIdFieldObject),
    stage: t.relation('stage', MatchStageFieldObject),
    stageId: t.field(MatchStageIdFieldObject),
    isHired: t.field(MatchIsHiredFieldObject),
    disqualifyReason: t.relation('disqualifyReason', MatchDisqualifyReasonFieldObject),
    disqualifyReasonId: t.field(MatchDisqualifyReasonIdFieldObject),
  }),
});

export const MatchIdFieldObject = defineFieldObject('Match', {
  type: "ID",
  description: undefined,
  nullable: false,
  resolve: (parent) => String(parent.id),
});

export const MatchOfferFieldObject = defineRelationObject('Match', 'offer', {
  description: undefined,
  nullable: false,
  args: undefined,
  query: undefined,
});

export const MatchOfferIdFieldObject = defineFieldObject('Match', {
  type: "Int",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.offerId,
});

export const MatchCandidateFieldObject = defineRelationObject('Match', 'candidate', {
  description: undefined,
  nullable: false,
  args: undefined,
  query: undefined,
});

export const MatchCandidateIdFieldObject = defineFieldObject('Match', {
  type: "Int",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.candidateId,
});

export const MatchStageFieldObject = defineRelationObject('Match', 'stage', {
  description: undefined,
  nullable: true,
  args: undefined,
  query: undefined,
});

export const MatchStageIdFieldObject = defineFieldObject('Match', {
  type: "Int",
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.stageId,
});

export const MatchIsHiredFieldObject = defineFieldObject('Match', {
  type: "Boolean",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.isHired,
});

export const MatchDisqualifyReasonFieldObject = defineRelationObject('Match', 'disqualifyReason', {
  description: undefined,
  nullable: true,
  args: undefined,
  query: undefined,
});

export const MatchDisqualifyReasonIdFieldObject = defineFieldObject('Match', {
  type: "Int",
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.disqualifyReasonId,
});
