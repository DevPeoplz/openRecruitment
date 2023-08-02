import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const deleteOneEventEvaluationMutationObject = defineMutationFunction(
  (t) =>
    defineMutationPrismaObject({
      type: 'EventEvaluation',
      nullable: true,
      args: {
        where: t.arg({
          type: Inputs.EventEvaluationWhereUniqueInput,
          required: true,
        }),
      },
      resolve: async (query, _root, args, _context, _info) =>
        await prisma.eventEvaluation.delete({ where: args.where, ...query }),
    })
)

export const deleteOneEventEvaluationMutation = defineMutation((t) => ({
  deleteOneEventEvaluation: t.prismaField(
    deleteOneEventEvaluationMutationObject(t)
  ),
}))
