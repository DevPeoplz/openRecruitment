import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationObject,
} from '../../utils'

export const deleteManyDepartmentMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.DepartmentWhereInput, required: true }),
    },
    resolve: async (_root, args, _context, _info) =>
      await prisma.department.deleteMany({ where: args.where }),
  })
)

export const deleteManyDepartmentMutation = defineMutation((t) => ({
  deleteManyDepartment: t.field(deleteManyDepartmentMutationObject(t)),
}))
