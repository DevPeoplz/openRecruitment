import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const updateOneTalentPoolMatchMutationObject = defineMutationFunction(
  (t) =>
    defineMutationPrismaObject({
      type: 'TalentPoolMatch',
      nullable: true,
      args: {
        where: t.arg({
          type: Inputs.TalentPoolMatchWhereUniqueInput,
          required: true,
        }),
        data: t.arg({
          type: Inputs.TalentPoolMatchUpdateInput,
          required: true,
        }),
      },
      resolve: async (query, _root, args, _context, _info) =>
        await prisma.talentPoolMatch.update({
          where: args.where,
          data: args.data,
          ...query,
        }),
    })
)

export const updateOneTalentPoolMatchMutation = defineMutation((t) => ({
  updateOneTalentPoolMatch: t.prismaField(
    updateOneTalentPoolMatchMutationObject(t)
  ),
}))
