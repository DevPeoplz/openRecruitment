import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const deleteOneEvaluationMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Evaluation',
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.EvaluationWhereUniqueInput, required: true }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.evaluation.delete({ where: args.where, ...query }),
  })
)

export const deleteOneEvaluationMutation = defineMutation((t) => ({
  deleteOneEvaluation: t.prismaField(deleteOneEvaluationMutationObject(t)),
}))
