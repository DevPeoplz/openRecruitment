import * as Inputs from '@/graphql/schema/__generated__/inputs'
import {
  defineExposeObject,
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils'

export const EventScheduleEvaluationObject = definePrismaObject(
  'EventScheduleEvaluation',
  {
    description: undefined,
    findUnique: ({ id }) => ({ id }),
    fields: (t) => ({
      id: t.exposeID('id', EventScheduleEvaluationIdFieldObject),
      eventSchedule: t.relation(
        'eventSchedule',
        EventScheduleEvaluationEventScheduleFieldObject
      ),
      eventScheduleId: t.exposeInt(
        'eventScheduleId',
        EventScheduleEvaluationEventScheduleIdFieldObject
      ),
      evaluation: t.relation(
        'evaluation',
        EventScheduleEvaluationEvaluationFieldObject
      ),
      evaluationId: t.exposeInt(
        'evaluationId',
        EventScheduleEvaluationEvaluationIdFieldObject
      ),
    }),
  }
)

export const EventScheduleEvaluationIdFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: false,
})

export const EventScheduleEvaluationEventScheduleFieldObject =
  defineRelationObject('EventScheduleEvaluation', 'eventSchedule', {
    description: undefined,
    nullable: false,
    args: undefined,
    query: undefined,
  })

export const EventScheduleEvaluationEventScheduleIdFieldObject =
  defineExposeObject('Int', {
    description: undefined,
    nullable: false,
  })

export const EventScheduleEvaluationEvaluationFieldObject =
  defineRelationObject('EventScheduleEvaluation', 'evaluation', {
    description: undefined,
    nullable: false,
    args: undefined,
    query: undefined,
  })

export const EventScheduleEvaluationEvaluationIdFieldObject =
  defineExposeObject('Int', {
    description: undefined,
    nullable: false,
  })
