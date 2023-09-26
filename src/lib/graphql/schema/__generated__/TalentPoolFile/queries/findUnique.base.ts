import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findUniqueTalentPoolFileQueryArgs = builder.args((t) => ({ where: t.field({ type: Inputs.TalentPoolFileWhereUniqueInput, required: true }) }))

export const findUniqueTalentPoolFileQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'TalentPoolFile',
    nullable: true,
    args: findUniqueTalentPoolFileQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.talentPoolFile.findUnique({ where: args.where, ...query }),
  }),
);

export const findUniqueTalentPoolFileQuery = defineQuery((t) => ({
  findUniqueTalentPoolFile: t.prismaField(findUniqueTalentPoolFileQueryObject(t)),
}));
