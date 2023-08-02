import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const updateOneCompanyMetadataMutationObject = defineMutationFunction(
  (t) =>
    defineMutationPrismaObject({
      type: 'CompanyMetadata',
      nullable: true,
      args: {
        where: t.arg({
          type: Inputs.CompanyMetadataWhereUniqueInput,
          required: true,
        }),
        data: t.arg({
          type: Inputs.CompanyMetadataUpdateInput,
          required: true,
        }),
      },
      resolve: async (query, _root, args, _context, _info) =>
        await prisma.companyMetadata.update({
          where: args.where,
          data: args.data,
          ...query,
        }),
    })
)

export const updateOneCompanyMetadataMutation = defineMutation((t) => ({
  updateOneCompanyMetadata: t.prismaField(
    updateOneCompanyMetadataMutationObject(t)
  ),
}))
