import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const createOneCompanyMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Company',
    nullable: false,
    args: { data: t.arg({ type: Inputs.CompanyCreateInput, required: true }) },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.company.create({ data: args.data, ...query }),
  })
)

export const createOneCompanyMutation = defineMutation((t) => ({
  createOneCompany: t.prismaField(createOneCompanyMutationObject(t)),
}))
