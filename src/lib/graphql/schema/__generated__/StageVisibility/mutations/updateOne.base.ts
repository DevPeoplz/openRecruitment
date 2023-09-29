import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const updateOneStageVisibilityMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.StageVisibilityWhereUniqueInput, required: true }),
      data: t.field({ type: Inputs.StageVisibilityUpdateInput, required: true }),
    }))

export const updateOneStageVisibilityMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'StageVisibility',
    nullable: true,
    args: updateOneStageVisibilityMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.stageVisibility.update({ where: args.where, data: args.data, ...query }),
  }),
);

export const updateOneStageVisibilityMutation = defineMutation((t) => ({
  updateOneStageVisibility: t.prismaField(updateOneStageVisibilityMutationObject(t)),
}));
