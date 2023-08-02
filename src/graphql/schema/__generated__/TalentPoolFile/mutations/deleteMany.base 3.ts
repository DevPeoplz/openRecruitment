import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationObject,
} from '../../utils'

export const deleteManyTalentPoolFileMutationObject = defineMutationFunction(
  (t) =>
    defineMutationObject({
      type: BatchPayload,
      nullable: true,
      args: {
        where: t.arg({ type: Inputs.TalentPoolFileWhereInput, required: true }),
      },
      resolve: async (_root, args, _context, _info) =>
        await prisma.talentPoolFile.deleteMany({ where: args.where }),
    })
)

export const deleteManyTalentPoolFileMutation = defineMutation((t) => ({
  deleteManyTalentPoolFile: t.field(deleteManyTalentPoolFileMutationObject(t)),
}))
