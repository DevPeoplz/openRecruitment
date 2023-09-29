import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const updateOneTemplateMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.TemplateWhereUniqueInput, required: true }),
      data: t.field({ type: Inputs.TemplateUpdateInput, required: true }),
    }))

export const updateOneTemplateMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Template',
    nullable: true,
    args: updateOneTemplateMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.template.update({ where: args.where, data: args.data, ...query }),
  }),
);

export const updateOneTemplateMutation = defineMutation((t) => ({
  updateOneTemplate: t.prismaField(updateOneTemplateMutationObject(t)),
}));
