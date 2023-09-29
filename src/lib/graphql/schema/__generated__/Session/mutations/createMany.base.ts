import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createManySessionMutationArgs = builder.args((t) => ({ data: t.field({ type: [Inputs.SessionCreateInput], required: true }) }))

export const createManySessionMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['Session'],
    nullable: false,
    args: createManySessionMutationArgs,
    resolve: async (_query, _root, args, _context, _info) =>
      await prisma.$transaction(args.data.map((data) => prisma.session.create({ data }))),
  }),
);

export const createManySessionMutation = defineMutation((t) => ({
  createManySession: t.prismaField(createManySessionMutationObject(t)),
}));
