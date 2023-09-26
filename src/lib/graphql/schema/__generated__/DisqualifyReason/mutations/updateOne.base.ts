import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const updateOneDisqualifyReasonMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.DisqualifyReasonWhereUniqueInput, required: true }),
      data: t.field({ type: Inputs.DisqualifyReasonUpdateInput, required: true }),
    }))

export const updateOneDisqualifyReasonMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'DisqualifyReason',
    nullable: true,
    args: updateOneDisqualifyReasonMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.disqualifyReason.update({ where: args.where, data: args.data, ...query }),
  }),
);

export const updateOneDisqualifyReasonMutation = defineMutation((t) => ({
  updateOneDisqualifyReason: t.prismaField(updateOneDisqualifyReasonMutationObject(t)),
}));
