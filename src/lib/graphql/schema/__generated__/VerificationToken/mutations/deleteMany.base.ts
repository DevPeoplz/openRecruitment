import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const deleteManyVerificationTokenMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.VerificationTokenWhereInput, required: true }) }))

export const deleteManyVerificationTokenMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: deleteManyVerificationTokenMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.verificationToken.deleteMany({ where: args.where }),
  }),
);

export const deleteManyVerificationTokenMutation = defineMutation((t) => ({
  deleteManyVerificationToken: t.field(deleteManyVerificationTokenMutationObject(t)),
}));
