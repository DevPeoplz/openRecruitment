import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createManyAttachmentMutationArgs = builder.args((t) => ({ data: t.field({ type: [Inputs.AttachmentCreateInput], required: true }) }))

export const createManyAttachmentMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['Attachment'],
    nullable: false,
    args: createManyAttachmentMutationArgs,
    resolve: async (_query, _root, args, _context, _info) =>
      await prisma.$transaction(args.data.map((data) => prisma.attachment.create({ data }))),
  }),
);

export const createManyAttachmentMutation = defineMutation((t) => ({
  createManyAttachment: t.prismaField(createManyAttachmentMutationObject(t)),
}));
