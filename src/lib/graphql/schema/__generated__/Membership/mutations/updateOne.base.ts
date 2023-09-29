import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const updateOneMembershipMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.MembershipWhereUniqueInput, required: true }),
      data: t.field({ type: Inputs.MembershipUpdateInput, required: true }),
    }))

export const updateOneMembershipMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Membership',
    nullable: true,
    args: updateOneMembershipMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.membership.update({ where: args.where, data: args.data, ...query }),
  }),
);

export const updateOneMembershipMutation = defineMutation((t) => ({
  updateOneMembership: t.prismaField(updateOneMembershipMutationObject(t)),
}));
