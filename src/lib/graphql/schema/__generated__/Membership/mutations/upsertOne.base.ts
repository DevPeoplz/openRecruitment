import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const upsertOneMembershipMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.MembershipWhereUniqueInput, required: true }),
      create: t.field({ type: Inputs.MembershipCreateInput, required: true }),
      update: t.field({ type: Inputs.MembershipUpdateInput, required: true }),
    }))

export const upsertOneMembershipMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Membership',
    nullable: false,
    args: upsertOneMembershipMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.membership.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      }),
  }),
);

export const upsertOneMembershipMutation = defineMutation((t) => ({
  upsertOneMembership: t.prismaField(upsertOneMembershipMutationObject(t)),
}));
