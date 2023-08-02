import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationObject,
} from '../../utils'

export const updateManyMeetingRoomMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.MeetingRoomWhereInput, required: false }),
      data: t.arg({
        type: Inputs.MeetingRoomUpdateManyMutationInput,
        required: true,
      }),
    },
    resolve: async (_root, args, _context, _info) =>
      await prisma.meetingRoom.updateMany({
        where: args.where || undefined,
        data: args.data,
      }),
  })
)

export const updateManyMeetingRoomMutation = defineMutation((t) => ({
  updateManyMeetingRoom: t.field(updateManyMeetingRoomMutationObject(t)),
}))
