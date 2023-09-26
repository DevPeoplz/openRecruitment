import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const deleteOneStageMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.StageWhereUniqueInput, required: true }) }))

export const deleteOneStageMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Stage',
    nullable: true,
    args: deleteOneStageMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.stage.delete({ where: args.where, ...query }),
  }),
);

export const deleteOneStageMutation = defineMutation((t) => ({
  deleteOneStage: t.prismaField(deleteOneStageMutationObject(t)),
}));
