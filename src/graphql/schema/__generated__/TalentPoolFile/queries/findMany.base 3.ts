import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineQuery,
  defineQueryFunction,
  defineQueryPrismaObject,
} from '../../utils'

export const findManyTalentPoolFileQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: ['TalentPoolFile'],
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.TalentPoolFileWhereInput, required: false }),
      orderBy: t.arg({
        type: [Inputs.TalentPoolFileOrderByWithRelationInput],
        required: false,
      }),
      cursor: t.arg({
        type: Inputs.TalentPoolFileWhereUniqueInput,
        required: false,
      }),
      take: t.arg({ type: 'Int', required: false }),
      skip: t.arg({ type: 'Int', required: false }),
      distinct: t.arg({
        type: [Inputs.TalentPoolFileScalarFieldEnum],
        required: false,
      }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.talentPoolFile.findMany({
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

export const findManyTalentPoolFileQuery = defineQuery((t) => ({
  findManyTalentPoolFile: t.prismaField(findManyTalentPoolFileQueryObject(t)),
}))
