import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const createOneCompanyMetadataMutationObject = defineMutationFunction(
  (t) =>
    defineMutationPrismaObject({
      type: 'CompanyMetadata',
      nullable: false,
      args: {
        data: t.arg({
          type: Inputs.CompanyMetadataCreateInput,
          required: true,
        }),
      },
      resolve: async (query, _root, args, _context, _info) =>
        await prisma.companyMetadata.create({ data: args.data, ...query }),
    })
)

export const createOneCompanyMetadataMutation = defineMutation((t) => ({
  createOneCompanyMetadata: t.prismaField(
    createOneCompanyMetadataMutationObject(t)
  ),
}))
