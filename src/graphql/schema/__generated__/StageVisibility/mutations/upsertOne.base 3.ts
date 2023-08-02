import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const upsertOneStageVisibilityMutationObject = defineMutationFunction(
  (t) =>
    defineMutationPrismaObject({
      type: 'StageVisibility',
      nullable: false,
      args: {
        where: t.arg({
          type: Inputs.StageVisibilityWhereUniqueInput,
          required: true,
        }),
        create: t.arg({
          type: Inputs.StageVisibilityCreateInput,
          required: true,
        }),
        update: t.arg({
          type: Inputs.StageVisibilityUpdateInput,
          required: true,
        }),
      },
      resolve: async (query, _root, args, _context, _info) =>
        await prisma.stageVisibility.upsert({
          where: args.where,
          create: args.create,
          update: args.update,
          ...query,
        }),
    })
)

export const upsertOneStageVisibilityMutation = defineMutation((t) => ({
  upsertOneStageVisibility: t.prismaField(
    upsertOneStageVisibilityMutationObject(t)
  ),
}))
