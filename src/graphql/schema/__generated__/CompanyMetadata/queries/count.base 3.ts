import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineQuery,
  defineQueryFunction,
  defineQueryObject,
} from '../../utils'

export const countCompanyMetadataQueryObject = defineQueryFunction((t) =>
  defineQueryObject({
    type: 'Int',
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
    resolve: async (_root, args, _context, _info) =>
      await prisma.companyMetadata.count({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        distinct: args.distinct || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
      }),
  })
)

export const countCompanyMetadataQuery = defineQuery((t) => ({
  countCompanyMetadata: t.field(countCompanyMetadataQueryObject(t)),
}))
