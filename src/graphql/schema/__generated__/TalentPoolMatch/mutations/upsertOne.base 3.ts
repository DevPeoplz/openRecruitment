import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const upsertOneTalentPoolMatchMutationObject = defineMutationFunction(
  (t) =>
    defineMutationPrismaObject({
      type: 'TalentPoolMatch',
      nullable: false,
      args: {
        where: t.arg({
          type: Inputs.TalentPoolMatchWhereUniqueInput,
          required: true,
        }),
        create: t.arg({
          type: Inputs.TalentPoolMatchCreateInput,
          required: true,
        }),
        update: t.arg({
          type: Inputs.TalentPoolMatchUpdateInput,
          required: true,
        }),
      },
      resolve: async (query, _root, args, _context, _info) =>
        await prisma.talentPoolMatch.upsert({
          where: args.where,
          create: args.create,
          update: args.update,
          ...query,
        }),
    })
)

export const upsertOneTalentPoolMatchMutation = defineMutation((t) => ({
  upsertOneTalentPoolMatch: t.prismaField(
    upsertOneTalentPoolMatchMutationObject(t)
  ),
}))
