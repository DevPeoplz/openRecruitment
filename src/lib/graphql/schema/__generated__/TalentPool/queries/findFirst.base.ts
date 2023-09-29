import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findFirstTalentPoolQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.TalentPoolWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.TalentPoolOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.TalentPoolWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.TalentPoolScalarFieldEnum], required: false }),
}))

export const findFirstTalentPoolQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'TalentPool',
    nullable: true,
    args: findFirstTalentPoolQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.talentPool.findFirst({
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

export const findFirstTalentPoolQuery = defineQuery((t) => ({
  findFirstTalentPool: t.prismaField(findFirstTalentPoolQueryObject(t)),
}));
