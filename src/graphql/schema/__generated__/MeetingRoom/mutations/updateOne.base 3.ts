import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const updateOneMeetingRoomMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'MeetingRoom',
    nullable: true,
    args: {
      where: t.arg({
        type: Inputs.MeetingRoomWhereUniqueInput,
        required: true,
      }),
      data: t.arg({ type: Inputs.MeetingRoomUpdateInput, required: true }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.meetingRoom.update({
        where: args.where,
        data: args.data,
        ...query,
      }),
  })
)

export const updateOneMeetingRoomMutation = defineMutation((t) => ({
  updateOneMeetingRoom: t.prismaField(updateOneMeetingRoomMutationObject(t)),
}))
