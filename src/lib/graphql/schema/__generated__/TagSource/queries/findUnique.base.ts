import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findUniqueTagSourceQueryArgs = builder.args((t) => ({ where: t.field({ type: Inputs.TagSourceWhereUniqueInput, required: true }) }))

export const findUniqueTagSourceQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'TagSource',
    nullable: true,
    args: findUniqueTagSourceQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.tagSource.findUnique({ where: args.where, ...query }),
  }),
);

export const findUniqueTagSourceQuery = defineQuery((t) => ({
  findUniqueTagSource: t.prismaField(findUniqueTagSourceQueryObject(t)),
}));
