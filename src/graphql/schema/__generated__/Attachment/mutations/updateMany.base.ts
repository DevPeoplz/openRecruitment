import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { prisma } from '@/prisma';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const updateManyAttachmentMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.AttachmentWhereInput, required: false }),
      data: t.arg({ type: Inputs.AttachmentUpdateManyMutationInput, required: true }),
    },
    resolve: async (_root, args, _context, _info) =>
      await prisma.attachment.updateMany({ where: args.where || undefined, data: args.data }),
  }),
);

export const updateManyAttachmentMutation = defineMutation((t) => ({
  updateManyAttachment: t.field(updateManyAttachmentMutationObject(t)),
}));