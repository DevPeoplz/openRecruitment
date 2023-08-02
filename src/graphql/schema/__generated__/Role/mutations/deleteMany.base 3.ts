import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationObject,
} from '../../utils'

export const deleteManyRoleMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: { where: t.arg({ type: Inputs.RoleWhereInput, required: true }) },
    resolve: async (_root, args, _context, _info) =>
      await prisma.role.deleteMany({ where: args.where }),
  })
)

export const deleteManyRoleMutation = defineMutation((t) => ({
  deleteManyRole: t.field(deleteManyRoleMutationObject(t)),
}))
