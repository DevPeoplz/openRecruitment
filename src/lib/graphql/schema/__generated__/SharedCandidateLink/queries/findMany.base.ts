import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findManySharedCandidateLinkQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.SharedCandidateLinkWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.SharedCandidateLinkOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.SharedCandidateLinkWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.SharedCandidateLinkScalarFieldEnum], required: false }),
}))

export const findManySharedCandidateLinkQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: ['SharedCandidateLink'],
    nullable: false,
    args: findManySharedCandidateLinkQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.sharedCandidateLink.findMany({
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

export const findManySharedCandidateLinkQuery = defineQuery((t) => ({
  findManySharedCandidateLink: t.prismaField(findManySharedCandidateLinkQueryObject(t)),
}));
