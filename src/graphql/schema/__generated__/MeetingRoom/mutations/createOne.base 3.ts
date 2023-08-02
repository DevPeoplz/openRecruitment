import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const createOneMeetingRoomMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'MeetingRoom',
    nullable: false,
    args: {
      data: t.arg({ type: Inputs.MeetingRoomCreateInput, required: true }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.meetingRoom.create({ data: args.data, ...query }),
  })
)

export const createOneMeetingRoomMutation = defineMutation((t) => ({
  createOneMeetingRoom: t.prismaField(createOneMeetingRoomMutationObject(t)),
}))
