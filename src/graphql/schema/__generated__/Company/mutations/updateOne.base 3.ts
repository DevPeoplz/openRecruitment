import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const updateOneCompanyMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Company',
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.CompanyWhereUniqueInput, required: true }),
      data: t.arg({ type: Inputs.CompanyUpdateInput, required: true }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.company.update({
        where: args.where,
        data: args.data,
        ...query,
      }),
  })
)

export const updateOneCompanyMutation = defineMutation((t) => ({
  updateOneCompany: t.prismaField(updateOneCompanyMutationObject(t)),
}))
