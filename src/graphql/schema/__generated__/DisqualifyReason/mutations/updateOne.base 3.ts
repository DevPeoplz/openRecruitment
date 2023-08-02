import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const updateOneDisqualifyReasonMutationObject = defineMutationFunction(
  (t) =>
    defineMutationPrismaObject({
      type: 'DisqualifyReason',
      nullable: true,
      args: {
        where: t.arg({
          type: Inputs.DisqualifyReasonWhereUniqueInput,
          required: true,
        }),
        data: t.arg({
          type: Inputs.DisqualifyReasonUpdateInput,
          required: true,
        }),
      },
      resolve: async (query, _root, args, _context, _info) =>
        await prisma.disqualifyReason.update({
          where: args.where,
          data: args.data,
          ...query,
        }),
    })
)

export const updateOneDisqualifyReasonMutation = defineMutation((t) => ({
  updateOneDisqualifyReason: t.prismaField(
    updateOneDisqualifyReasonMutationObject(t)
  ),
}))
