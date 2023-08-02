import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationObject,
} from '../../utils'

export const deleteManyStageMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: { where: t.arg({ type: Inputs.StageWhereInput, required: true }) },
    resolve: async (_root, args, _context, _info) =>
      await prisma.stage.deleteMany({ where: args.where }),
  })
)

export const deleteManyStageMutation = defineMutation((t) => ({
  deleteManyStage: t.field(deleteManyStageMutationObject(t)),
}))
