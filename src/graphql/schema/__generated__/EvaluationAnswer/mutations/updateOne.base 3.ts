import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const updateOneEvaluationAnswerMutationObject = defineMutationFunction(
  (t) =>
    defineMutationPrismaObject({
      type: 'EvaluationAnswer',
      nullable: true,
      args: {
        where: t.arg({
          type: Inputs.EvaluationAnswerWhereUniqueInput,
          required: true,
        }),
        data: t.arg({
          type: Inputs.EvaluationAnswerUpdateInput,
          required: true,
        }),
      },
      resolve: async (query, _root, args, _context, _info) =>
        await prisma.evaluationAnswer.update({
          where: args.where,
          data: args.data,
          ...query,
        }),
    })
)

export const updateOneEvaluationAnswerMutation = defineMutation((t) => ({
  updateOneEvaluationAnswer: t.prismaField(
    updateOneEvaluationAnswerMutationObject(t)
  ),
}))
