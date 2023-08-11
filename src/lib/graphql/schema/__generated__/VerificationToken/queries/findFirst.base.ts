import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findFirstVerificationTokenQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'VerificationToken',
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.VerificationTokenWhereInput, required: false }),
      orderBy: t.arg({ type: [Inputs.VerificationTokenOrderByWithRelationInput], required: false }),
      cursor: t.arg({ type: Inputs.VerificationTokenWhereUniqueInput, required: false }),
      take: t.arg({ type: 'Int', required: false }),
      skip: t.arg({ type: 'Int', required: false }),
      distinct: t.arg({ type: [Inputs.VerificationTokenScalarFieldEnum], required: false }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.verificationToken.findFirst({
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

export const findFirstVerificationTokenQuery = defineQuery((t) => ({
  findFirstVerificationToken: t.prismaField(findFirstVerificationTokenQueryObject(t)),
}));