import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const deleteOneStageVisibilityMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.StageVisibilityWhereUniqueInput, required: true }) }))

export const deleteOneStageVisibilityMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'StageVisibility',
    nullable: true,
    args: deleteOneStageVisibilityMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.stageVisibility.delete({ where: args.where, ...query }),
  }),
);

export const deleteOneStageVisibilityMutation = defineMutation((t) => ({
  deleteOneStageVisibility: t.prismaField(deleteOneStageVisibilityMutationObject(t)),
}));
