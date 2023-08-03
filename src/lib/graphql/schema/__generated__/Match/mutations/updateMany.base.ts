import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { prisma } from '@/lib/prisma';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const updateManyMatchMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.MatchWhereInput, required: false }),
      data: t.arg({ type: Inputs.MatchUpdateManyMutationInput, required: true }),
    },
    resolve: async (_root, args, _context, _info) =>
      await prisma.match.updateMany({ where: args.where || undefined, data: args.data }),
  }),
);

export const updateManyMatchMutation = defineMutation((t) => ({
  updateManyMatch: t.field(updateManyMatchMutationObject(t)),
}));
