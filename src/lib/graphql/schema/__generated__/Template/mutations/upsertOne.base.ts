import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const upsertOneTemplateMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.TemplateWhereUniqueInput, required: true }),
      create: t.field({ type: Inputs.TemplateCreateInput, required: true }),
      update: t.field({ type: Inputs.TemplateUpdateInput, required: true }),
    }))

export const upsertOneTemplateMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Template',
    nullable: false,
    args: upsertOneTemplateMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.template.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      }),
  }),
);

export const upsertOneTemplateMutation = defineMutation((t) => ({
  upsertOneTemplate: t.prismaField(upsertOneTemplateMutationObject(t)),
}));
