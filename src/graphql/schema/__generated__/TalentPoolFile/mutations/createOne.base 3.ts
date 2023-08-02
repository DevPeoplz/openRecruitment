import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const createOneTalentPoolFileMutationObject = defineMutationFunction(
  (t) =>
    defineMutationPrismaObject({
      type: 'TalentPoolFile',
      nullable: false,
      args: {
        data: t.arg({ type: Inputs.TalentPoolFileCreateInput, required: true }),
      },
      resolve: async (query, _root, args, _context, _info) =>
        await prisma.talentPoolFile.create({ data: args.data, ...query }),
    })
)

export const createOneTalentPoolFileMutation = defineMutation((t) => ({
  createOneTalentPoolFile: t.prismaField(
    createOneTalentPoolFileMutationObject(t)
  ),
}))
