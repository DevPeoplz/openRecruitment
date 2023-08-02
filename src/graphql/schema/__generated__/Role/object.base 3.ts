import * as Inputs from '@/graphql/schema/__generated__/inputs'
import {
  defineExposeObject,
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils'

export const RoleObject = definePrismaObject('Role', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.exposeID('id', RoleIdFieldObject),
    name: t.exposeString('name', RoleNameFieldObject),
    abilities: t.exposeStringList('abilities', RoleAbilitiesFieldObject),
    company: t.relation('company', RoleCompanyFieldObject),
    companyId: t.exposeString('companyId', RoleCompanyIdFieldObject),
    hiringRoles: t.relation('hiringRoles', RoleHiringRolesFieldObject(t)),
    createdAt: t.field(RoleCreatedAtFieldObject),
    updatedAt: t.field(RoleUpdatedAtFieldObject),
    memberships: t.relation('memberships', RoleMembershipsFieldObject(t)),
    stageVisibility: t.relation(
      'stageVisibility',
      RoleStageVisibilityFieldObject(t)
    ),
  }),
})

export const RoleIdFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: false,
})

export const RoleNameFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: false,
})

export const RoleAbilitiesFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: false,
})

export const RoleCompanyFieldObject = defineRelationObject('Role', 'company', {
  description: undefined,
  nullable: false,
  args: undefined,
  query: undefined,
})

export const RoleCompanyIdFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: false,
})

export const RoleHiringRolesFieldObject = defineRelationFunction('Role', (t) =>
  defineRelationObject('Role', 'hiringRoles', {
    description: undefined,
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.HiringRoleWhereInput, required: false }),
      orderBy: t.arg({
        type: [Inputs.HiringRoleOrderByWithRelationInput],
        required: false,
      }),
      cursor: t.arg({
        type: Inputs.HiringRoleWhereUniqueInput,
        required: false,
      }),
      take: t.arg({ type: 'Int', required: false }),
      skip: t.arg({ type: 'Int', required: false }),
      distinct: t.arg({
        type: [Inputs.HiringRoleScalarFieldEnum],
        required: false,
      }),
    },
    query: (args) => ({
      where: args.where || undefined,
      cursor: args.cursor || undefined,
      take: args.take || undefined,
      distinct: args.distinct || undefined,
      skip: args.skip || undefined,
      orderBy: args.orderBy || undefined,
    }),
  })
)

export const RoleCreatedAtFieldObject = defineFieldObject('Role', {
  type: Inputs.DateTime,
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.createdAt,
})

export const RoleUpdatedAtFieldObject = defineFieldObject('Role', {
  type: Inputs.DateTime,
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.updatedAt,
})

export const RoleMembershipsFieldObject = defineRelationFunction('Role', (t) =>
  defineRelationObject('Role', 'memberships', {
    description: undefined,
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.MembershipWhereInput, required: false }),
      orderBy: t.arg({
        type: [Inputs.MembershipOrderByWithRelationInput],
        required: false,
      }),
      cursor: t.arg({
        type: Inputs.MembershipWhereUniqueInput,
        required: false,
      }),
      take: t.arg({ type: 'Int', required: false }),
      skip: t.arg({ type: 'Int', required: false }),
      distinct: t.arg({
        type: [Inputs.MembershipScalarFieldEnum],
        required: false,
      }),
    },
    query: (args) => ({
      where: args.where || undefined,
      cursor: args.cursor || undefined,
      take: args.take || undefined,
      distinct: args.distinct || undefined,
      skip: args.skip || undefined,
      orderBy: args.orderBy || undefined,
    }),
  })
)

export const RoleStageVisibilityFieldObject = defineRelationFunction(
  'Role',
  (t) =>
    defineRelationObject('Role', 'stageVisibility', {
      description: undefined,
      nullable: false,
      args: {
        where: t.arg({
          type: Inputs.StageVisibilityWhereInput,
          required: false,
        }),
        orderBy: t.arg({
          type: [Inputs.StageVisibilityOrderByWithRelationInput],
          required: false,
        }),
        cursor: t.arg({
          type: Inputs.StageVisibilityWhereUniqueInput,
          required: false,
        }),
        take: t.arg({ type: 'Int', required: false }),
        skip: t.arg({ type: 'Int', required: false }),
        distinct: t.arg({
          type: [Inputs.StageVisibilityScalarFieldEnum],
          required: false,
        }),
      },
      query: (args) => ({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        distinct: args.distinct || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
      }),
    })
)
