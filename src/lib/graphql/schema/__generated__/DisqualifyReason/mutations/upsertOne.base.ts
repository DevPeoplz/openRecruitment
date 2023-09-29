import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const upsertOneDisqualifyReasonMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.DisqualifyReasonWhereUniqueInput, required: true }),
      create: t.field({ type: Inputs.DisqualifyReasonCreateInput, required: true }),
      update: t.field({ type: Inputs.DisqualifyReasonUpdateInput, required: true }),
    }))

export const upsertOneDisqualifyReasonMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'DisqualifyReason',
    nullable: false,
    args: upsertOneDisqualifyReasonMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.disqualifyReason.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      }),
  }),
);

export const upsertOneDisqualifyReasonMutation = defineMutation((t) => ({
  upsertOneDisqualifyReason: t.prismaField(upsertOneDisqualifyReasonMutationObject(t)),
}));
