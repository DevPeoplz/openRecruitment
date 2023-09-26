import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const deleteOneSessionMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.SessionWhereUniqueInput, required: true }) }))

export const deleteOneSessionMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Session',
    nullable: true,
    args: deleteOneSessionMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.session.delete({ where: args.where, ...query }),
  }),
);

export const deleteOneSessionMutation = defineMutation((t) => ({
  deleteOneSession: t.prismaField(deleteOneSessionMutationObject(t)),
}));
