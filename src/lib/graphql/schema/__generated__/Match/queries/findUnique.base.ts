import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findUniqueMatchQueryArgs = builder.args((t) => ({ where: t.field({ type: Inputs.MatchWhereUniqueInput, required: true }) }))

export const findUniqueMatchQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'Match',
    nullable: true,
    args: findUniqueMatchQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.match.findUnique({ where: args.where, ...query }),
  }),
);

export const findUniqueMatchQuery = defineQuery((t) => ({
  findUniqueMatch: t.prismaField(findUniqueMatchQueryObject(t)),
}));
