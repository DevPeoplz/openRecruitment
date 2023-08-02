import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const updateOneEventMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Event',
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.EventWhereUniqueInput, required: true }),
      data: t.arg({ type: Inputs.EventUpdateInput, required: true }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.event.update({
        where: args.where,
        data: args.data,
        ...query,
      }),
  })
)

export const updateOneEventMutation = defineMutation((t) => ({
  updateOneEvent: t.prismaField(updateOneEventMutationObject(t)),
}))
