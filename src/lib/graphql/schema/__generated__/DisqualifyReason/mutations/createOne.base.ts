import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createOneDisqualifyReasonMutationArgs = builder.args((t) => ({ data: t.field({ type: Inputs.DisqualifyReasonCreateInput, required: true }) }))

export const createOneDisqualifyReasonMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'DisqualifyReason',
    nullable: false,
    args: createOneDisqualifyReasonMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.disqualifyReason.create({ data: args.data, ...query }),
  }),
);

export const createOneDisqualifyReasonMutation = defineMutation((t) => ({
  createOneDisqualifyReason: t.prismaField(createOneDisqualifyReasonMutationObject(t)),
}));
