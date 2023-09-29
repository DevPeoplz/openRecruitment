import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryObject } from '../../utils';

export const countTaskMemberQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.TaskMemberWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.TaskMemberOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.TaskMemberWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.TaskMemberScalarFieldEnum], required: false }),
}))

export const countTaskMemberQueryObject = defineQueryFunction((t) =>
  defineQueryObject({
    type: 'Int',
    nullable: false,
    args: countTaskMemberQueryArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.taskMember.count({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        distinct: args.distinct || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
      }),
  }),
);

export const countTaskMemberQuery = defineQuery((t) => ({
  countTaskMember: t.field(countTaskMemberQueryObject(t)),
}));
