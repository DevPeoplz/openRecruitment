import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { builder } from '../../builder';
import {
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils';

export const TalentPoolMatchObject = definePrismaObject('TalentPoolMatch', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.field(TalentPoolMatchIdFieldObject),
    talentPool: t.relation('talentPool', TalentPoolMatchTalentPoolFieldObject),
    talentPoolId: t.field(TalentPoolMatchTalentPoolIdFieldObject),
    candidate: t.relation('candidate', TalentPoolMatchCandidateFieldObject),
    candidateId: t.field(TalentPoolMatchCandidateIdFieldObject),
  }),
});

export const TalentPoolMatchIdFieldObject = defineFieldObject('TalentPoolMatch', {
  type: "ID",
  description: undefined,
  nullable: false,
  resolve: (parent) => String(parent.id),
});

export const TalentPoolMatchTalentPoolFieldObject = defineRelationObject('TalentPoolMatch', 'talentPool', {
  description: undefined,
  nullable: false,
  args: undefined,
  query: undefined,
});

export const TalentPoolMatchTalentPoolIdFieldObject = defineFieldObject('TalentPoolMatch', {
  type: "Int",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.talentPoolId,
});

export const TalentPoolMatchCandidateFieldObject = defineRelationObject('TalentPoolMatch', 'candidate', {
  description: undefined,
  nullable: false,
  args: undefined,
  query: undefined,
});

export const TalentPoolMatchCandidateIdFieldObject = defineFieldObject('TalentPoolMatch', {
  type: "Int",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.candidateId,
});
