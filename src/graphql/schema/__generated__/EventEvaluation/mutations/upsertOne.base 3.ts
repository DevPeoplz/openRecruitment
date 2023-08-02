import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const upsertOneEventEvaluationMutationObject = defineMutationFunction(
  (t) =>
    defineMutationPrismaObject({
      type: 'EventEvaluation',
      nullable: false,
      args: {
        where: t.arg({
          type: Inputs.EventEvaluationWhereUniqueInput,
          required: true,
        }),
        create: t.arg({
          type: Inputs.EventEvaluationCreateInput,
          required: true,
        }),
        update: t.arg({
          type: Inputs.EventEvaluationUpdateInput,
          required: true,
        }),
      },
      resolve: async (query, _root, args, _context, _info) =>
        await prisma.eventEvaluation.upsert({
          where: args.where,
          create: args.create,
          update: args.update,
          ...query,
        }),
    })
)

export const upsertOneEventEvaluationMutation = defineMutation((t) => ({
  upsertOneEventEvaluation: t.prismaField(
    upsertOneEventEvaluationMutationObject(t)
  ),
}))
