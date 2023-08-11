import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { prisma } from '@/lib/prisma';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const updateManyTemplateMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.TemplateWhereInput, required: false }),
      data: t.arg({ type: Inputs.TemplateUpdateManyMutationInput, required: true }),
    },
    resolve: async (_root, args, _context, _info) =>
      await prisma.template.updateMany({ where: args.where || undefined, data: args.data }),
  }),
);

export const updateManyTemplateMutation = defineMutation((t) => ({
  updateManyTemplate: t.field(updateManyTemplateMutationObject(t)),
}));