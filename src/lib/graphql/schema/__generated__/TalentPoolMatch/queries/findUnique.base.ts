import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findUniqueTalentPoolMatchQueryArgs = builder.args((t) => ({ where: t.field({ type: Inputs.TalentPoolMatchWhereUniqueInput, required: true }) }))

export const findUniqueTalentPoolMatchQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'TalentPoolMatch',
    nullable: true,
    args: findUniqueTalentPoolMatchQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.talentPoolMatch.findUnique({ where: args.where, ...query }),
  }),
);

export const findUniqueTalentPoolMatchQuery = defineQuery((t) => ({
  findUniqueTalentPoolMatch: t.prismaField(findUniqueTalentPoolMatchQueryObject(t)),
}));
