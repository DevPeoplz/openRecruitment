import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const deleteManyMembershipMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.MembershipWhereInput, required: true }) }))

export const deleteManyMembershipMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: deleteManyMembershipMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.membership.deleteMany({ where: args.where }),
  }),
);

export const deleteManyMembershipMutation = defineMutation((t) => ({
  deleteManyMembership: t.field(deleteManyMembershipMutationObject(t)),
}));
