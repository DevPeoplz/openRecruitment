import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createManyTemplateMutationArgs = builder.args((t) => ({ data: t.field({ type: [Inputs.TemplateCreateInput], required: true }) }))

export const createManyTemplateMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['Template'],
    nullable: false,
    args: createManyTemplateMutationArgs,
    resolve: async (_query, _root, args, _context, _info) =>
      await prisma.$transaction(args.data.map((data) => prisma.template.create({ data }))),
  }),
);

export const createManyTemplateMutation = defineMutation((t) => ({
  createManyTemplate: t.prismaField(createManyTemplateMutationObject(t)),
}));
