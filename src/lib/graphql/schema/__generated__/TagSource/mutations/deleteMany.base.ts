import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const deleteManyTagSourceMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.TagSourceWhereInput, required: true }) }))

export const deleteManyTagSourceMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: deleteManyTagSourceMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.tagSource.deleteMany({ where: args.where }),
  }),
);

export const deleteManyTagSourceMutation = defineMutation((t) => ({
  deleteManyTagSource: t.field(deleteManyTagSourceMutationObject(t)),
}));
