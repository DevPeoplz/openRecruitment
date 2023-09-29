import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const deleteOneMeetingRoomMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.MeetingRoomWhereUniqueInput, required: true }) }))

export const deleteOneMeetingRoomMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'MeetingRoom',
    nullable: true,
    args: deleteOneMeetingRoomMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.meetingRoom.delete({ where: args.where, ...query }),
  }),
);

export const deleteOneMeetingRoomMutation = defineMutation((t) => ({
  deleteOneMeetingRoom: t.prismaField(deleteOneMeetingRoomMutationObject(t)),
}));
