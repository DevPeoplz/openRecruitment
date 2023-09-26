import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findUniqueMembershipQueryArgs = builder.args((t) => ({ where: t.field({ type: Inputs.MembershipWhereUniqueInput, required: true }) }))

export const findUniqueMembershipQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'Membership',
    nullable: true,
    args: findUniqueMembershipQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.membership.findUnique({ where: args.where, ...query }),
  }),
);

export const findUniqueMembershipQuery = defineQuery((t) => ({
  findUniqueMembership: t.prismaField(findUniqueMembershipQueryObject(t)),
}));
