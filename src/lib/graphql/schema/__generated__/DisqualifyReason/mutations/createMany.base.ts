import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createManyDisqualifyReasonMutationArgs = builder.args((t) => ({ data: t.field({ type: [Inputs.DisqualifyReasonCreateInput], required: true }) }))

export const createManyDisqualifyReasonMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['DisqualifyReason'],
    nullable: false,
    args: createManyDisqualifyReasonMutationArgs,
    resolve: async (_query, _root, args, _context, _info) =>
      await prisma.$transaction(args.data.map((data) => prisma.disqualifyReason.create({ data }))),
  }),
);

export const createManyDisqualifyReasonMutation = defineMutation((t) => ({
  createManyDisqualifyReason: t.prismaField(createManyDisqualifyReasonMutationObject(t)),
}));
