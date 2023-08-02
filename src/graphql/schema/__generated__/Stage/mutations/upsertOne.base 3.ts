import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const upsertOneStageMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Stage',
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.StageWhereUniqueInput, required: true }),
      create: t.arg({ type: Inputs.StageCreateInput, required: true }),
      update: t.arg({ type: Inputs.StageUpdateInput, required: true }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.stage.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      }),
  })
)

export const upsertOneStageMutation = defineMutation((t) => ({
  upsertOneStage: t.prismaField(upsertOneStageMutationObject(t)),
}))
