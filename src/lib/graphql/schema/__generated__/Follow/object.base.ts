import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { builder } from '../../builder';
import {
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils';

export const FollowObject = definePrismaObject('Follow', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.field(FollowIdFieldObject),
    offer: t.relation('offer', FollowOfferFieldObject),
    offerId: t.field(FollowOfferIdFieldObject),
    candidate: t.relation('candidate', FollowCandidateFieldObject),
    candidateId: t.field(FollowCandidateIdFieldObject),
    talentPool: t.relation('talentPool', FollowTalentPoolFieldObject),
    talentPoolId: t.field(FollowTalentPoolIdFieldObject),
    teamMember: t.relation('teamMember', FollowTeamMemberFieldObject),
    teamMemberId: t.field(FollowTeamMemberIdFieldObject),
  }),
});

export const FollowIdFieldObject = defineFieldObject('Follow', {
  type: "ID",
  description: undefined,
  nullable: false,
  resolve: (parent) => String(parent.id),
});

export const FollowOfferFieldObject = defineRelationObject('Follow', 'offer', {
  description: undefined,
  nullable: true,
  args: undefined,
  query: undefined,
});

export const FollowOfferIdFieldObject = defineFieldObject('Follow', {
  type: "Int",
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.offerId,
});

export const FollowCandidateFieldObject = defineRelationObject('Follow', 'candidate', {
  description: undefined,
  nullable: true,
  args: undefined,
  query: undefined,
});

export const FollowCandidateIdFieldObject = defineFieldObject('Follow', {
  type: "Int",
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.candidateId,
});

export const FollowTalentPoolFieldObject = defineRelationObject('Follow', 'talentPool', {
  description: undefined,
  nullable: true,
  args: undefined,
  query: undefined,
});

export const FollowTalentPoolIdFieldObject = defineFieldObject('Follow', {
  type: "Int",
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.talentPoolId,
});

export const FollowTeamMemberFieldObject = defineRelationObject('Follow', 'teamMember', {
  description: undefined,
  nullable: false,
  args: undefined,
  query: undefined,
});

export const FollowTeamMemberIdFieldObject = defineFieldObject('Follow', {
  type: "Int",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.teamMemberId,
});
