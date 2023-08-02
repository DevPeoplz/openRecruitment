import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const updateOneStageMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Stage',
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.StageWhereUniqueInput, required: true }),
      data: t.arg({ type: Inputs.StageUpdateInput, required: true }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.stage.update({
        where: args.where,
        data: args.data,
        ...query,
      }),
  })
)

export const updateOneStageMutation = defineMutation((t) => ({
  updateOneStage: t.prismaField(updateOneStageMutationObject(t)),
}))
