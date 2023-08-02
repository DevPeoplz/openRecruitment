import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const updateOneTemplateMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Template',
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.TemplateWhereUniqueInput, required: true }),
      data: t.arg({ type: Inputs.TemplateUpdateInput, required: true }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.template.update({
        where: args.where,
        data: args.data,
        ...query,
      }),
  })
)

export const updateOneTemplateMutation = defineMutation((t) => ({
  updateOneTemplate: t.prismaField(updateOneTemplateMutationObject(t)),
}))
