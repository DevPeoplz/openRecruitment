import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findUniqueSessionQueryArgs = builder.args((t) => ({ where: t.field({ type: Inputs.SessionWhereUniqueInput, required: true }) }))

export const findUniqueSessionQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'Session',
    nullable: true,
    args: findUniqueSessionQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.session.findUnique({ where: args.where, ...query }),
  }),
);

export const findUniqueSessionQuery = defineQuery((t) => ({
  findUniqueSession: t.prismaField(findUniqueSessionQueryObject(t)),
}));
