import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createManyCompanyMutationArgs = builder.args((t) => ({ data: t.field({ type: [Inputs.CompanyCreateInput], required: true }) }))

export const createManyCompanyMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['Company'],
    nullable: false,
    args: createManyCompanyMutationArgs,
    resolve: async (_query, _root, args, _context, _info) =>
      await prisma.$transaction(args.data.map((data) => prisma.company.create({ data }))),
  }),
);

export const createManyCompanyMutation = defineMutation((t) => ({
  createManyCompany: t.prismaField(createManyCompanyMutationObject(t)),
}));
