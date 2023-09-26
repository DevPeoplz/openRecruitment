import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { builder } from '../../builder';
import {
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils';

export const MembershipObject = definePrismaObject('Membership', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.field(MembershipIdFieldObject),
    type: t.field(MembershipTypeFieldObject),
    teamMember: t.relation('teamMember', MembershipTeamMemberFieldObject),
    teamMemberId: t.field(MembershipTeamMemberIdFieldObject),
    role: t.relation('role', MembershipRoleFieldObject),
    roleId: t.field(MembershipRoleIdFieldObject),
    offer: t.relation('offer', MembershipOfferFieldObject),
    offerId: t.field(MembershipOfferIdFieldObject),
  }),
});

export const MembershipIdFieldObject = defineFieldObject('Membership', {
  type: "ID",
  description: undefined,
  nullable: false,
  resolve: (parent) => String(parent.id),
});

export const MembershipTypeFieldObject = defineFieldObject('Membership', {
  type: Inputs.MembershipTypes,
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.type,
});

export const MembershipTeamMemberFieldObject = defineRelationObject('Membership', 'teamMember', {
  description: undefined,
  nullable: true,
  args: undefined,
  query: undefined,
});

export const MembershipTeamMemberIdFieldObject = defineFieldObject('Membership', {
  type: "Int",
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.teamMemberId,
});

export const MembershipRoleFieldObject = defineRelationObject('Membership', 'role', {
  description: undefined,
  nullable: true,
  args: undefined,
  query: undefined,
});

export const MembershipRoleIdFieldObject = defineFieldObject('Membership', {
  type: "Int",
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.roleId,
});

export const MembershipOfferFieldObject = defineRelationObject('Membership', 'offer', {
  description: undefined,
  nullable: false,
  args: undefined,
  query: undefined,
});

export const MembershipOfferIdFieldObject = defineFieldObject('Membership', {
  type: "Int",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.offerId,
});
