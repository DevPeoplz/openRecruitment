import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineQuery,
  defineQueryFunction,
  defineQueryPrismaObject,
} from '../../utils'

export const findUniqueCandidateQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'Candidate',
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.CandidateWhereUniqueInput, required: true }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.candidate.findUnique({ where: args.where, ...query }),
  })
)

export const findUniqueCandidateQuery = defineQuery((t) => ({
  findUniqueCandidate: t.prismaField(findUniqueCandidateQueryObject(t)),
}))
