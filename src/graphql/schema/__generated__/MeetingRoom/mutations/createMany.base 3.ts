import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const createManyMeetingRoomMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['MeetingRoom'],
    nullable: false,
    args: {
      data: t.arg({ type: [Inputs.MeetingRoomCreateInput], required: true }),
    },
    resolve: async (_query, _root, args, _context, _info) =>
      await prisma.$transaction(
        args.data.map((data) => prisma.meetingRoom.create({ data }))
      ),
  })
)

export const createManyMeetingRoomMutation = defineMutation((t) => ({
  createManyMeetingRoom: t.prismaField(createManyMeetingRoomMutationObject(t)),
}))
