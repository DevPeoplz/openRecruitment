import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const deleteManyAttachmentMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.AttachmentWhereInput, required: true }) }))

export const deleteManyAttachmentMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: deleteManyAttachmentMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.attachment.deleteMany({ where: args.where }),
  }),
);

export const deleteManyAttachmentMutation = defineMutation((t) => ({
  deleteManyAttachment: t.field(deleteManyAttachmentMutationObject(t)),
}));
