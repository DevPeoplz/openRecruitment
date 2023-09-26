import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findUniqueAttachmentQueryArgs = builder.args((t) => ({ where: t.field({ type: Inputs.AttachmentWhereUniqueInput, required: true }) }))

export const findUniqueAttachmentQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'Attachment',
    nullable: true,
    args: findUniqueAttachmentQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.attachment.findUnique({ where: args.where, ...query }),
  }),
);

export const findUniqueAttachmentQuery = defineQuery((t) => ({
  findUniqueAttachment: t.prismaField(findUniqueAttachmentQueryObject(t)),
}));
