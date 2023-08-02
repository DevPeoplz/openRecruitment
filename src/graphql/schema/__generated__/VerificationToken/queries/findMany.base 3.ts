import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineQuery,
  defineQueryFunction,
  defineQueryPrismaObject,
} from '../../utils'

export const findManyVerificationTokenQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: ['VerificationToken'],
    nullable: false,
    args: {
      where: t.arg({
        type: Inputs.VerificationTokenWhereInput,
        required: false,
      }),
      orderBy: t.arg({
        type: [Inputs.VerificationTokenOrderByWithRelationInput],
        required: false,
      }),
      cursor: t.arg({
        type: Inputs.VerificationTokenWhereUniqueInput,
        required: false,
      }),
      take: t.arg({ type: 'Int', required: false }),
      skip: t.arg({ type: 'Int', required: false }),
      distinct: t.arg({
        type: [Inputs.VerificationTokenScalarFieldEnum],
        required: false,
      }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.verificationToken.findMany({
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

export const findManyVerificationTokenQuery = defineQuery((t) => ({
  findManyVerificationToken: t.prismaField(
    findManyVerificationTokenQueryObject(t)
  ),
}))
