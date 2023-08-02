import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const updateOneStageVisibilityMutationObject = defineMutationFunction(
  (t) =>
    defineMutationPrismaObject({
      type: 'StageVisibility',
      nullable: true,
      args: {
        where: t.arg({
          type: Inputs.StageVisibilityWhereUniqueInput,
          required: true,
        }),
        data: t.arg({
          type: Inputs.StageVisibilityUpdateInput,
          required: true,
        }),
      },
      resolve: async (query, _root, args, _context, _info) =>
        await prisma.stageVisibility.update({
          where: args.where,
          data: args.data,
          ...query,
        }),
    })
)

export const updateOneStageVisibilityMutation = defineMutation((t) => ({
  updateOneStageVisibility: t.prismaField(
    updateOneStageVisibilityMutationObject(t)
  ),
}))
