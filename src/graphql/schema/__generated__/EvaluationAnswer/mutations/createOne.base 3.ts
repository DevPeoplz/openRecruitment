import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const createOneEvaluationAnswerMutationObject = defineMutationFunction(
  (t) =>
    defineMutationPrismaObject({
      type: 'EvaluationAnswer',
      nullable: false,
      args: {
        data: t.arg({
          type: Inputs.EvaluationAnswerCreateInput,
          required: true,
        }),
      },
      resolve: async (query, _root, args, _context, _info) =>
        await prisma.evaluationAnswer.create({ data: args.data, ...query }),
    })
)

export const createOneEvaluationAnswerMutation = defineMutation((t) => ({
  createOneEvaluationAnswer: t.prismaField(
    createOneEvaluationAnswerMutationObject(t)
  ),
}))
