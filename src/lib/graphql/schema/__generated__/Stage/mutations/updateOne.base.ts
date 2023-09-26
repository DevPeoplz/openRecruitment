import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const updateOneStageMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.StageWhereUniqueInput, required: true }),
      data: t.field({ type: Inputs.StageUpdateInput, required: true }),
    }))

export const updateOneStageMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Stage',
    nullable: true,
    args: updateOneStageMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.stage.update({ where: args.where, data: args.data, ...query }),
  }),
);

export const updateOneStageMutation = defineMutation((t) => ({
  updateOneStage: t.prismaField(updateOneStageMutationObject(t)),
}));
