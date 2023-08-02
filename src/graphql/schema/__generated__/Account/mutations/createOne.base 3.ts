import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const createOneAccountMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Account',
    nullable: false,
    args: { data: t.arg({ type: Inputs.AccountCreateInput, required: true }) },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.account.create({ data: args.data, ...query }),
  })
)

export const createOneAccountMutation = defineMutation((t) => ({
  createOneAccount: t.prismaField(createOneAccountMutationObject(t)),
}))
