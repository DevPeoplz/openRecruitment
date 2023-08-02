import * as Inputs from '@/graphql/schema/__generated__/inputs'
import {
  defineExposeObject,
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils'

export const StageVisibilityObject = definePrismaObject('StageVisibility', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.exposeID('id', StageVisibilityIdFieldObject),
    type: t.field(StageVisibilityTypeFieldObject),
    teamMember: t.relation('teamMember', StageVisibilityTeamMemberFieldObject),
    teamMemberId: t.exposeInt(
      'teamMemberId',
      StageVisibilityTeamMemberIdFieldObject
    ),
    role: t.relation('role', StageVisibilityRoleFieldObject),
    roleId: t.exposeInt('roleId', StageVisibilityRoleIdFieldObject),
    stage: t.relation('stage', StageVisibilityStageFieldObject),
    stageId: t.exposeInt('stageId', StageVisibilityStageIdFieldObject),
  }),
})

export const StageVisibilityIdFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: false,
})

export const StageVisibilityTypeFieldObject = defineFieldObject(
  'StageVisibility',
  {
    type: Inputs.MembershipTypes,
    description: undefined,
    nullable: false,
    resolve: (parent) => parent.type,
  }
)

export const StageVisibilityTeamMemberFieldObject = defineRelationObject(
  'StageVisibility',
  'teamMember',
  {
    description: undefined,
    nullable: true,
    args: undefined,
    query: undefined,
  }
)

export const StageVisibilityTeamMemberIdFieldObject = defineExposeObject(
  'Int',
  {
    description: undefined,
    nullable: true,
  }
)

export const StageVisibilityRoleFieldObject = defineRelationObject(
  'StageVisibility',
  'role',
  {
    description: undefined,
    nullable: true,
    args: undefined,
    query: undefined,
  }
)

export const StageVisibilityRoleIdFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: true,
})

export const StageVisibilityStageFieldObject = defineRelationObject(
  'StageVisibility',
  'stage',
  {
    description: undefined,
    nullable: false,
    args: undefined,
    query: undefined,
  }
)

export const StageVisibilityStageIdFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: false,
})
