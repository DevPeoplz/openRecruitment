import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const upsertOneEvaluationMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Evaluation',
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.EvaluationWhereUniqueInput, required: true }),
      create: t.arg({ type: Inputs.EvaluationCreateInput, required: true }),
      update: t.arg({ type: Inputs.EvaluationUpdateInput, required: true }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.evaluation.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      }),
  })
)

export const upsertOneEvaluationMutation = defineMutation((t) => ({
  upsertOneEvaluation: t.prismaField(upsertOneEvaluationMutationObject(t)),
}))
