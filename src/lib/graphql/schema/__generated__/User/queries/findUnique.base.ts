import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findUniqueUserQueryArgs = builder.args((t) => ({ where: t.field({ type: Inputs.UserWhereUniqueInput, required: true }) }))

export const findUniqueUserQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'User',
    nullable: true,
    args: findUniqueUserQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.user.findUnique({ where: args.where, ...query }),
  }),
);

export const findUniqueUserQuery = defineQuery((t) => ({
  findUniqueUser: t.prismaField(findUniqueUserQueryObject(t)),
}));
