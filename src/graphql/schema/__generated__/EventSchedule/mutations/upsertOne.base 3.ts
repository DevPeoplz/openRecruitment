import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const upsertOneEventScheduleMutationObject = defineMutationFunction(
  (t) =>
    defineMutationPrismaObject({
      type: 'EventSchedule',
      nullable: false,
      args: {
        where: t.arg({
          type: Inputs.EventScheduleWhereUniqueInput,
          required: true,
        }),
        create: t.arg({
          type: Inputs.EventScheduleCreateInput,
          required: true,
        }),
        update: t.arg({
          type: Inputs.EventScheduleUpdateInput,
          required: true,
        }),
      },
      resolve: async (query, _root, args, _context, _info) =>
        await prisma.eventSchedule.upsert({
          where: args.where,
          create: args.create,
          update: args.update,
          ...query,
        }),
    })
)

export const upsertOneEventScheduleMutation = defineMutation((t) => ({
  upsertOneEventSchedule: t.prismaField(
    upsertOneEventScheduleMutationObject(t)
  ),
}))
