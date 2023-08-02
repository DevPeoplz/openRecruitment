import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const createOneVerificationTokenMutationObject = defineMutationFunction(
  (t) =>
    defineMutationPrismaObject({
      type: 'VerificationToken',
      nullable: false,
      args: {
        data: t.arg({
          type: Inputs.VerificationTokenCreateInput,
          required: true,
        }),
      },
      resolve: async (query, _root, args, _context, _info) =>
        await prisma.verificationToken.create({ data: args.data, ...query }),
    })
)

export const createOneVerificationTokenMutation = defineMutation((t) => ({
  createOneVerificationToken: t.prismaField(
    createOneVerificationTokenMutationObject(t)
  ),
}))
