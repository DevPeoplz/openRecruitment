import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineQuery,
  defineQueryFunction,
  defineQueryPrismaObject,
} from '../../utils'

export const findUniqueTalentPoolQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'TalentPool',
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.TalentPoolWhereUniqueInput, required: true }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.talentPool.findUnique({ where: args.where, ...query }),
  })
)

export const findUniqueTalentPoolQuery = defineQuery((t) => ({
  findUniqueTalentPool: t.prismaField(findUniqueTalentPoolQueryObject(t)),
}))
