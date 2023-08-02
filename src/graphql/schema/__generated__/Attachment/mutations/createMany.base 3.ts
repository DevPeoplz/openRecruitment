import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const createManyAttachmentMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['Attachment'],
    nullable: false,
    args: {
      data: t.arg({ type: [Inputs.AttachmentCreateInput], required: true }),
    },
    resolve: async (_query, _root, args, _context, _info) =>
      await prisma.$transaction(
        args.data.map((data) => prisma.attachment.create({ data }))
      ),
  })
)

export const createManyAttachmentMutation = defineMutation((t) => ({
  createManyAttachment: t.prismaField(createManyAttachmentMutationObject(t)),
}))
