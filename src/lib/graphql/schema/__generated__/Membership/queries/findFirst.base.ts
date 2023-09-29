import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findFirstMembershipQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.MembershipWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.MembershipOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.MembershipWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.MembershipScalarFieldEnum], required: false }),
}))

export const findFirstMembershipQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'Membership',
    nullable: true,
    args: findFirstMembershipQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.membership.findFirst({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        distinct: args.distinct || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
        ...query,
      }),
  }),
);

export const findFirstMembershipQuery = defineQuery((t) => ({
  findFirstMembership: t.prismaField(findFirstMembershipQueryObject(t)),
}));
