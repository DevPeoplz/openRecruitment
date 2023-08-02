import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const createOneEventMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Event',
    nullable: false,
    args: { data: t.arg({ type: Inputs.EventCreateInput, required: true }) },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.event.create({ data: args.data, ...query }),
  })
)

export const createOneEventMutation = defineMutation((t) => ({
  createOneEvent: t.prismaField(createOneEventMutationObject(t)),
}))
