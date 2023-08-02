import * as Inputs from '@/graphql/schema/__generated__/inputs'
import {
  defineExposeObject,
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils'

export const MembershipObject = definePrismaObject('Membership', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.exposeID('id', MembershipIdFieldObject),
    type: t.field(MembershipTypeFieldObject),
    teamMember: t.relation('teamMember', MembershipTeamMemberFieldObject),
    teamMemberId: t.exposeInt(
      'teamMemberId',
      MembershipTeamMemberIdFieldObject
    ),
    role: t.relation('role', MembershipRoleFieldObject),
    roleId: t.exposeInt('roleId', MembershipRoleIdFieldObject),
    offer: t.relation('offer', MembershipOfferFieldObject),
    offerId: t.exposeInt('offerId', MembershipOfferIdFieldObject),
  }),
})

export const MembershipIdFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: false,
})

export const MembershipTypeFieldObject = defineFieldObject('Membership', {
  type: Inputs.MembershipTypes,
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.type,
})

export const MembershipTeamMemberFieldObject = defineRelationObject(
  'Membership',
  'teamMember',
  {
    description: undefined,
    nullable: true,
    args: undefined,
    query: undefined,
  }
)

export const MembershipTeamMemberIdFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: true,
})

export const MembershipRoleFieldObject = defineRelationObject(
  'Membership',
  'role',
  {
    description: undefined,
    nullable: true,
    args: undefined,
    query: undefined,
  }
)

export const MembershipRoleIdFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: true,
})

export const MembershipOfferFieldObject = defineRelationObject(
  'Membership',
  'offer',
  {
    description: undefined,
    nullable: false,
    args: undefined,
    query: undefined,
  }
)

export const MembershipOfferIdFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: false,
})
