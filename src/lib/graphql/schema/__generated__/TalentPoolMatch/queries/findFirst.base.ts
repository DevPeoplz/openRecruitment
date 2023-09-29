import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findFirstTalentPoolMatchQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.TalentPoolMatchWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.TalentPoolMatchOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.TalentPoolMatchWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.TalentPoolMatchScalarFieldEnum], required: false }),
}))

export const findFirstTalentPoolMatchQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'TalentPoolMatch',
    nullable: true,
    args: findFirstTalentPoolMatchQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.talentPoolMatch.findFirst({
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

export const findFirstTalentPoolMatchQuery = defineQuery((t) => ({
  findFirstTalentPoolMatch: t.prismaField(findFirstTalentPoolMatchQueryObject(t)),
}));
