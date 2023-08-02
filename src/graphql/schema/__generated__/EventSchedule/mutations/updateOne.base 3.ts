import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const updateOneEventScheduleMutationObject = defineMutationFunction(
  (t) =>
    defineMutationPrismaObject({
      type: 'EventSchedule',
      nullable: true,
      args: {
        where: t.arg({
          type: Inputs.EventScheduleWhereUniqueInput,
          required: true,
        }),
        data: t.arg({ type: Inputs.EventScheduleUpdateInput, required: true }),
      },
      resolve: async (query, _root, args, _context, _info) =>
        await prisma.eventSchedule.update({
          where: args.where,
          data: args.data,
          ...query,
        }),
    })
)

export const updateOneEventScheduleMutation = defineMutation((t) => ({
  updateOneEventSchedule: t.prismaField(
    updateOneEventScheduleMutationObject(t)
  ),
}))
