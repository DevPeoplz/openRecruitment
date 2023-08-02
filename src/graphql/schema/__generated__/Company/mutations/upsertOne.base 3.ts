import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const upsertOneCompanyMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Company',
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.CompanyWhereUniqueInput, required: true }),
      create: t.arg({ type: Inputs.CompanyCreateInput, required: true }),
      update: t.arg({ type: Inputs.CompanyUpdateInput, required: true }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.company.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      }),
  })
)

export const upsertOneCompanyMutation = defineMutation((t) => ({
  upsertOneCompany: t.prismaField(upsertOneCompanyMutationObject(t)),
}))
