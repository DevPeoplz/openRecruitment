import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const deleteOneDisqualifyReasonMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.DisqualifyReasonWhereUniqueInput, required: true }) }))

export const deleteOneDisqualifyReasonMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'DisqualifyReason',
    nullable: true,
    args: deleteOneDisqualifyReasonMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.disqualifyReason.delete({ where: args.where, ...query }),
  }),
);

export const deleteOneDisqualifyReasonMutation = defineMutation((t) => ({
  deleteOneDisqualifyReason: t.prismaField(deleteOneDisqualifyReasonMutationObject(t)),
}));
