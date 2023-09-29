import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findUniqueMeetingRoomQueryArgs = builder.args((t) => ({ where: t.field({ type: Inputs.MeetingRoomWhereUniqueInput, required: true }) }))

export const findUniqueMeetingRoomQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'MeetingRoom',
    nullable: true,
    args: findUniqueMeetingRoomQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.meetingRoom.findUnique({ where: args.where, ...query }),
  }),
);

export const findUniqueMeetingRoomQuery = defineQuery((t) => ({
  findUniqueMeetingRoom: t.prismaField(findUniqueMeetingRoomQueryObject(t)),
}));
