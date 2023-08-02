import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineQuery,
  defineQueryFunction,
  defineQueryPrismaObject,
} from '../../utils'

export const findManyOfferFileQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: ['OfferFile'],
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.OfferFileWhereInput, required: false }),
      orderBy: t.arg({
        type: [Inputs.OfferFileOrderByWithRelationInput],
        required: false,
      }),
      cursor: t.arg({
        type: Inputs.OfferFileWhereUniqueInput,
        required: false,
      }),
      take: t.arg({ type: 'Int', required: false }),
      skip: t.arg({ type: 'Int', required: false }),
      distinct: t.arg({
        type: [Inputs.OfferFileScalarFieldEnum],
        required: false,
      }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.offerFile.findMany({
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

export const findManyOfferFileQuery = defineQuery((t) => ({
  findManyOfferFile: t.prismaField(findManyOfferFileQueryObject(t)),
}))
