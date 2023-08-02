import * as Inputs from '@/graphql/schema/__generated__/inputs'
import {
  defineExposeObject,
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils'

export const EventEvaluationObject = definePrismaObject('EventEvaluation', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.exposeID('id', EventEvaluationIdFieldObject),
    event: t.relation('event', EventEvaluationEventFieldObject),
    eventId: t.exposeInt('eventId', EventEvaluationEventIdFieldObject),
    evaluation: t.relation('evaluation', EventEvaluationEvaluationFieldObject),
    evaluationId: t.exposeInt(
      'evaluationId',
      EventEvaluationEvaluationIdFieldObject
    ),
  }),
})

export const EventEvaluationIdFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: false,
})

export const EventEvaluationEventFieldObject = defineRelationObject(
  'EventEvaluation',
  'event',
  {
    description: undefined,
    nullable: false,
    args: undefined,
    query: undefined,
  }
)

export const EventEvaluationEventIdFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: false,
})

export const EventEvaluationEvaluationFieldObject = defineRelationObject(
  'EventEvaluation',
  'evaluation',
  {
    description: undefined,
    nullable: false,
    args: undefined,
    query: undefined,
  }
)

export const EventEvaluationEvaluationIdFieldObject = defineExposeObject(
  'Int',
  {
    description: undefined,
    nullable: false,
  }
)
