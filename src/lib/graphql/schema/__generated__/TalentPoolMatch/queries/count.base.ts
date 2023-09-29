import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryObject } from '../../utils';

export const countTalentPoolMatchQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.TalentPoolMatchWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.TalentPoolMatchOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.TalentPoolMatchWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.TalentPoolMatchScalarFieldEnum], required: false }),
}))

export const countTalentPoolMatchQueryObject = defineQueryFunction((t) =>
  defineQueryObject({
    type: 'Int',
    nullable: false,
    args: countTalentPoolMatchQueryArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.talentPoolMatch.count({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        distinct: args.distinct || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
      }),
  }),
);

export const countTalentPoolMatchQuery = defineQuery((t) => ({
  countTalentPoolMatch: t.field(countTalentPoolMatchQueryObject(t)),
}));
