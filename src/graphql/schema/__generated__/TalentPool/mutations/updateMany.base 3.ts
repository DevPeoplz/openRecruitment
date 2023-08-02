import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationObject,
} from '../../utils'

export const updateManyTalentPoolMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.TalentPoolWhereInput, required: false }),
      data: t.arg({
        type: Inputs.TalentPoolUpdateManyMutationInput,
        required: true,
      }),
    },
    resolve: async (_root, args, _context, _info) =>
      await prisma.talentPool.updateMany({
        where: args.where || undefined,
        data: args.data,
      }),
  })
)

export const updateManyTalentPoolMutation = defineMutation((t) => ({
  updateManyTalentPool: t.field(updateManyTalentPoolMutationObject(t)),
}))
