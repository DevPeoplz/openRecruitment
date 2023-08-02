import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineQuery,
  defineQueryFunction,
  defineQueryPrismaObject,
} from '../../utils'

export const findUniqueTaskMemberQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'TaskMember',
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.TaskMemberWhereUniqueInput, required: true }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.taskMember.findUnique({ where: args.where, ...query }),
  })
)

export const findUniqueTaskMemberQuery = defineQuery((t) => ({
  findUniqueTaskMember: t.prismaField(findUniqueTaskMemberQueryObject(t)),
}))
