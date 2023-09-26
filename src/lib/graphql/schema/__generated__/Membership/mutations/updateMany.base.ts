import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const updateManyMembershipMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.MembershipWhereInput, required: false }),
      data: t.field({ type: Inputs.MembershipUpdateManyMutationInput, required: true }),
    }))

export const updateManyMembershipMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: false,
    args: updateManyMembershipMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.membership.updateMany({ where: args.where || undefined, data: args.data }),
  }),
);

export const updateManyMembershipMutation = defineMutation((t) => ({
  updateManyMembership: t.field(updateManyMembershipMutationObject(t)),
}));
