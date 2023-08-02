import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationObject,
} from '../../utils'

export const deleteManyTalentPoolMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.TalentPoolWhereInput, required: true }),
    },
    resolve: async (_root, args, _context, _info) =>
      await prisma.talentPool.deleteMany({ where: args.where }),
  })
)

export const deleteManyTalentPoolMutation = defineMutation((t) => ({
  deleteManyTalentPool: t.field(deleteManyTalentPoolMutationObject(t)),
}))
