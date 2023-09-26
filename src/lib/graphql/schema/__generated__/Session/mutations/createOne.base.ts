import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createOneSessionMutationArgs = builder.args((t) => ({ data: t.field({ type: Inputs.SessionCreateInput, required: true }) }))

export const createOneSessionMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Session',
    nullable: false,
    args: createOneSessionMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.session.create({ data: args.data, ...query }),
  }),
);

export const createOneSessionMutation = defineMutation((t) => ({
  createOneSession: t.prismaField(createOneSessionMutationObject(t)),
}));
