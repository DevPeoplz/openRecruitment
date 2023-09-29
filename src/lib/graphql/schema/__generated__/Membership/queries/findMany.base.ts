import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findManyMembershipQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.MembershipWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.MembershipOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.MembershipWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.MembershipScalarFieldEnum], required: false }),
}))

export const findManyMembershipQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: ['Membership'],
    nullable: false,
    args: findManyMembershipQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.membership.findMany({
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

export const findManyMembershipQuery = defineQuery((t) => ({
  findManyMembership: t.prismaField(findManyMembershipQueryObject(t)),
}));
