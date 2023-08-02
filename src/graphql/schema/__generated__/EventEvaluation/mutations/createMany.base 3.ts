import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const createManyEventEvaluationMutationObject = defineMutationFunction(
  (t) =>
    defineMutationPrismaObject({
      type: ['EventEvaluation'],
      nullable: false,
      args: {
        data: t.arg({
          type: [Inputs.EventEvaluationCreateInput],
          required: true,
        }),
      },
      resolve: async (_query, _root, args, _context, _info) =>
        await prisma.$transaction(
          args.data.map((data) => prisma.eventEvaluation.create({ data }))
        ),
    })
)

export const createManyEventEvaluationMutation = defineMutation((t) => ({
  createManyEventEvaluation: t.prismaField(
    createManyEventEvaluationMutationObject(t)
  ),
}))
