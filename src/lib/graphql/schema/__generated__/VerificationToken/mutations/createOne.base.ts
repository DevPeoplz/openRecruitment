import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createOneVerificationTokenMutationArgs = builder.args((t) => ({ data: t.field({ type: Inputs.VerificationTokenCreateInput, required: true }) }))

export const createOneVerificationTokenMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'VerificationToken',
    nullable: false,
    args: createOneVerificationTokenMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.verificationToken.create({ data: args.data, ...query }),
  }),
);

export const createOneVerificationTokenMutation = defineMutation((t) => ({
  createOneVerificationToken: t.prismaField(createOneVerificationTokenMutationObject(t)),
}));
