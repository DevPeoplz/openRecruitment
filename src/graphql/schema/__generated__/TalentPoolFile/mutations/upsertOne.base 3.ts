import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const upsertOneTalentPoolFileMutationObject = defineMutationFunction(
  (t) =>
    defineMutationPrismaObject({
      type: 'TalentPoolFile',
      nullable: false,
      args: {
        where: t.arg({
          type: Inputs.TalentPoolFileWhereUniqueInput,
          required: true,
        }),
        create: t.arg({
          type: Inputs.TalentPoolFileCreateInput,
          required: true,
        }),
        update: t.arg({
          type: Inputs.TalentPoolFileUpdateInput,
          required: true,
        }),
      },
      resolve: async (query, _root, args, _context, _info) =>
        await prisma.talentPoolFile.upsert({
          where: args.where,
          create: args.create,
          update: args.update,
          ...query,
        }),
    })
)

export const upsertOneTalentPoolFileMutation = defineMutation((t) => ({
  upsertOneTalentPoolFile: t.prismaField(
    upsertOneTalentPoolFileMutationObject(t)
  ),
}))
