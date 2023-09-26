import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const upsertOneDepartmentMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.DepartmentWhereUniqueInput, required: true }),
      create: t.field({ type: Inputs.DepartmentCreateInput, required: true }),
      update: t.field({ type: Inputs.DepartmentUpdateInput, required: true }),
    }))

export const upsertOneDepartmentMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Department',
    nullable: false,
    args: upsertOneDepartmentMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.department.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      }),
  }),
);

export const upsertOneDepartmentMutation = defineMutation((t) => ({
  upsertOneDepartment: t.prismaField(upsertOneDepartmentMutationObject(t)),
}));
