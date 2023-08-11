import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { prisma } from '@/lib/prisma';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const deleteManyVerificationTokenMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: { where: t.arg({ type: Inputs.VerificationTokenWhereInput, required: true }) },
    resolve: async (_root, args, _context, _info) =>
      await prisma.verificationToken.deleteMany({ where: args.where }),
  }),
);

export const deleteManyVerificationTokenMutation = defineMutation((t) => ({
  deleteManyVerificationToken: t.field(deleteManyVerificationTokenMutationObject(t)),
}));