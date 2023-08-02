import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineQuery,
  defineQueryFunction,
  defineQueryPrismaObject,
} from '../../utils'

export const findFirstTemplateQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'Template',
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.TemplateWhereInput, required: false }),
      orderBy: t.arg({
        type: [Inputs.TemplateOrderByWithRelationInput],
        required: false,
      }),
      cursor: t.arg({ type: Inputs.TemplateWhereUniqueInput, required: false }),
      take: t.arg({ type: 'Int', required: false }),
      skip: t.arg({ type: 'Int', required: false }),
      distinct: t.arg({
        type: [Inputs.TemplateScalarFieldEnum],
        required: false,
      }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.template.findFirst({
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

export const findFirstTemplateQuery = defineQuery((t) => ({
  findFirstTemplate: t.prismaField(findFirstTemplateQueryObject(t)),
}))
