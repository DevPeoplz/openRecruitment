import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationObject,
} from '../../utils'

export const updateManyTalentPoolMatchMutationObject = defineMutationFunction(
  (t) =>
    defineMutationObject({
      type: BatchPayload,
      nullable: false,
      args: {
        where: t.arg({
          type: Inputs.TalentPoolMatchWhereInput,
          required: false,
        }),
        data: t.arg({
          type: Inputs.TalentPoolMatchUpdateManyMutationInput,
          required: true,
        }),
      },
      resolve: async (_root, args, _context, _info) =>
        await prisma.talentPoolMatch.updateMany({
          where: args.where || undefined,
          data: args.data,
        }),
    })
)

export const updateManyTalentPoolMatchMutation = defineMutation((t) => ({
  updateManyTalentPoolMatch: t.field(
    updateManyTalentPoolMatchMutationObject(t)
  ),
}))
