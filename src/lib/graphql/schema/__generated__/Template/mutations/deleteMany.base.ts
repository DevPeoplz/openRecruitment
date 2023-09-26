import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const deleteManyTemplateMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.TemplateWhereInput, required: true }) }))

export const deleteManyTemplateMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: deleteManyTemplateMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.template.deleteMany({ where: args.where }),
  }),
);

export const deleteManyTemplateMutation = defineMutation((t) => ({
  deleteManyTemplate: t.field(deleteManyTemplateMutationObject(t)),
}));
