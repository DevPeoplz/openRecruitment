import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const upsertOneEventScheduleEvaluationMutationObject =
  defineMutationFunction((t) =>
    defineMutationPrismaObject({
      type: 'EventScheduleEvaluation',
      nullable: false,
      args: {
        where: t.arg({
          type: Inputs.EventScheduleEvaluationWhereUniqueInput,
          required: true,
        }),
        create: t.arg({
          type: Inputs.EventScheduleEvaluationCreateInput,
          required: true,
        }),
        update: t.arg({
          type: Inputs.EventScheduleEvaluationUpdateInput,
          required: true,
        }),
      },
      resolve: async (query, _root, args, _context, _info) =>
        await prisma.eventScheduleEvaluation.upsert({
          where: args.where,
          create: args.create,
          update: args.update,
          ...query,
        }),
    })
  )

export const upsertOneEventScheduleEvaluationMutation = defineMutation((t) => ({
  upsertOneEventScheduleEvaluation: t.prismaField(
    upsertOneEventScheduleEvaluationMutationObject(t)
  ),
}))
