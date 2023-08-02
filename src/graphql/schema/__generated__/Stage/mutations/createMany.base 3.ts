import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const createManyStageMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['Stage'],
    nullable: false,
    args: { data: t.arg({ type: [Inputs.StageCreateInput], required: true }) },
    resolve: async (_query, _root, args, _context, _info) =>
      await prisma.$transaction(
        args.data.map((data) => prisma.stage.create({ data }))
      ),
  })
)

export const createManyStageMutation = defineMutation((t) => ({
  createManyStage: t.prismaField(createManyStageMutationObject(t)),
}))
