import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const updateOneVerificationTokenMutationObject = defineMutationFunction(
  (t) =>
    defineMutationPrismaObject({
      type: 'VerificationToken',
      nullable: true,
      args: {
        where: t.arg({
          type: Inputs.VerificationTokenWhereUniqueInput,
          required: true,
        }),
        data: t.arg({
          type: Inputs.VerificationTokenUpdateInput,
          required: true,
        }),
      },
      resolve: async (query, _root, args, _context, _info) =>
        await prisma.verificationToken.update({
          where: args.where,
          data: args.data,
          ...query,
        }),
    })
)

export const updateOneVerificationTokenMutation = defineMutation((t) => ({
  updateOneVerificationToken: t.prismaField(
    updateOneVerificationTokenMutationObject(t)
  ),
}))
