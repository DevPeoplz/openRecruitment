import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { builder } from '../../builder';
import {
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils';

export const CandidateCustomFieldsObject = definePrismaObject('CandidateCustomFields', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.field(CandidateCustomFieldsIdFieldObject),
    candidate: t.relation('candidate', CandidateCustomFieldsCandidateFieldObject),
    candidateId: t.field(CandidateCustomFieldsCandidateIdFieldObject),
    inputType: t.field(CandidateCustomFieldsInputTypeFieldObject),
    fieldKey: t.field(CandidateCustomFieldsFieldKeyFieldObject),
    fieldValue: t.field(CandidateCustomFieldsFieldValueFieldObject),
    fieldSettings: t.field(CandidateCustomFieldsFieldSettingsFieldObject),
    evaluationAnswers: t.relation('evaluationAnswers', CandidateCustomFieldsEvaluationAnswersFieldObject(t)),
  }),
});

export const CandidateCustomFieldsIdFieldObject = defineFieldObject('CandidateCustomFields', {
  type: "ID",
  description: undefined,
  nullable: false,
  resolve: (parent) => String(parent.id),
});

export const CandidateCustomFieldsCandidateFieldObject = defineRelationObject('CandidateCustomFields', 'candidate', {
  description: undefined,
  nullable: false,
  args: undefined,
  query: undefined,
});

export const CandidateCustomFieldsCandidateIdFieldObject = defineFieldObject('CandidateCustomFields', {
  type: "Int",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.candidateId,
});

export const CandidateCustomFieldsInputTypeFieldObject = defineFieldObject('CandidateCustomFields', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.inputType,
});

export const CandidateCustomFieldsFieldKeyFieldObject = defineFieldObject('CandidateCustomFields', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.fieldKey,
});

export const CandidateCustomFieldsFieldValueFieldObject = defineFieldObject('CandidateCustomFields', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.fieldValue,
});

export const CandidateCustomFieldsFieldSettingsFieldObject = defineFieldObject('CandidateCustomFields', {
  type: Inputs.Json,
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.fieldSettings,
});

export const CandidateCustomFieldsEvaluationAnswersFieldArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.EvaluationAnswerWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.EvaluationAnswerOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.EvaluationAnswerWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.EvaluationAnswerScalarFieldEnum], required: false }),
}))

export const CandidateCustomFieldsEvaluationAnswersFieldObject = defineRelationFunction('CandidateCustomFields', (t) =>
  defineRelationObject('CandidateCustomFields', 'evaluationAnswers', {
    description: undefined,
    nullable: false,
    args: CandidateCustomFieldsEvaluationAnswersFieldArgs,
    query: (args) => ({
      where: args.where || undefined,
      cursor: args.cursor || undefined,
      take: args.take || undefined,
      distinct: args.distinct || undefined,
      skip: args.skip || undefined,
      orderBy: args.orderBy || undefined,
    }),
  }),
);
