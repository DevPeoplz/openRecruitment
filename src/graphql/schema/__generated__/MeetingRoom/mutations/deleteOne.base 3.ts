import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const deleteOneMeetingRoomMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'MeetingRoom',
    nullable: true,
    args: {
      where: t.arg({
        type: Inputs.MeetingRoomWhereUniqueInput,
        required: true,
      }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.meetingRoom.delete({ where: args.where, ...query }),
  })
)

export const deleteOneMeetingRoomMutation = defineMutation((t) => ({
  deleteOneMeetingRoom: t.prismaField(deleteOneMeetingRoomMutationObject(t)),
}))
