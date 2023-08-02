import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const deleteOneVerificationTokenMutationObject = defineMutationFunction(
  (t) =>
    defineMutationPrismaObject({
      type: 'VerificationToken',
      nullable: true,
      args: {
        where: t.arg({
          type: Inputs.VerificationTokenWhereUniqueInput,
          required: true,
        }),
      },
      resolve: async (query, _root, args, _context, _info) =>
        await prisma.verificationToken.delete({ where: args.where, ...query }),
    })
)

export const deleteOneVerificationTokenMutation = defineMutation((t) => ({
  deleteOneVerificationToken: t.prismaField(
    deleteOneVerificationTokenMutationObject(t)
  ),
}))
