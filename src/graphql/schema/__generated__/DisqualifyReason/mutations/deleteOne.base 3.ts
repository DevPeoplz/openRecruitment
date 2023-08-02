import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const deleteOneDisqualifyReasonMutationObject = defineMutationFunction(
  (t) =>
    defineMutationPrismaObject({
      type: 'DisqualifyReason',
      nullable: true,
      args: {
        where: t.arg({
          type: Inputs.DisqualifyReasonWhereUniqueInput,
          required: true,
        }),
      },
      resolve: async (query, _root, args, _context, _info) =>
        await prisma.disqualifyReason.delete({ where: args.where, ...query }),
    })
)

export const deleteOneDisqualifyReasonMutation = defineMutation((t) => ({
  deleteOneDisqualifyReason: t.prismaField(
    deleteOneDisqualifyReasonMutationObject(t)
  ),
}))
