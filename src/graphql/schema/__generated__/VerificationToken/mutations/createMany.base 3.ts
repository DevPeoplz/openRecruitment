import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const createManyVerificationTokenMutationObject = defineMutationFunction(
  (t) =>
    defineMutationPrismaObject({
      type: ['VerificationToken'],
      nullable: false,
      args: {
        data: t.arg({
          type: [Inputs.VerificationTokenCreateInput],
          required: true,
        }),
      },
      resolve: async (_query, _root, args, _context, _info) =>
        await prisma.$transaction(
          args.data.map((data) => prisma.verificationToken.create({ data }))
        ),
    })
)

export const createManyVerificationTokenMutation = defineMutation((t) => ({
  createManyVerificationToken: t.prismaField(
    createManyVerificationTokenMutationObject(t)
  ),
}))
