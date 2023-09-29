import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findUniqueSharedCandidateLinkQueryArgs = builder.args((t) => ({ where: t.field({ type: Inputs.SharedCandidateLinkWhereUniqueInput, required: true }) }))

export const findUniqueSharedCandidateLinkQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'SharedCandidateLink',
    nullable: true,
    args: findUniqueSharedCandidateLinkQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.sharedCandidateLink.findUnique({ where: args.where, ...query }),
  }),
);

export const findUniqueSharedCandidateLinkQuery = defineQuery((t) => ({
  findUniqueSharedCandidateLink: t.prismaField(findUniqueSharedCandidateLinkQueryObject(t)),
}));
