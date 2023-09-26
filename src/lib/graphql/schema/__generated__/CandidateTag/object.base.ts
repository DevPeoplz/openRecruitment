import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { builder } from '../../builder';
import {
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils';

export const CandidateTagObject = definePrismaObject('CandidateTag', {
  description: undefined,
  findUnique: (fields) => ({ candidateId_tagId: fields }),
  fields: (t) => ({
    candidate: t.relation('candidate', CandidateTagCandidateFieldObject),
    candidateId: t.field(CandidateTagCandidateIdFieldObject),
    tag: t.relation('tag', CandidateTagTagFieldObject),
    tagId: t.field(CandidateTagTagIdFieldObject),
  }),
});

export const CandidateTagCandidateFieldObject = defineRelationObject('CandidateTag', 'candidate', {
  description: undefined,
  nullable: false,
  args: undefined,
  query: undefined,
});

export const CandidateTagCandidateIdFieldObject = defineFieldObject('CandidateTag', {
  type: "Int",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.candidateId,
});

export const CandidateTagTagFieldObject = defineRelationObject('CandidateTag', 'tag', {
  description: undefined,
  nullable: false,
  args: undefined,
  query: undefined,
});

export const CandidateTagTagIdFieldObject = defineFieldObject('CandidateTag', {
  type: "Int",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.tagId,
});
