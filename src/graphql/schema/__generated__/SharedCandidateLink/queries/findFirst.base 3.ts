import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineQuery,
  defineQueryFunction,
  defineQueryPrismaObject,
} from '../../utils'

export const findFirstSharedCandidateLinkQueryObject = defineQueryFunction(
  (t) =>
    defineQueryPrismaObject({
      type: 'SharedCandidateLink',
      nullable: true,
      args: {
        where: t.arg({
          type: Inputs.SharedCandidateLinkWhereInput,
          required: false,
        }),
        orderBy: t.arg({
          type: [Inputs.SharedCandidateLinkOrderByWithRelationInput],
          required: false,
        }),
        cursor: t.arg({
          type: Inputs.SharedCandidateLinkWhereUniqueInput,
          required: false,
        }),
        take: t.arg({ type: 'Int', required: false }),
        skip: t.arg({ type: 'Int', required: false }),
        distinct: t.arg({
          type: [Inputs.SharedCandidateLinkScalarFieldEnum],
          required: false,
        }),
      },
      resolve: async (query, _root, args, _context, _info) =>
        await prisma.sharedCandidateLink.findFirst({
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

export const findFirstSharedCandidateLinkQuery = defineQuery((t) => ({
  findFirstSharedCandidateLink: t.prismaField(
    findFirstSharedCandidateLinkQueryObject(t)
  ),
}))
