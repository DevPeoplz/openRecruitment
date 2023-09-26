import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findManyVerificationTokenQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.VerificationTokenWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.VerificationTokenOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.VerificationTokenWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.VerificationTokenScalarFieldEnum], required: false }),
}))

export const findManyVerificationTokenQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: ['VerificationToken'],
    nullable: false,
    args: findManyVerificationTokenQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.verificationToken.findMany({
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

export const findManyVerificationTokenQuery = defineQuery((t) => ({
  findManyVerificationToken: t.prismaField(findManyVerificationTokenQueryObject(t)),
}));
