import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findUniqueEventInterviewerQueryArgs = builder.args((t) => ({ where: t.field({ type: Inputs.EventInterviewerWhereUniqueInput, required: true }) }))

export const findUniqueEventInterviewerQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'EventInterviewer',
    nullable: true,
    args: findUniqueEventInterviewerQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.eventInterviewer.findUnique({ where: args.where, ...query }),
  }),
);

export const findUniqueEventInterviewerQuery = defineQuery((t) => ({
  findUniqueEventInterviewer: t.prismaField(findUniqueEventInterviewerQueryObject(t)),
}));
