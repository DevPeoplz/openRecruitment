import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findUniqueDisqualifyReasonQueryArgs = builder.args((t) => ({ where: t.field({ type: Inputs.DisqualifyReasonWhereUniqueInput, required: true }) }))

export const findUniqueDisqualifyReasonQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'DisqualifyReason',
    nullable: true,
    args: findUniqueDisqualifyReasonQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.disqualifyReason.findUnique({ where: args.where, ...query }),
  }),
);

export const findUniqueDisqualifyReasonQuery = defineQuery((t) => ({
  findUniqueDisqualifyReason: t.prismaField(findUniqueDisqualifyReasonQueryObject(t)),
}));
