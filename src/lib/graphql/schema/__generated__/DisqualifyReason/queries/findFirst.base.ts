import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findFirstDisqualifyReasonQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.DisqualifyReasonWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.DisqualifyReasonOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.DisqualifyReasonWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.DisqualifyReasonScalarFieldEnum], required: false }),
}))

export const findFirstDisqualifyReasonQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'DisqualifyReason',
    nullable: true,
    args: findFirstDisqualifyReasonQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.disqualifyReason.findFirst({
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

export const findFirstDisqualifyReasonQuery = defineQuery((t) => ({
  findFirstDisqualifyReason: t.prismaField(findFirstDisqualifyReasonQueryObject(t)),
}));
