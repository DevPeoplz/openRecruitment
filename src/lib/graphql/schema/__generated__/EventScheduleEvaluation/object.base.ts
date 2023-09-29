import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { builder } from '../../builder';
import {
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils';

export const EventScheduleEvaluationObject = definePrismaObject('EventScheduleEvaluation', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.field(EventScheduleEvaluationIdFieldObject),
    eventSchedule: t.relation('eventSchedule', EventScheduleEvaluationEventScheduleFieldObject),
    eventScheduleId: t.field(EventScheduleEvaluationEventScheduleIdFieldObject),
    evaluation: t.relation('evaluation', EventScheduleEvaluationEvaluationFieldObject),
    evaluationId: t.field(EventScheduleEvaluationEvaluationIdFieldObject),
  }),
});

export const EventScheduleEvaluationIdFieldObject = defineFieldObject('EventScheduleEvaluation', {
  type: "ID",
  description: undefined,
  nullable: false,
  resolve: (parent) => String(parent.id),
});

export const EventScheduleEvaluationEventScheduleFieldObject = defineRelationObject('EventScheduleEvaluation', 'eventSchedule', {
  description: undefined,
  nullable: false,
  args: undefined,
  query: undefined,
});

export const EventScheduleEvaluationEventScheduleIdFieldObject = defineFieldObject('EventScheduleEvaluation', {
  type: "Int",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.eventScheduleId,
});

export const EventScheduleEvaluationEvaluationFieldObject = defineRelationObject('EventScheduleEvaluation', 'evaluation', {
  description: undefined,
  nullable: false,
  args: undefined,
  query: undefined,
});

export const EventScheduleEvaluationEvaluationIdFieldObject = defineFieldObject('EventScheduleEvaluation', {
  type: "Int",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.evaluationId,
});
