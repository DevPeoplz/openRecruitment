import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineQuery,
  defineQueryFunction,
  defineQueryPrismaObject,
} from '../../utils'

export const findUniqueCompanyMetadataQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'CompanyMetadata',
    nullable: true,
    args: {
      where: t.arg({
        type: Inputs.CompanyMetadataWhereUniqueInput,
        required: true,
      }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.companyMetadata.findUnique({ where: args.where, ...query }),
  })
)

export const findUniqueCompanyMetadataQuery = defineQuery((t) => ({
  findUniqueCompanyMetadata: t.prismaField(
    findUniqueCompanyMetadataQueryObject(t)
  ),
}))
