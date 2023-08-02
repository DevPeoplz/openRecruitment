import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineQuery,
  defineQueryFunction,
  defineQueryPrismaObject,
} from '../../utils'

export const findManyTaskQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: ['Task'],
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.TaskWhereInput, required: false }),
      orderBy: t.arg({
        type: [Inputs.TaskOrderByWithRelationInput],
        required: false,
      }),
      cursor: t.arg({ type: Inputs.TaskWhereUniqueInput, required: false }),
      take: t.arg({ type: 'Int', required: false }),
      skip: t.arg({ type: 'Int', required: false }),
      distinct: t.arg({ type: [Inputs.TaskScalarFieldEnum], required: false }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.task.findMany({
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

export const findManyTaskQuery = defineQuery((t) => ({
  findManyTask: t.prismaField(findManyTaskQueryObject(t)),
}))
