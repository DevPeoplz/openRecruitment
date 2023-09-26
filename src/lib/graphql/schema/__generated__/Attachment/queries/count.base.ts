import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryObject } from '../../utils';

export const countAttachmentQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.AttachmentWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.AttachmentOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.AttachmentWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.AttachmentScalarFieldEnum], required: false }),
}))

export const countAttachmentQueryObject = defineQueryFunction((t) =>
  defineQueryObject({
    type: 'Int',
    nullable: false,
    args: countAttachmentQueryArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.attachment.count({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        distinct: args.distinct || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
      }),
  }),
);

export const countAttachmentQuery = defineQuery((t) => ({
  countAttachment: t.field(countAttachmentQueryObject(t)),
}));
