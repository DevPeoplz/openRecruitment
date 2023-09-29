import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const deleteOneVerificationTokenMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.VerificationTokenWhereUniqueInput, required: true }) }))

export const deleteOneVerificationTokenMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'VerificationToken',
    nullable: true,
    args: deleteOneVerificationTokenMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.verificationToken.delete({ where: args.where, ...query }),
  }),
);

export const deleteOneVerificationTokenMutation = defineMutation((t) => ({
  deleteOneVerificationToken: t.prismaField(deleteOneVerificationTokenMutationObject(t)),
}));
