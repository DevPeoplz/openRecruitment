import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const createManyEventScheduleEvaluationMutationObject =
  defineMutationFunction((t) =>
    defineMutationPrismaObject({
      type: ['EventScheduleEvaluation'],
      nullable: false,
      args: {
        data: t.arg({
          type: [Inputs.EventScheduleEvaluationCreateInput],
          required: true,
        }),
      },
      resolve: async (_query, _root, args, _context, _info) =>
        await prisma.$transaction(
          args.data.map((data) =>
            prisma.eventScheduleEvaluation.create({ data })
          )
        ),
    })
  )

export const createManyEventScheduleEvaluationMutation = defineMutation(
  (t) => ({
    createManyEventScheduleEvaluation: t.prismaField(
      createManyEventScheduleEvaluationMutationObject(t)
    ),
  })
)
