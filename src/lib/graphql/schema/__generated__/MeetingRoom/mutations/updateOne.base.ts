import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const updateOneMeetingRoomMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.MeetingRoomWhereUniqueInput, required: true }),
      data: t.field({ type: Inputs.MeetingRoomUpdateInput, required: true }),
    }))

export const updateOneMeetingRoomMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'MeetingRoom',
    nullable: true,
    args: updateOneMeetingRoomMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.meetingRoom.update({ where: args.where, data: args.data, ...query }),
  }),
);

export const updateOneMeetingRoomMutation = defineMutation((t) => ({
  updateOneMeetingRoom: t.prismaField(updateOneMeetingRoomMutationObject(t)),
}));
