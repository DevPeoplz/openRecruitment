import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const createOneTemplateMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Template',
    nullable: false,
    args: { data: t.arg({ type: Inputs.TemplateCreateInput, required: true }) },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.template.create({ data: args.data, ...query }),
  })
)

export const createOneTemplateMutation = defineMutation((t) => ({
  createOneTemplate: t.prismaField(createOneTemplateMutationObject(t)),
}))
