import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findUniqueCandidateCustomFieldsQueryArgs = builder.args((t) => ({ where: t.field({ type: Inputs.CandidateCustomFieldsWhereUniqueInput, required: true }) }))

export const findUniqueCandidateCustomFieldsQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'CandidateCustomFields',
    nullable: true,
    args: findUniqueCandidateCustomFieldsQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.candidateCustomFields.findUnique({ where: args.where, ...query }),
  }),
);

export const findUniqueCandidateCustomFieldsQuery = defineQuery((t) => ({
  findUniqueCandidateCustomFields: t.prismaField(findUniqueCandidateCustomFieldsQueryObject(t)),
}));
