import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const upsertOneEventMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Event',
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.EventWhereUniqueInput, required: true }),
      create: t.arg({ type: Inputs.EventCreateInput, required: true }),
      update: t.arg({ type: Inputs.EventUpdateInput, required: true }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.event.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      }),
  })
)

export const upsertOneEventMutation = defineMutation((t) => ({
  upsertOneEvent: t.prismaField(upsertOneEventMutationObject(t)),
}))
