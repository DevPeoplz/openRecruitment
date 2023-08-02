import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const createOneEventScheduleMutationObject = defineMutationFunction(
  (t) =>
    defineMutationPrismaObject({
      type: 'EventSchedule',
      nullable: false,
      args: {
        data: t.arg({ type: Inputs.EventScheduleCreateInput, required: true }),
      },
      resolve: async (query, _root, args, _context, _info) =>
        await prisma.eventSchedule.create({ data: args.data, ...query }),
    })
)

export const createOneEventScheduleMutation = defineMutation((t) => ({
  createOneEventSchedule: t.prismaField(
    createOneEventScheduleMutationObject(t)
  ),
}))
