import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineQuery,
  defineQueryFunction,
  defineQueryPrismaObject,
} from '../../utils'

export const findUniqueCandidateTagQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'CandidateTag',
    nullable: true,
    args: {
      where: t.arg({
        type: Inputs.CandidateTagWhereUniqueInput,
        required: true,
      }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.candidateTag.findUnique({ where: args.where, ...query }),
  })
)

export const findUniqueCandidateTagQuery = defineQuery((t) => ({
  findUniqueCandidateTag: t.prismaField(findUniqueCandidateTagQueryObject(t)),
}))
