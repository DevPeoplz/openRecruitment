import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createManyStageMutationArgs = builder.args((t) => ({ data: t.field({ type: [Inputs.StageCreateInput], required: true }) }))

export const createManyStageMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['Stage'],
    nullable: false,
    args: createManyStageMutationArgs,
    resolve: async (_query, _root, args, _context, _info) =>
      await prisma.$transaction(args.data.map((data) => prisma.stage.create({ data }))),
  }),
);

export const createManyStageMutation = defineMutation((t) => ({
  createManyStage: t.prismaField(createManyStageMutationObject(t)),
}));
