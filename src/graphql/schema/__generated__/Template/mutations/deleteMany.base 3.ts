import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationObject,
} from '../../utils'

export const deleteManyTemplateMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: { where: t.arg({ type: Inputs.TemplateWhereInput, required: true }) },
    resolve: async (_root, args, _context, _info) =>
      await prisma.template.deleteMany({ where: args.where }),
  })
)

export const deleteManyTemplateMutation = defineMutation((t) => ({
  deleteManyTemplate: t.field(deleteManyTemplateMutationObject(t)),
}))
