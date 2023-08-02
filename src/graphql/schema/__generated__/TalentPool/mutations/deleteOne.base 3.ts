import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const deleteOneTalentPoolMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'TalentPool',
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.TalentPoolWhereUniqueInput, required: true }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.talentPool.delete({ where: args.where, ...query }),
  })
)

export const deleteOneTalentPoolMutation = defineMutation((t) => ({
  deleteOneTalentPool: t.prismaField(deleteOneTalentPoolMutationObject(t)),
}))
