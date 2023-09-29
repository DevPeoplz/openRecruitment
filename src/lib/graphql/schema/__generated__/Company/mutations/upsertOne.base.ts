import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const upsertOneCompanyMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.CompanyWhereUniqueInput, required: true }),
      create: t.field({ type: Inputs.CompanyCreateInput, required: true }),
      update: t.field({ type: Inputs.CompanyUpdateInput, required: true }),
    }))

export const upsertOneCompanyMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Company',
    nullable: false,
    args: upsertOneCompanyMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.company.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      }),
  }),
);

export const upsertOneCompanyMutation = defineMutation((t) => ({
  upsertOneCompany: t.prismaField(upsertOneCompanyMutationObject(t)),
}));
