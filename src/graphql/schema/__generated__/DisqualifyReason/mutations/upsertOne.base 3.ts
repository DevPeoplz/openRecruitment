import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const upsertOneDisqualifyReasonMutationObject = defineMutationFunction(
  (t) =>
    defineMutationPrismaObject({
      type: 'DisqualifyReason',
      nullable: false,
      args: {
        where: t.arg({
          type: Inputs.DisqualifyReasonWhereUniqueInput,
          required: true,
        }),
        create: t.arg({
          type: Inputs.DisqualifyReasonCreateInput,
          required: true,
        }),
        update: t.arg({
          type: Inputs.DisqualifyReasonUpdateInput,
          required: true,
        }),
      },
      resolve: async (query, _root, args, _context, _info) =>
        await prisma.disqualifyReason.upsert({
          where: args.where,
          create: args.create,
          update: args.update,
          ...query,
        }),
    })
)

export const upsertOneDisqualifyReasonMutation = defineMutation((t) => ({
  upsertOneDisqualifyReason: t.prismaField(
    upsertOneDisqualifyReasonMutationObject(t)
  ),
}))
