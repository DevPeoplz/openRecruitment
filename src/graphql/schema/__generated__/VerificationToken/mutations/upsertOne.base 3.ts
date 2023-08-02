import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const upsertOneVerificationTokenMutationObject = defineMutationFunction(
  (t) =>
    defineMutationPrismaObject({
      type: 'VerificationToken',
      nullable: false,
      args: {
        where: t.arg({
          type: Inputs.VerificationTokenWhereUniqueInput,
          required: true,
        }),
        create: t.arg({
          type: Inputs.VerificationTokenCreateInput,
          required: true,
        }),
        update: t.arg({
          type: Inputs.VerificationTokenUpdateInput,
          required: true,
        }),
      },
      resolve: async (query, _root, args, _context, _info) =>
        await prisma.verificationToken.upsert({
          where: args.where,
          create: args.create,
          update: args.update,
          ...query,
        }),
    })
)

export const upsertOneVerificationTokenMutation = defineMutation((t) => ({
  upsertOneVerificationToken: t.prismaField(
    upsertOneVerificationTokenMutationObject(t)
  ),
}))
