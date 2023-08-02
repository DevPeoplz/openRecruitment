import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineQuery,
  defineQueryFunction,
  defineQueryPrismaObject,
} from '../../utils'

export const findManyMeetingRoomQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: ['MeetingRoom'],
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.MeetingRoomWhereInput, required: false }),
      orderBy: t.arg({
        type: [Inputs.MeetingRoomOrderByWithRelationInput],
        required: false,
      }),
      cursor: t.arg({
        type: Inputs.MeetingRoomWhereUniqueInput,
        required: false,
      }),
      take: t.arg({ type: 'Int', required: false }),
      skip: t.arg({ type: 'Int', required: false }),
      distinct: t.arg({
        type: [Inputs.MeetingRoomScalarFieldEnum],
        required: false,
      }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.meetingRoom.findMany({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        distinct: args.distinct || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
        ...query,
      }),
  })
)

export const findManyMeetingRoomQuery = defineQuery((t) => ({
  findManyMeetingRoom: t.prismaField(findManyMeetingRoomQueryObject(t)),
}))
