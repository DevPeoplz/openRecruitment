import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const deleteOneEventScheduleMutationObject = defineMutationFunction(
  (t) =>
    defineMutationPrismaObject({
      type: 'EventSchedule',
      nullable: true,
      args: {
        where: t.arg({
          type: Inputs.EventScheduleWhereUniqueInput,
          required: true,
        }),
      },
      resolve: async (query, _root, args, _context, _info) =>
        await prisma.eventSchedule.delete({ where: args.where, ...query }),
    })
)

export const deleteOneEventScheduleMutation = defineMutation((t) => ({
  deleteOneEventSchedule: t.prismaField(
    deleteOneEventScheduleMutationObject(t)
  ),
}))
