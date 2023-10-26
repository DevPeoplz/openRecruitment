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
  findUnique: (fields) => ({ candidateId_customFieldId: fields }),
  fields: (t) => ({
    candidate: t.relation('candidate', CandidateCustomFieldsCandidateFieldObject),
    candidateId: t.field(CandidateCustomFieldsCandidateIdFieldObject),
    customField: t.relation('customField', CandidateCustomFieldsCustomFieldFieldObject),
    customFieldId: t.field(CandidateCustomFieldsCustomFieldIdFieldObject),
    value: t.field(CandidateCustomFieldsValueFieldObject),
  }),
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

export const CandidateCustomFieldsCustomFieldFieldObject = defineRelationObject('CandidateCustomFields', 'customField', {
  description: undefined,
  nullable: false,
  args: undefined,
  query: undefined,
});

export const CandidateCustomFieldsCustomFieldIdFieldObject = defineFieldObject('CandidateCustomFields', {
  type: "Int",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.customFieldId,
});

export const CandidateCustomFieldsValueFieldObject = defineFieldObject('CandidateCustomFields', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.value,
});
