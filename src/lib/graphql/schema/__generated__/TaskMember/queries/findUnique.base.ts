import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findUniqueTaskMemberQueryArgs = builder.args((t) => ({ where: t.field({ type: Inputs.TaskMemberWhereUniqueInput, required: true }) }))

export const findUniqueTaskMemberQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'TaskMember',
    nullable: true,
    args: findUniqueTaskMemberQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.taskMember.findUnique({ where: args.where, ...query }),
  }),
);

export const findUniqueTaskMemberQuery = defineQuery((t) => ({
  findUniqueTaskMember: t.prismaField(findUniqueTaskMemberQueryObject(t)),
}));
