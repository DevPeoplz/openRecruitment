import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const upsertOneTemplateMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Template',
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.TemplateWhereUniqueInput, required: true }),
      create: t.arg({ type: Inputs.TemplateCreateInput, required: true }),
      update: t.arg({ type: Inputs.TemplateUpdateInput, required: true }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.template.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      }),
  })
)

export const upsertOneTemplateMutation = defineMutation((t) => ({
  upsertOneTemplate: t.prismaField(upsertOneTemplateMutationObject(t)),
}))
