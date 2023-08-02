import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationObject,
} from '../../utils'

export const deleteManyHiringRoleMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.HiringRoleWhereInput, required: true }),
    },
    resolve: async (_root, args, _context, _info) =>
      await prisma.hiringRole.deleteMany({ where: args.where }),
  })
)

export const deleteManyHiringRoleMutation = defineMutation((t) => ({
  deleteManyHiringRole: t.field(deleteManyHiringRoleMutationObject(t)),
}))
