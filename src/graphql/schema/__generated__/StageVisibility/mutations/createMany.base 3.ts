import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const createManyStageVisibilityMutationObject = defineMutationFunction(
  (t) =>
    defineMutationPrismaObject({
      type: ['StageVisibility'],
      nullable: false,
      args: {
        data: t.arg({
          type: [Inputs.StageVisibilityCreateInput],
          required: true,
        }),
      },
      resolve: async (_query, _root, args, _context, _info) =>
        await prisma.$transaction(
          args.data.map((data) => prisma.stageVisibility.create({ data }))
        ),
    })
)

export const createManyStageVisibilityMutation = defineMutation((t) => ({
  createManyStageVisibility: t.prismaField(
    createManyStageVisibilityMutationObject(t)
  ),
}))
