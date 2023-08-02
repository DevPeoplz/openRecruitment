import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const upsertOneDepartmentMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Department',
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.DepartmentWhereUniqueInput, required: true }),
      create: t.arg({ type: Inputs.DepartmentCreateInput, required: true }),
      update: t.arg({ type: Inputs.DepartmentUpdateInput, required: true }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.department.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      }),
  })
)

export const upsertOneDepartmentMutation = defineMutation((t) => ({
  upsertOneDepartment: t.prismaField(upsertOneDepartmentMutationObject(t)),
}))
