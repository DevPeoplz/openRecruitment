import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const updateOneAttachmentMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.AttachmentWhereUniqueInput, required: true }),
      data: t.field({ type: Inputs.AttachmentUpdateInput, required: true }),
    }))

export const updateOneAttachmentMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Attachment',
    nullable: true,
    args: updateOneAttachmentMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.attachment.update({ where: args.where, data: args.data, ...query }),
  }),
);

export const updateOneAttachmentMutation = defineMutation((t) => ({
  updateOneAttachment: t.prismaField(updateOneAttachmentMutationObject(t)),
}));
