import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const deleteOneTalentPoolMatchMutationObject = defineMutationFunction(
  (t) =>
    defineMutationPrismaObject({
      type: 'TalentPoolMatch',
      nullable: true,
      args: {
        where: t.arg({
          type: Inputs.TalentPoolMatchWhereUniqueInput,
          required: true,
        }),
      },
      resolve: async (query, _root, args, _context, _info) =>
        await prisma.talentPoolMatch.delete({ where: args.where, ...query }),
    })
)

export const deleteOneTalentPoolMatchMutation = defineMutation((t) => ({
  deleteOneTalentPoolMatch: t.prismaField(
    deleteOneTalentPoolMatchMutationObject(t)
  ),
}))
