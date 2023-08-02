import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const upsertOneCompanyMetadataMutationObject = defineMutationFunction(
  (t) =>
    defineMutationPrismaObject({
      type: 'CompanyMetadata',
      nullable: false,
      args: {
        where: t.arg({
          type: Inputs.CompanyMetadataWhereUniqueInput,
          required: true,
        }),
        create: t.arg({
          type: Inputs.CompanyMetadataCreateInput,
          required: true,
        }),
        update: t.arg({
          type: Inputs.CompanyMetadataUpdateInput,
          required: true,
        }),
      },
      resolve: async (query, _root, args, _context, _info) =>
        await prisma.companyMetadata.upsert({
          where: args.where,
          create: args.create,
          update: args.update,
          ...query,
        }),
    })
)

export const upsertOneCompanyMetadataMutation = defineMutation((t) => ({
  upsertOneCompanyMetadata: t.prismaField(
    upsertOneCompanyMetadataMutationObject(t)
  ),
}))
