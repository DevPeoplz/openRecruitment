import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationObject,
} from '../../utils'

export const updateManyCompanyMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.CompanyWhereInput, required: false }),
      data: t.arg({
        type: Inputs.CompanyUpdateManyMutationInput,
        required: true,
      }),
    },
    resolve: async (_root, args, _context, _info) =>
      await prisma.company.updateMany({
        where: args.where || undefined,
        data: args.data,
      }),
  })
)

export const updateManyCompanyMutation = defineMutation((t) => ({
  updateManyCompany: t.field(updateManyCompanyMutationObject(t)),
}))
