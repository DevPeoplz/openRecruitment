import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findFirstAttachmentQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.AttachmentWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.AttachmentOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.AttachmentWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.AttachmentScalarFieldEnum], required: false }),
}))

export const findFirstAttachmentQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'Attachment',
    nullable: true,
    args: findFirstAttachmentQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.attachment.findFirst({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        distinct: args.distinct || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
        ...query,
      }),
  }),
);

export const findFirstAttachmentQuery = defineQuery((t) => ({
  findFirstAttachment: t.prismaField(findFirstAttachmentQueryObject(t)),
}));
