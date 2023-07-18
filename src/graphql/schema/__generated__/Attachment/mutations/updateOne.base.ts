import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const updateOneAttachmentMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Attachment',
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.AttachmentWhereUniqueInput, required: true }),
      data: t.arg({ type: Inputs.AttachmentUpdateInput, required: true }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.attachment.update({ where: args.where, data: args.data, ...query }),
  }),
);

export const updateOneAttachmentMutation = defineMutation((t) => ({
  updateOneAttachment: t.prismaField(updateOneAttachmentMutationObject(t)),
}));
