import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const updateOneTagSourceMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.TagSourceWhereUniqueInput, required: true }),
      data: t.field({ type: Inputs.TagSourceUpdateInput, required: true }),
    }))

export const updateOneTagSourceMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'TagSource',
    nullable: true,
    args: updateOneTagSourceMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.tagSource.update({ where: args.where, data: args.data, ...query }),
  }),
);

export const updateOneTagSourceMutation = defineMutation((t) => ({
  updateOneTagSource: t.prismaField(updateOneTagSourceMutationObject(t)),
}));
