import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const deleteOneCompanyMetadataMutationObject = defineMutationFunction(
  (t) =>
    defineMutationPrismaObject({
      type: 'CompanyMetadata',
      nullable: true,
      args: {
        where: t.arg({
          type: Inputs.CompanyMetadataWhereUniqueInput,
          required: true,
        }),
      },
      resolve: async (query, _root, args, _context, _info) =>
        await prisma.companyMetadata.delete({ where: args.where, ...query }),
    })
)

export const deleteOneCompanyMetadataMutation = defineMutation((t) => ({
  deleteOneCompanyMetadata: t.prismaField(
    deleteOneCompanyMetadataMutationObject(t)
  ),
}))
