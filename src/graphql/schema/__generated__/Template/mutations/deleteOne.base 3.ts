import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const deleteOneTemplateMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Template',
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.TemplateWhereUniqueInput, required: true }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.template.delete({ where: args.where, ...query }),
  })
)

export const deleteOneTemplateMutation = defineMutation((t) => ({
  deleteOneTemplate: t.prismaField(deleteOneTemplateMutationObject(t)),
}))
