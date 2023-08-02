import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const upsertOneEvaluationAnswerMutationObject = defineMutationFunction(
  (t) =>
    defineMutationPrismaObject({
      type: 'EvaluationAnswer',
      nullable: false,
      args: {
        where: t.arg({
          type: Inputs.EvaluationAnswerWhereUniqueInput,
          required: true,
        }),
        create: t.arg({
          type: Inputs.EvaluationAnswerCreateInput,
          required: true,
        }),
        update: t.arg({
          type: Inputs.EvaluationAnswerUpdateInput,
          required: true,
        }),
      },
      resolve: async (query, _root, args, _context, _info) =>
        await prisma.evaluationAnswer.upsert({
          where: args.where,
          create: args.create,
          update: args.update,
          ...query,
        }),
    })
)

export const upsertOneEvaluationAnswerMutation = defineMutation((t) => ({
  upsertOneEvaluationAnswer: t.prismaField(
    upsertOneEvaluationAnswerMutationObject(t)
  ),
}))
