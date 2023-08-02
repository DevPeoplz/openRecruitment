import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const updateOneTalentPoolFileMutationObject = defineMutationFunction(
  (t) =>
    defineMutationPrismaObject({
      type: 'TalentPoolFile',
      nullable: true,
      args: {
        where: t.arg({
          type: Inputs.TalentPoolFileWhereUniqueInput,
          required: true,
        }),
        data: t.arg({ type: Inputs.TalentPoolFileUpdateInput, required: true }),
      },
      resolve: async (query, _root, args, _context, _info) =>
        await prisma.talentPoolFile.update({
          where: args.where,
          data: args.data,
          ...query,
        }),
    })
)

export const updateOneTalentPoolFileMutation = defineMutation((t) => ({
  updateOneTalentPoolFile: t.prismaField(
    updateOneTalentPoolFileMutationObject(t)
  ),
}))
