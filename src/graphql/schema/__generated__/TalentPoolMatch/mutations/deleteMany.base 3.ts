import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationObject,
} from '../../utils'

export const deleteManyTalentPoolMatchMutationObject = defineMutationFunction(
  (t) =>
    defineMutationObject({
      type: BatchPayload,
      nullable: true,
      args: {
        where: t.arg({
          type: Inputs.TalentPoolMatchWhereInput,
          required: true,
        }),
      },
      resolve: async (_root, args, _context, _info) =>
        await prisma.talentPoolMatch.deleteMany({ where: args.where }),
    })
)

export const deleteManyTalentPoolMatchMutation = defineMutation((t) => ({
  deleteManyTalentPoolMatch: t.field(
    deleteManyTalentPoolMatchMutationObject(t)
  ),
}))
