import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationObject,
} from '../../utils'

export const updateManyVerificationTokenMutationObject = defineMutationFunction(
  (t) =>
    defineMutationObject({
      type: BatchPayload,
      nullable: false,
      args: {
        where: t.arg({
          type: Inputs.VerificationTokenWhereInput,
          required: false,
        }),
        data: t.arg({
          type: Inputs.VerificationTokenUpdateManyMutationInput,
          required: true,
        }),
      },
      resolve: async (_root, args, _context, _info) =>
        await prisma.verificationToken.updateMany({
          where: args.where || undefined,
          data: args.data,
        }),
    })
)

export const updateManyVerificationTokenMutation = defineMutation((t) => ({
  updateManyVerificationToken: t.field(
    updateManyVerificationTokenMutationObject(t)
  ),
}))
