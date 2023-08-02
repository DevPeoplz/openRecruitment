import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const createManyAccountMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['Account'],
    nullable: false,
    args: {
      data: t.arg({ type: [Inputs.AccountCreateInput], required: true }),
    },
    resolve: async (_query, _root, args, _context, _info) =>
      await prisma.$transaction(
        args.data.map((data) => prisma.account.create({ data }))
      ),
  })
)

export const createManyAccountMutation = defineMutation((t) => ({
  createManyAccount: t.prismaField(createManyAccountMutationObject(t)),
}))
