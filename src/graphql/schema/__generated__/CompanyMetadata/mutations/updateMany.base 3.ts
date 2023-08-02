import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationObject,
} from '../../utils'

export const updateManyCompanyMetadataMutationObject = defineMutationFunction(
  (t) =>
    defineMutationObject({
      type: BatchPayload,
      nullable: false,
      args: {
        where: t.arg({
          type: Inputs.CompanyMetadataWhereInput,
          required: false,
        }),
        data: t.arg({
          type: Inputs.CompanyMetadataUpdateManyMutationInput,
          required: true,
        }),
      },
      resolve: async (_root, args, _context, _info) =>
        await prisma.companyMetadata.updateMany({
          where: args.where || undefined,
          data: args.data,
        }),
    })
)

export const updateManyCompanyMetadataMutation = defineMutation((t) => ({
  updateManyCompanyMetadata: t.field(
    updateManyCompanyMetadataMutationObject(t)
  ),
}))
