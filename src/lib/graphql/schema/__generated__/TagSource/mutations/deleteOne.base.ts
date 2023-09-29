import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const deleteOneTagSourceMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.TagSourceWhereUniqueInput, required: true }) }))

export const deleteOneTagSourceMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'TagSource',
    nullable: true,
    args: deleteOneTagSourceMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.tagSource.delete({ where: args.where, ...query }),
  }),
);

export const deleteOneTagSourceMutation = defineMutation((t) => ({
  deleteOneTagSource: t.prismaField(deleteOneTagSourceMutationObject(t)),
}));
