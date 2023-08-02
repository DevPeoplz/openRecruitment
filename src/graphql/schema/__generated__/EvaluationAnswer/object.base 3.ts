import * as Inputs from '@/graphql/schema/__generated__/inputs'
import {
  defineExposeObject,
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils'

export const EvaluationAnswerObject = definePrismaObject('EvaluationAnswer', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.exposeID('id', EvaluationAnswerIdFieldObject),
    evaluation: t.relation('evaluation', EvaluationAnswerEvaluationFieldObject),
    evaluationId: t.exposeInt(
      'evaluationId',
      EvaluationAnswerEvaluationIdFieldObject
    ),
    answer: t.relation('answer', EvaluationAnswerAnswerFieldObject),
    answerId: t.exposeInt('answerId', EvaluationAnswerAnswerIdFieldObject),
  }),
})

export const EvaluationAnswerIdFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: false,
})

export const EvaluationAnswerEvaluationFieldObject = defineRelationObject(
  'EvaluationAnswer',
  'evaluation',
  {
    description: undefined,
    nullable: false,
    args: undefined,
    query: undefined,
  }
)

export const EvaluationAnswerEvaluationIdFieldObject = defineExposeObject(
  'Int',
  {
    description: undefined,
    nullable: false,
  }
)

export const EvaluationAnswerAnswerFieldObject = defineRelationObject(
  'EvaluationAnswer',
  'answer',
  {
    description: undefined,
    nullable: false,
    args: undefined,
    query: undefined,
  }
)

export const EvaluationAnswerAnswerIdFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: false,
})
