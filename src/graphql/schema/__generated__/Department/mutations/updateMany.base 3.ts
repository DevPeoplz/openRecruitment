import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationObject,
} from '../../utils'

export const updateManyDepartmentMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.DepartmentWhereInput, required: false }),
      data: t.arg({
        type: Inputs.DepartmentUpdateManyMutationInput,
        required: true,
      }),
    },
    resolve: async (_root, args, _context, _info) =>
      await prisma.department.updateMany({
        where: args.where || undefined,
        data: args.data,
      }),
  })
)

export const updateManyDepartmentMutation = defineMutation((t) => ({
  updateManyDepartment: t.field(updateManyDepartmentMutationObject(t)),
}))
