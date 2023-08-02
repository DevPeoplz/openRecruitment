import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const createOneDisqualifyReasonMutationObject = defineMutationFunction(
  (t) =>
    defineMutationPrismaObject({
      type: 'DisqualifyReason',
      nullable: false,
      args: {
        data: t.arg({
          type: Inputs.DisqualifyReasonCreateInput,
          required: true,
        }),
      },
      resolve: async (query, _root, args, _context, _info) =>
        await prisma.disqualifyReason.create({ data: args.data, ...query }),
    })
)

export const createOneDisqualifyReasonMutation = defineMutation((t) => ({
  createOneDisqualifyReason: t.prismaField(
    createOneDisqualifyReasonMutationObject(t)
  ),
}))
