import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const createOneStageMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Stage',
    nullable: false,
    args: { data: t.arg({ type: Inputs.StageCreateInput, required: true }) },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.stage.create({ data: args.data, ...query }),
  })
)

export const createOneStageMutation = defineMutation((t) => ({
  createOneStage: t.prismaField(createOneStageMutationObject(t)),
}))
