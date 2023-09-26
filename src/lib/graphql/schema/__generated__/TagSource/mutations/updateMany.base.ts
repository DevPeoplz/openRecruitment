import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const updateManyTagSourceMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.TagSourceWhereInput, required: false }),
      data: t.field({ type: Inputs.TagSourceUpdateManyMutationInput, required: true }),
    }))

export const updateManyTagSourceMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: false,
    args: updateManyTagSourceMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.tagSource.updateMany({ where: args.where || undefined, data: args.data }),
  }),
);

export const updateManyTagSourceMutation = defineMutation((t) => ({
  updateManyTagSource: t.field(updateManyTagSourceMutationObject(t)),
}));
