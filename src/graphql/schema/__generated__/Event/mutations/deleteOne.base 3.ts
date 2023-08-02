import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const deleteOneEventMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Event',
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.EventWhereUniqueInput, required: true }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.event.delete({ where: args.where, ...query }),
  })
)

export const deleteOneEventMutation = defineMutation((t) => ({
  deleteOneEvent: t.prismaField(deleteOneEventMutationObject(t)),
}))
