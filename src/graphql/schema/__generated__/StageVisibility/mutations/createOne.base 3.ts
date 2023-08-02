import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const createOneStageVisibilityMutationObject = defineMutationFunction(
  (t) =>
    defineMutationPrismaObject({
      type: 'StageVisibility',
      nullable: false,
      args: {
        data: t.arg({
          type: Inputs.StageVisibilityCreateInput,
          required: true,
        }),
      },
      resolve: async (query, _root, args, _context, _info) =>
        await prisma.stageVisibility.create({ data: args.data, ...query }),
    })
)

export const createOneStageVisibilityMutation = defineMutation((t) => ({
  createOneStageVisibility: t.prismaField(
    createOneStageVisibilityMutationObject(t)
  ),
}))
