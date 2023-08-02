import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const deleteOneTalentPoolFileMutationObject = defineMutationFunction(
  (t) =>
    defineMutationPrismaObject({
      type: 'TalentPoolFile',
      nullable: true,
      args: {
        where: t.arg({
          type: Inputs.TalentPoolFileWhereUniqueInput,
          required: true,
        }),
      },
      resolve: async (query, _root, args, _context, _info) =>
        await prisma.talentPoolFile.delete({ where: args.where, ...query }),
    })
)

export const deleteOneTalentPoolFileMutation = defineMutation((t) => ({
  deleteOneTalentPoolFile: t.prismaField(
    deleteOneTalentPoolFileMutationObject(t)
  ),
}))
