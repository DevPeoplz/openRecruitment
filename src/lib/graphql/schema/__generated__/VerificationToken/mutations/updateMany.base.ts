import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const updateManyVerificationTokenMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.VerificationTokenWhereInput, required: false }),
      data: t.field({ type: Inputs.VerificationTokenUpdateManyMutationInput, required: true }),
    }))

export const updateManyVerificationTokenMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: false,
    args: updateManyVerificationTokenMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.verificationToken.updateMany({ where: args.where || undefined, data: args.data }),
  }),
);

export const updateManyVerificationTokenMutation = defineMutation((t) => ({
  updateManyVerificationToken: t.field(updateManyVerificationTokenMutationObject(t)),
}));
