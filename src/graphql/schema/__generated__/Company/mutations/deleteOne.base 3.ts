import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const deleteOneCompanyMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Company',
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.CompanyWhereUniqueInput, required: true }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.company.delete({ where: args.where, ...query }),
  })
)

export const deleteOneCompanyMutation = defineMutation((t) => ({
  deleteOneCompany: t.prismaField(deleteOneCompanyMutationObject(t)),
}))
