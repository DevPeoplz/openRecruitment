import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryObject } from '../../utils';

export const countVerificationTokenQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.VerificationTokenWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.VerificationTokenOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.VerificationTokenWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.VerificationTokenScalarFieldEnum], required: false }),
}))

export const countVerificationTokenQueryObject = defineQueryFunction((t) =>
  defineQueryObject({
    type: 'Int',
    nullable: false,
    args: countVerificationTokenQueryArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.verificationToken.count({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        distinct: args.distinct || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
      }),
  }),
);

export const countVerificationTokenQuery = defineQuery((t) => ({
  countVerificationToken: t.field(countVerificationTokenQueryObject(t)),
}));
