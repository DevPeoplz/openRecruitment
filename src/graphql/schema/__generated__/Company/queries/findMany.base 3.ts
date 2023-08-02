import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineQuery,
  defineQueryFunction,
  defineQueryPrismaObject,
} from '../../utils'

export const findManyCompanyQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: ['Company'],
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.CompanyWhereInput, required: false }),
      orderBy: t.arg({
        type: [Inputs.CompanyOrderByWithRelationInput],
        required: false,
      }),
      cursor: t.arg({ type: Inputs.CompanyWhereUniqueInput, required: false }),
      take: t.arg({ type: 'Int', required: false }),
      skip: t.arg({ type: 'Int', required: false }),
      distinct: t.arg({
        type: [Inputs.CompanyScalarFieldEnum],
        required: false,
      }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.company.findMany({
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

export const findManyCompanyQuery = defineQuery((t) => ({
  findManyCompany: t.prismaField(findManyCompanyQueryObject(t)),
}))
