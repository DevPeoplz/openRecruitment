import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createManyVerificationTokenMutationArgs = builder.args((t) => ({ data: t.field({ type: [Inputs.VerificationTokenCreateInput], required: true }) }))

export const createManyVerificationTokenMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['VerificationToken'],
    nullable: false,
    args: createManyVerificationTokenMutationArgs,
    resolve: async (_query, _root, args, _context, _info) =>
      await prisma.$transaction(args.data.map((data) => prisma.verificationToken.create({ data }))),
  }),
);

export const createManyVerificationTokenMutation = defineMutation((t) => ({
  createManyVerificationToken: t.prismaField(createManyVerificationTokenMutationObject(t)),
}));
