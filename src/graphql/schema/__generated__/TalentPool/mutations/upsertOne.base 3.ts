import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const upsertOneTalentPoolMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'TalentPool',
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.TalentPoolWhereUniqueInput, required: true }),
      create: t.arg({ type: Inputs.TalentPoolCreateInput, required: true }),
      update: t.arg({ type: Inputs.TalentPoolUpdateInput, required: true }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.talentPool.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      }),
  })
)

export const upsertOneTalentPoolMutation = defineMutation((t) => ({
  upsertOneTalentPool: t.prismaField(upsertOneTalentPoolMutationObject(t)),
}))
