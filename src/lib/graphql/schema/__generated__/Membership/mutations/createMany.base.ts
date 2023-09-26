import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createManyMembershipMutationArgs = builder.args((t) => ({ data: t.field({ type: [Inputs.MembershipCreateInput], required: true }) }))

export const createManyMembershipMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['Membership'],
    nullable: false,
    args: createManyMembershipMutationArgs,
    resolve: async (_query, _root, args, _context, _info) =>
      await prisma.$transaction(args.data.map((data) => prisma.membership.create({ data }))),
  }),
);

export const createManyMembershipMutation = defineMutation((t) => ({
  createManyMembership: t.prismaField(createManyMembershipMutationObject(t)),
}));
