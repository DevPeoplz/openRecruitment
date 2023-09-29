import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryObject } from '../../utils';

export const countSharedCandidateLinkQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.SharedCandidateLinkWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.SharedCandidateLinkOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.SharedCandidateLinkWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.SharedCandidateLinkScalarFieldEnum], required: false }),
}))

export const countSharedCandidateLinkQueryObject = defineQueryFunction((t) =>
  defineQueryObject({
    type: 'Int',
    nullable: false,
    args: countSharedCandidateLinkQueryArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.sharedCandidateLink.count({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        distinct: args.distinct || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
      }),
  }),
);

export const countSharedCandidateLinkQuery = defineQuery((t) => ({
  countSharedCandidateLink: t.field(countSharedCandidateLinkQueryObject(t)),
}));
