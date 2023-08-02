import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const createManyTemplateMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['Template'],
    nullable: false,
    args: {
      data: t.arg({ type: [Inputs.TemplateCreateInput], required: true }),
    },
    resolve: async (_query, _root, args, _context, _info) =>
      await prisma.$transaction(
        args.data.map((data) => prisma.template.create({ data }))
      ),
  })
)

export const createManyTemplateMutation = defineMutation((t) => ({
  createManyTemplate: t.prismaField(createManyTemplateMutationObject(t)),
}))
