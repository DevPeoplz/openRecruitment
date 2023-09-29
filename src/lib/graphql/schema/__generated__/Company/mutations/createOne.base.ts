import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createOneCompanyMutationArgs = builder.args((t) => ({ data: t.field({ type: Inputs.CompanyCreateInput, required: true }) }))

export const createOneCompanyMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Company',
    nullable: false,
    args: createOneCompanyMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.company.create({ data: args.data, ...query }),
  }),
);

export const createOneCompanyMutation = defineMutation((t) => ({
  createOneCompany: t.prismaField(createOneCompanyMutationObject(t)),
}));
