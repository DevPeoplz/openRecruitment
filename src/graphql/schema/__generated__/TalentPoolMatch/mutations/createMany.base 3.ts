import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const createManyTalentPoolMatchMutationObject = defineMutationFunction(
  (t) =>
    defineMutationPrismaObject({
      type: ['TalentPoolMatch'],
      nullable: false,
      args: {
        data: t.arg({
          type: [Inputs.TalentPoolMatchCreateInput],
          required: true,
        }),
      },
      resolve: async (_query, _root, args, _context, _info) =>
        await prisma.$transaction(
          args.data.map((data) => prisma.talentPoolMatch.create({ data }))
        ),
    })
)

export const createManyTalentPoolMatchMutation = defineMutation((t) => ({
  createManyTalentPoolMatch: t.prismaField(
    createManyTalentPoolMatchMutationObject(t)
  ),
}))
