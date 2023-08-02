import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationObject,
} from '../../utils'

export const deleteManyTagSourceMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.TagSourceWhereInput, required: true }),
    },
    resolve: async (_root, args, _context, _info) =>
      await prisma.tagSource.deleteMany({ where: args.where }),
  })
)

export const deleteManyTagSourceMutation = defineMutation((t) => ({
  deleteManyTagSource: t.field(deleteManyTagSourceMutationObject(t)),
}))
