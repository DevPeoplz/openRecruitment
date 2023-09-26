import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findFirstMeetingRoomQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.MeetingRoomWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.MeetingRoomOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.MeetingRoomWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.MeetingRoomScalarFieldEnum], required: false }),
}))

export const findFirstMeetingRoomQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'MeetingRoom',
    nullable: true,
    args: findFirstMeetingRoomQueryArgs,
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
