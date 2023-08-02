import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const createManyEventScheduleMutationObject = defineMutationFunction(
  (t) =>
    defineMutationPrismaObject({
      type: ['EventSchedule'],
      nullable: false,
      args: {
        data: t.arg({
          type: [Inputs.EventScheduleCreateInput],
          required: true,
        }),
      },
      resolve: async (_query, _root, args, _context, _info) =>
        await prisma.$transaction(
          args.data.map((data) => prisma.eventSchedule.create({ data }))
        ),
    })
)

export const createManyEventScheduleMutation = defineMutation((t) => ({
  createManyEventSchedule: t.prismaField(
    createManyEventScheduleMutationObject(t)
  ),
}))
