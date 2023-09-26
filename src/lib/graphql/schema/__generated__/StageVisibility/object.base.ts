import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { builder } from '../../builder';
import {
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils';

export const StageVisibilityObject = definePrismaObject('StageVisibility', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.field(StageVisibilityIdFieldObject),
    type: t.field(StageVisibilityTypeFieldObject),
    teamMember: t.relation('teamMember', StageVisibilityTeamMemberFieldObject),
    teamMemberId: t.field(StageVisibilityTeamMemberIdFieldObject),
    role: t.relation('role', StageVisibilityRoleFieldObject),
    roleId: t.field(StageVisibilityRoleIdFieldObject),
    stage: t.relation('stage', StageVisibilityStageFieldObject),
    stageId: t.field(StageVisibilityStageIdFieldObject),
  }),
});

export const StageVisibilityIdFieldObject = defineFieldObject('StageVisibility', {
  type: "ID",
  description: undefined,
  nullable: false,
  resolve: (parent) => String(parent.id),
});

export const StageVisibilityTypeFieldObject = defineFieldObject('StageVisibility', {
  type: Inputs.MembershipTypes,
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.type,
});

export const StageVisibilityTeamMemberFieldObject = defineRelationObject('StageVisibility', 'teamMember', {
  description: undefined,
  nullable: true,
  args: undefined,
  query: undefined,
});

export const StageVisibilityTeamMemberIdFieldObject = defineFieldObject('StageVisibility', {
  type: "Int",
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.teamMemberId,
});

export const StageVisibilityRoleFieldObject = defineRelationObject('StageVisibility', 'role', {
  description: undefined,
  nullable: true,
  args: undefined,
  query: undefined,
});

export const StageVisibilityRoleIdFieldObject = defineFieldObject('StageVisibility', {
  type: "Int",
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.roleId,
});

export const StageVisibilityStageFieldObject = defineRelationObject('StageVisibility', 'stage', {
  description: undefined,
  nullable: false,
  args: undefined,
  query: undefined,
});

export const StageVisibilityStageIdFieldObject = defineFieldObject('StageVisibility', {
  type: "Int",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.stageId,
});
