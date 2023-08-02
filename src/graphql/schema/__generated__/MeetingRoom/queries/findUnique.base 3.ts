import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineQuery,
  defineQueryFunction,
  defineQueryPrismaObject,
} from '../../utils'

export const findUniqueMeetingRoomQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'MeetingRoom',
    nullable: true,
    args: {
      where: t.arg({
        type: Inputs.MeetingRoomWhereUniqueInput,
        required: true,
      }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.meetingRoom.findUnique({ where: args.where, ...query }),
  })
)

export const findUniqueMeetingRoomQuery = defineQuery((t) => ({
  findUniqueMeetingRoom: t.prismaField(findUniqueMeetingRoomQueryObject(t)),
}))
