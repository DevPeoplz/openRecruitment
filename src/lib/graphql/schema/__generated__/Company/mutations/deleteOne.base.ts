import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const deleteOneCompanyMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.CompanyWhereUniqueInput, required: true }) }))

export const deleteOneCompanyMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Company',
    nullable: true,
    args: deleteOneCompanyMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.company.delete({ where: args.where, ...query }),
  }),
);

export const deleteOneCompanyMutation = defineMutation((t) => ({
  deleteOneCompany: t.prismaField(deleteOneCompanyMutationObject(t)),
}));
