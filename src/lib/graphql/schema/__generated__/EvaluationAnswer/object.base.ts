import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { builder } from '../../builder';
import {
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils';

export const EvaluationAnswerObject = definePrismaObject('EvaluationAnswer', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.field(EvaluationAnswerIdFieldObject),
    evaluation: t.relation('evaluation', EvaluationAnswerEvaluationFieldObject),
    evaluationId: t.field(EvaluationAnswerEvaluationIdFieldObject),
    answer: t.relation('answer', EvaluationAnswerAnswerFieldObject),
    answerId: t.field(EvaluationAnswerAnswerIdFieldObject),
  }),
});

export const EvaluationAnswerIdFieldObject = defineFieldObject('EvaluationAnswer', {
  type: "ID",
  description: undefined,
  nullable: false,
  resolve: (parent) => String(parent.id),
});

export const EvaluationAnswerEvaluationFieldObject = defineRelationObject('EvaluationAnswer', 'evaluation', {
  description: undefined,
  nullable: false,
  args: undefined,
  query: undefined,
});

export const EvaluationAnswerEvaluationIdFieldObject = defineFieldObject('EvaluationAnswer', {
  type: "Int",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.evaluationId,
});

export const EvaluationAnswerAnswerFieldObject = defineRelationObject('EvaluationAnswer', 'answer', {
  description: undefined,
  nullable: false,
  args: undefined,
  query: undefined,
});

export const EvaluationAnswerAnswerIdFieldObject = defineFieldObject('EvaluationAnswer', {
  type: "Int",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.answerId,
});
