import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const createManyTalentPoolMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['TalentPool'],
    nullable: false,
    args: {
      data: t.arg({ type: [Inputs.TalentPoolCreateInput], required: true }),
    },
    resolve: async (_query, _root, args, _context, _info) =>
      await prisma.$transaction(
        args.data.map((data) => prisma.talentPool.create({ data }))
      ),
  })
)

export const createManyTalentPoolMutation = defineMutation((t) => ({
  createManyTalentPool: t.prismaField(createManyTalentPoolMutationObject(t)),
}))
