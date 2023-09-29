import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const deleteOneTemplateMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.TemplateWhereUniqueInput, required: true }) }))

export const deleteOneTemplateMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Template',
    nullable: true,
    args: deleteOneTemplateMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.template.delete({ where: args.where, ...query }),
  }),
);

export const deleteOneTemplateMutation = defineMutation((t) => ({
  deleteOneTemplate: t.prismaField(deleteOneTemplateMutationObject(t)),
}));
