import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineQuery,
  defineQueryFunction,
  defineQueryPrismaObject,
} from '../../utils'

export const findUniqueDisqualifyReasonQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'DisqualifyReason',
    nullable: true,
    args: {
      where: t.arg({
        type: Inputs.DisqualifyReasonWhereUniqueInput,
        required: true,
      }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.disqualifyReason.findUnique({ where: args.where, ...query }),
  })
)

export const findUniqueDisqualifyReasonQuery = defineQuery((t) => ({
  findUniqueDisqualifyReason: t.prismaField(
    findUniqueDisqualifyReasonQueryObject(t)
  ),
}))
