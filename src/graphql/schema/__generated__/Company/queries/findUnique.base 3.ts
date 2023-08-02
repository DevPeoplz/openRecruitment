import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineQuery,
  defineQueryFunction,
  defineQueryPrismaObject,
} from '../../utils'

export const findUniqueCompanyQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'Company',
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.CompanyWhereUniqueInput, required: true }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.company.findUnique({ where: args.where, ...query }),
  })
)

export const findUniqueCompanyQuery = defineQuery((t) => ({
  findUniqueCompany: t.prismaField(findUniqueCompanyQueryObject(t)),
}))
