import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const createOneTalentPoolMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'TalentPool',
    nullable: false,
    args: {
      data: t.arg({ type: Inputs.TalentPoolCreateInput, required: true }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.talentPool.create({ data: args.data, ...query }),
  })
)

export const createOneTalentPoolMutation = defineMutation((t) => ({
  createOneTalentPool: t.prismaField(createOneTalentPoolMutationObject(t)),
}))
