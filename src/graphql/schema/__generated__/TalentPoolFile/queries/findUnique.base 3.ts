import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineQuery,
  defineQueryFunction,
  defineQueryPrismaObject,
} from '../../utils'

export const findUniqueTalentPoolFileQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'TalentPoolFile',
    nullable: true,
    args: {
      where: t.arg({
        type: Inputs.TalentPoolFileWhereUniqueInput,
        required: true,
      }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.talentPoolFile.findUnique({ where: args.where, ...query }),
  })
)

export const findUniqueTalentPoolFileQuery = defineQuery((t) => ({
  findUniqueTalentPoolFile: t.prismaField(
    findUniqueTalentPoolFileQueryObject(t)
  ),
}))
