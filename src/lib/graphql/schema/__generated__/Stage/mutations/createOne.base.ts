import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createOneStageMutationArgs = builder.args((t) => ({ data: t.field({ type: Inputs.StageCreateInput, required: true }) }))

export const createOneStageMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Stage',
    nullable: false,
    args: createOneStageMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.stage.create({ data: args.data, ...query }),
  }),
);

export const createOneStageMutation = defineMutation((t) => ({
  createOneStage: t.prismaField(createOneStageMutationObject(t)),
}));
