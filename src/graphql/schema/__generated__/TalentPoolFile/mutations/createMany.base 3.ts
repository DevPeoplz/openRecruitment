import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const createManyTalentPoolFileMutationObject = defineMutationFunction(
  (t) =>
    defineMutationPrismaObject({
      type: ['TalentPoolFile'],
      nullable: false,
      args: {
        data: t.arg({
          type: [Inputs.TalentPoolFileCreateInput],
          required: true,
        }),
      },
      resolve: async (_query, _root, args, _context, _info) =>
        await prisma.$transaction(
          args.data.map((data) => prisma.talentPoolFile.create({ data }))
        ),
    })
)

export const createManyTalentPoolFileMutation = defineMutation((t) => ({
  createManyTalentPoolFile: t.prismaField(
    createManyTalentPoolFileMutationObject(t)
  ),
}))
