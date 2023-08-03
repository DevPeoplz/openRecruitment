import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findFirstMeetingRoomQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'MeetingRoom',
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.MeetingRoomWhereInput, required: false }),
      orderBy: t.arg({ type: [Inputs.MeetingRoomOrderByWithRelationInput], required: false }),
      cursor: t.arg({ type: Inputs.MeetingRoomWhereUniqueInput, required: false }),
      take: t.arg({ type: 'Int', required: false }),
      skip: t.arg({ type: 'Int', required: false }),
      distinct: t.arg({ type: [Inputs.MeetingRoomScalarFieldEnum], required: false }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.meetingRoom.findFirst({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        distinct: args.distinct || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
        ...query,
      }),
  }),
);

export const findFirstMeetingRoomQuery = defineQuery((t) => ({
  findFirstMeetingRoom: t.prismaField(findFirstMeetingRoomQueryObject(t)),
}));
