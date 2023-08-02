import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineQuery,
  defineQueryFunction,
  defineQueryPrismaObject,
} from '../../utils'

export const findUniqueVerificationTokenQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'VerificationToken',
    nullable: true,
    args: {
      where: t.arg({
        type: Inputs.VerificationTokenWhereUniqueInput,
        required: true,
      }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.verificationToken.findUnique({
        where: args.where,
        ...query,
      }),
  })
)

export const findUniqueVerificationTokenQuery = defineQuery((t) => ({
  findUniqueVerificationToken: t.prismaField(
    findUniqueVerificationTokenQueryObject(t)
  ),
}))
