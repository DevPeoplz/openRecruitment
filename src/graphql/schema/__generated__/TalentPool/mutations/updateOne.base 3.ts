import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const updateOneTalentPoolMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'TalentPool',
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.TalentPoolWhereUniqueInput, required: true }),
      data: t.arg({ type: Inputs.TalentPoolUpdateInput, required: true }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.talentPool.update({
        where: args.where,
        data: args.data,
        ...query,
      }),
  })
)

export const updateOneTalentPoolMutation = defineMutation((t) => ({
  updateOneTalentPool: t.prismaField(updateOneTalentPoolMutationObject(t)),
}))
