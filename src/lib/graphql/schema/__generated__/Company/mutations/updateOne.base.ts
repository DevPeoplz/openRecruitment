import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const updateOneCompanyMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.CompanyWhereUniqueInput, required: true }),
      data: t.field({ type: Inputs.CompanyUpdateInput, required: true }),
    }))

export const updateOneCompanyMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Company',
    nullable: true,
    args: updateOneCompanyMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.company.update({ where: args.where, data: args.data, ...query }),
  }),
);

export const updateOneCompanyMutation = defineMutation((t) => ({
  updateOneCompany: t.prismaField(updateOneCompanyMutationObject(t)),
}));
