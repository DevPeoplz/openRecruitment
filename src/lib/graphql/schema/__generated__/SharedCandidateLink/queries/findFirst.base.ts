import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findFirstSharedCandidateLinkQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.SharedCandidateLinkWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.SharedCandidateLinkOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.SharedCandidateLinkWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.SharedCandidateLinkScalarFieldEnum], required: false }),
}))

export const findFirstSharedCandidateLinkQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'SharedCandidateLink',
    nullable: true,
    args: findFirstSharedCandidateLinkQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.sharedCandidateLink.findFirst({
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

export const findFirstSharedCandidateLinkQuery = defineQuery((t) => ({
  findFirstSharedCandidateLink: t.prismaField(findFirstSharedCandidateLinkQueryObject(t)),
}));
