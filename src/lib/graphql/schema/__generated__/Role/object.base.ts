import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { builder } from '../../builder';
import {
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils';

export const RoleObject = definePrismaObject('Role', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.field(RoleIdFieldObject),
    name: t.field(RoleNameFieldObject),
    abilities: t.field(RoleAbilitiesFieldObject),
    company: t.relation('company', RoleCompanyFieldObject),
    companyId: t.field(RoleCompanyIdFieldObject),
    hiringRoles: t.relation('hiringRoles', RoleHiringRolesFieldObject(t)),
    createdAt: t.field(RoleCreatedAtFieldObject),
    updatedAt: t.field(RoleUpdatedAtFieldObject),
    memberships: t.relation('memberships', RoleMembershipsFieldObject(t)),
    stageVisibility: t.relation('stageVisibility', RoleStageVisibilityFieldObject(t)),
  }),
});

export const RoleIdFieldObject = defineFieldObject('Role', {
  type: "ID",
  description: undefined,
  nullable: false,
  resolve: (parent) => String(parent.id),
});

export const RoleNameFieldObject = defineFieldObject('Role', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.name,
});

export const RoleAbilitiesFieldObject = defineFieldObject('Role', {
  type: ["String"],
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.abilities,
});

export const RoleCompanyFieldObject = defineRelationObject('Role', 'company', {
  description: undefined,
  nullable: false,
  args: undefined,
  query: undefined,
});

export const RoleCompanyIdFieldObject = defineFieldObject('Role', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.companyId,
});

export const RoleHiringRolesFieldArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.HiringRoleWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.HiringRoleOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.HiringRoleWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.HiringRoleScalarFieldEnum], required: false }),
}))

export const RoleHiringRolesFieldObject = defineRelationFunction('Role', (t) =>
  defineRelationObject('Role', 'hiringRoles', {
    description: undefined,
    nullable: false,
    args: RoleHiringRolesFieldArgs,
    query: (args) => ({
      where: args.where || undefined,
      cursor: args.cursor || undefined,
      take: args.take || undefined,
      distinct: args.distinct || undefined,
      skip: args.skip || undefined,
      orderBy: args.orderBy || undefined,
    }),
  }),
);

export const RoleCreatedAtFieldObject = defineFieldObject('Role', {
  type: Inputs.DateTime,
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.createdAt,
});

export const RoleUpdatedAtFieldObject = defineFieldObject('Role', {
  type: Inputs.DateTime,
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.updatedAt,
});

export const RoleMembershipsFieldArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.MembershipWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.MembershipOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.MembershipWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.MembershipScalarFieldEnum], required: false }),
}))

export const RoleMembershipsFieldObject = defineRelationFunction('Role', (t) =>
  defineRelationObject('Role', 'memberships', {
    description: undefined,
    nullable: false,
    args: RoleMembershipsFieldArgs,
    query: (args) => ({
      where: args.where || undefined,
      cursor: args.cursor || undefined,
      take: args.take || undefined,
      distinct: args.distinct || undefined,
      skip: args.skip || undefined,
      orderBy: args.orderBy || undefined,
    }),
  }),
);

export const RoleStageVisibilityFieldArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.StageVisibilityWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.StageVisibilityOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.StageVisibilityWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.StageVisibilityScalarFieldEnum], required: false }),
}))

export const RoleStageVisibilityFieldObject = defineRelationFunction('Role', (t) =>
  defineRelationObject('Role', 'stageVisibility', {
    description: undefined,
    nullable: false,
    args: RoleStageVisibilityFieldArgs,
    query: (args) => ({
      where: args.where || undefined,
      cursor: args.cursor || undefined,
      take: args.take || undefined,
      distinct: args.distinct || undefined,
      skip: args.skip || undefined,
      orderBy: args.orderBy || undefined,
    }),
  }),
);
