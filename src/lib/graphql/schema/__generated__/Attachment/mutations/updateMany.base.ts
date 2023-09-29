import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const updateManyAttachmentMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.AttachmentWhereInput, required: false }),
      data: t.field({ type: Inputs.AttachmentUpdateManyMutationInput, required: true }),
    }))

export const updateManyAttachmentMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: false,
    args: updateManyAttachmentMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.attachment.updateMany({ where: args.where || undefined, data: args.data }),
  }),
);

export const updateManyAttachmentMutation = defineMutation((t) => ({
  updateManyAttachment: t.field(updateManyAttachmentMutationObject(t)),
}));
