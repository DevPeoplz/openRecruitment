import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const createOneEvaluationMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Evaluation',
    nullable: false,
    args: {
      data: t.arg({ type: Inputs.EvaluationCreateInput, required: true }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.evaluation.create({ data: args.data, ...query }),
  })
)

export const createOneEvaluationMutation = defineMutation((t) => ({
  createOneEvaluation: t.prismaField(createOneEvaluationMutationObject(t)),
}))
