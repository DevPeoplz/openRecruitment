import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const createManyEvaluationMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['Evaluation'],
    nullable: false,
    args: {
      data: t.arg({ type: [Inputs.EvaluationCreateInput], required: true }),
    },
    resolve: async (_query, _root, args, _context, _info) =>
      await prisma.$transaction(
        args.data.map((data) => prisma.evaluation.create({ data }))
      ),
  })
)

export const createManyEvaluationMutation = defineMutation((t) => ({
  createManyEvaluation: t.prismaField(createManyEvaluationMutationObject(t)),
}))
