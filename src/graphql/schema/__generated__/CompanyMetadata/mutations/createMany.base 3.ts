import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const createManyCompanyMetadataMutationObject = defineMutationFunction(
  (t) =>
    defineMutationPrismaObject({
      type: ['CompanyMetadata'],
      nullable: false,
      args: {
        data: t.arg({
          type: [Inputs.CompanyMetadataCreateInput],
          required: true,
        }),
      },
      resolve: async (_query, _root, args, _context, _info) =>
        await prisma.$transaction(
          args.data.map((data) => prisma.companyMetadata.create({ data }))
        ),
    })
)

export const createManyCompanyMetadataMutation = defineMutation((t) => ({
  createManyCompanyMetadata: t.prismaField(
    createManyCompanyMetadataMutationObject(t)
  ),
}))
