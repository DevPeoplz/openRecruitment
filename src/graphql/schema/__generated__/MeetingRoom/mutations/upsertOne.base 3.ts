import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const upsertOneMeetingRoomMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'MeetingRoom',
    nullable: false,
    args: {
      where: t.arg({
        type: Inputs.MeetingRoomWhereUniqueInput,
        required: true,
      }),
      create: t.arg({ type: Inputs.MeetingRoomCreateInput, required: true }),
      update: t.arg({ type: Inputs.MeetingRoomUpdateInput, required: true }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.meetingRoom.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      }),
  })
)

export const upsertOneMeetingRoomMutation = defineMutation((t) => ({
  upsertOneMeetingRoom: t.prismaField(upsertOneMeetingRoomMutationObject(t)),
}))
