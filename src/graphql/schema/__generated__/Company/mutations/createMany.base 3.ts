import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const createManyCompanyMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['Company'],
    nullable: false,
    args: {
      data: t.arg({ type: [Inputs.CompanyCreateInput], required: true }),
    },
    resolve: async (_query, _root, args, _context, _info) =>
      await prisma.$transaction(
        args.data.map((data) => prisma.company.create({ data }))
      ),
  })
)

export const createManyCompanyMutation = defineMutation((t) => ({
  createManyCompany: t.prismaField(createManyCompanyMutationObject(t)),
}))
