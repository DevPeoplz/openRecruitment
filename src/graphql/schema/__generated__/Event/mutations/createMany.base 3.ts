import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const createManyEventMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['Event'],
    nullable: false,
    args: { data: t.arg({ type: [Inputs.EventCreateInput], required: true }) },
    resolve: async (_query, _root, args, _context, _info) =>
      await prisma.$transaction(
        args.data.map((data) => prisma.event.create({ data }))
      ),
  })
)

export const createManyEventMutation = defineMutation((t) => ({
  createManyEvent: t.prismaField(createManyEventMutationObject(t)),
}))
