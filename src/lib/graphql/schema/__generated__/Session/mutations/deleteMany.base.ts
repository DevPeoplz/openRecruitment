import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const deleteManySessionMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.SessionWhereInput, required: true }) }))

export const deleteManySessionMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: deleteManySessionMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.session.deleteMany({ where: args.where }),
  }),
);

export const deleteManySessionMutation = defineMutation((t) => ({
  deleteManySession: t.field(deleteManySessionMutationObject(t)),
}));
