import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const updateOneSessionMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.SessionWhereUniqueInput, required: true }),
      data: t.field({ type: Inputs.SessionUpdateInput, required: true }),
    }))

export const updateOneSessionMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Session',
    nullable: true,
    args: updateOneSessionMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.session.update({ where: args.where, data: args.data, ...query }),
  }),
);

export const updateOneSessionMutation = defineMutation((t) => ({
  updateOneSession: t.prismaField(updateOneSessionMutationObject(t)),
}));
