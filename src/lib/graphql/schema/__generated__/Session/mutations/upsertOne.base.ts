import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const upsertOneSessionMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.SessionWhereUniqueInput, required: true }),
      create: t.field({ type: Inputs.SessionCreateInput, required: true }),
      update: t.field({ type: Inputs.SessionUpdateInput, required: true }),
    }))

export const upsertOneSessionMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Session',
    nullable: false,
    args: upsertOneSessionMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.session.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      }),
  }),
);

export const upsertOneSessionMutation = defineMutation((t) => ({
  upsertOneSession: t.prismaField(upsertOneSessionMutationObject(t)),
}));
