import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationObject,
} from '../../utils'

export const deleteManyMatchMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: { where: t.arg({ type: Inputs.MatchWhereInput, required: true }) },
    resolve: async (_root, args, _context, _info) =>
      await prisma.match.deleteMany({ where: args.where }),
  })
)

export const deleteManyMatchMutation = defineMutation((t) => ({
  deleteManyMatch: t.field(deleteManyMatchMutationObject(t)),
}))
