import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const updateOneEventEvaluationMutationObject = defineMutationFunction(
  (t) =>
    defineMutationPrismaObject({
      type: 'EventEvaluation',
      nullable: true,
      args: {
        where: t.arg({
          type: Inputs.EventEvaluationWhereUniqueInput,
          required: true,
        }),
        data: t.arg({
          type: Inputs.EventEvaluationUpdateInput,
          required: true,
        }),
      },
      resolve: async (query, _root, args, _context, _info) =>
        await prisma.eventEvaluation.update({
          where: args.where,
          data: args.data,
          ...query,
        }),
    })
)

export const updateOneEventEvaluationMutation = defineMutation((t) => ({
  updateOneEventEvaluation: t.prismaField(
    updateOneEventEvaluationMutationObject(t)
  ),
}))
