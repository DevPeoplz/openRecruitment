import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const upsertOneAttachmentMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.AttachmentWhereUniqueInput, required: true }),
      create: t.field({ type: Inputs.AttachmentCreateInput, required: true }),
      update: t.field({ type: Inputs.AttachmentUpdateInput, required: true }),
    }))

export const upsertOneAttachmentMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Attachment',
    nullable: false,
    args: upsertOneAttachmentMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.attachment.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      }),
  }),
);

export const upsertOneAttachmentMutation = defineMutation((t) => ({
  upsertOneAttachment: t.prismaField(upsertOneAttachmentMutationObject(t)),
}));
