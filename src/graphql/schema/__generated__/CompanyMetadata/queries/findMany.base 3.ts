import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineQuery,
  defineQueryFunction,
  defineQueryPrismaObject,
} from '../../utils'

export const findManyCompanyMetadataQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: ['CompanyMetadata'],
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.CompanyMetadataWhereInput, required: false }),
      orderBy: t.arg({
        type: [Inputs.CompanyMetadataOrderByWithRelationInput],
        required: false,
      }),
      cursor: t.arg({
        type: Inputs.CompanyMetadataWhereUniqueInput,
        required: false,
      }),
      take: t.arg({ type: 'Int', required: false }),
      skip: t.arg({ type: 'Int', required: false }),
      distinct: t.arg({
        type: [Inputs.CompanyMetadataScalarFieldEnum],
        required: false,
      }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.companyMetadata.findMany({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        distinct: args.distinct || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
        ...query,
      }),
  })
)

export const findManyCompanyMetadataQuery = defineQuery((t) => ({
  findManyCompanyMetadata: t.prismaField(findManyCompanyMetadataQueryObject(t)),
}))
