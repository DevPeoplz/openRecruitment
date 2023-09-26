import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const upsertOneVerificationTokenMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.VerificationTokenWhereUniqueInput, required: true }),
      create: t.field({ type: Inputs.VerificationTokenCreateInput, required: true }),
      update: t.field({ type: Inputs.VerificationTokenUpdateInput, required: true }),
    }))

export const upsertOneVerificationTokenMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'VerificationToken',
    nullable: false,
    args: upsertOneVerificationTokenMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.verificationToken.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      }),
  }),
);

export const upsertOneVerificationTokenMutation = defineMutation((t) => ({
  upsertOneVerificationToken: t.prismaField(upsertOneVerificationTokenMutationObject(t)),
}));
