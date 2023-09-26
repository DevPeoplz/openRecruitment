import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createOneMeetingRoomMutationArgs = builder.args((t) => ({ data: t.field({ type: Inputs.MeetingRoomCreateInput, required: true }) }))

export const createOneMeetingRoomMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'MeetingRoom',
    nullable: false,
    args: createOneMeetingRoomMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.meetingRoom.create({ data: args.data, ...query }),
  }),
);

export const createOneMeetingRoomMutation = defineMutation((t) => ({
  createOneMeetingRoom: t.prismaField(createOneMeetingRoomMutationObject(t)),
}));
