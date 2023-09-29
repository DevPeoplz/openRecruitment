import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findManyTalentPoolFileQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.TalentPoolFileWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.TalentPoolFileOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.TalentPoolFileWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.TalentPoolFileScalarFieldEnum], required: false }),
}))

export const findManyTalentPoolFileQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: ['TalentPoolFile'],
    nullable: false,
    args: findManyTalentPoolFileQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.talentPoolFile.findMany({
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

export const findManyTalentPoolFileQuery = defineQuery((t) => ({
  findManyTalentPoolFile: t.prismaField(findManyTalentPoolFileQueryObject(t)),
}));
