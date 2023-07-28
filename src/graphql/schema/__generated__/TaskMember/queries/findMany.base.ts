import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findManyTaskMemberQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: ['TaskMember'],
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.TaskMemberWhereInput, required: false }),
      orderBy: t.arg({ type: [Inputs.TaskMemberOrderByWithRelationInput], required: false }),
      cursor: t.arg({ type: Inputs.TaskMemberWhereUniqueInput, required: false }),
      take: t.arg({ type: 'Int', required: false }),
      skip: t.arg({ type: 'Int', required: false }),
      distinct: t.arg({ type: [Inputs.TaskMemberScalarFieldEnum], required: false }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.taskMember.findMany({
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

export const findManyTaskMemberQuery = defineQuery((t) => ({
  findManyTaskMember: t.prismaField(findManyTaskMemberQueryObject(t)),
}));