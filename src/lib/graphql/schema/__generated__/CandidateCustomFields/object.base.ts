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
