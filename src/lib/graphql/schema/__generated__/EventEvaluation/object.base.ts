import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { builder } from '../../builder';
import {
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils';

export const EventEvaluationObject = definePrismaObject('EventEvaluation', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.field(EventEvaluationIdFieldObject),
    event: t.relation('event', EventEvaluationEventFieldObject),
    eventId: t.field(EventEvaluationEventIdFieldObject),
    evaluation: t.relation('evaluation', EventEvaluationEvaluationFieldObject),
    evaluationId: t.field(EventEvaluationEvaluationIdFieldObject),
  }),
});

export const EventEvaluationIdFieldObject = defineFieldObject('EventEvaluation', {
  type: "ID",
  description: undefined,
  nullable: false,
  resolve: (parent) => String(parent.id),
});

export const EventEvaluationEventFieldObject = defineRelationObject('EventEvaluation', 'event', {
  description: undefined,
  nullable: false,
  args: undefined,
  query: undefined,
});

export const EventEvaluationEventIdFieldObject = defineFieldObject('EventEvaluation', {
  type: "Int",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.eventId,
});

export const EventEvaluationEvaluationFieldObject = defineRelationObject('EventEvaluation', 'evaluation', {
  description: undefined,
  nullable: false,
  args: undefined,
  query: undefined,
});

export const EventEvaluationEvaluationIdFieldObject = defineFieldObject('EventEvaluation', {
  type: "Int",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.evaluationId,
});
