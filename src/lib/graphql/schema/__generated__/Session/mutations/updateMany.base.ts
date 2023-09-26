import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const updateManySessionMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.SessionWhereInput, required: false }),
      data: t.field({ type: Inputs.SessionUpdateManyMutationInput, required: true }),
    }))

export const updateManySessionMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: false,
    args: updateManySessionMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.session.updateMany({ where: args.where || undefined, data: args.data }),
  }),
);

export const updateManySessionMutation = defineMutation((t) => ({
  updateManySession: t.field(updateManySessionMutationObject(t)),
}));
