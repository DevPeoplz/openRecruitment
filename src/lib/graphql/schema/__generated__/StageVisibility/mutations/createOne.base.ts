import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createOneStageVisibilityMutationArgs = builder.args((t) => ({ data: t.field({ type: Inputs.StageVisibilityCreateInput, required: true }) }))

export const createOneStageVisibilityMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'StageVisibility',
    nullable: false,
    args: createOneStageVisibilityMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.stageVisibility.create({ data: args.data, ...query }),
  }),
);

export const createOneStageVisibilityMutation = defineMutation((t) => ({
  createOneStageVisibility: t.prismaField(createOneStageVisibilityMutationObject(t)),
}));
