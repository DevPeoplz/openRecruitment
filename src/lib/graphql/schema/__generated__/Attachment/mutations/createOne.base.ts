import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createOneAttachmentMutationArgs = builder.args((t) => ({ data: t.field({ type: Inputs.AttachmentCreateInput, required: true }) }))

export const createOneAttachmentMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Attachment',
    nullable: false,
    args: createOneAttachmentMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.attachment.create({ data: args.data, ...query }),
  }),
);

export const createOneAttachmentMutation = defineMutation((t) => ({
  createOneAttachment: t.prismaField(createOneAttachmentMutationObject(t)),
}));
