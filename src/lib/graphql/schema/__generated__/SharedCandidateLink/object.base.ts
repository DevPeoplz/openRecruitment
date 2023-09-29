import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { builder } from '../../builder';
import {
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils';

export const SharedCandidateLinkObject = definePrismaObject('SharedCandidateLink', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.field(SharedCandidateLinkIdFieldObject),
    name: t.field(SharedCandidateLinkNameFieldObject),
    visibleSections: t.field(SharedCandidateLinkVisibleSectionsFieldObject),
    editModelSections: t.field(SharedCandidateLinkEditModelSectionsFieldObject),
    link: t.field(SharedCandidateLinkLinkFieldObject),
    expiration: t.field(SharedCandidateLinkExpirationFieldObject),
    candidate: t.relation('candidate', SharedCandidateLinkCandidateFieldObject),
    candidateId: t.field(SharedCandidateLinkCandidateIdFieldObject),
  }),
});

export const SharedCandidateLinkIdFieldObject = defineFieldObject('SharedCandidateLink', {
  type: "ID",
  description: undefined,
  nullable: false,
  resolve: (parent) => String(parent.id),
});

export const SharedCandidateLinkNameFieldObject = defineFieldObject('SharedCandidateLink', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.name,
});

export const SharedCandidateLinkVisibleSectionsFieldObject = defineFieldObject('SharedCandidateLink', {
  type: ["String"],
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.visibleSections,
});

export const SharedCandidateLinkEditModelSectionsFieldObject = defineFieldObject('SharedCandidateLink', {
  type: ["String"],
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.editModelSections,
});

export const SharedCandidateLinkLinkFieldObject = defineFieldObject('SharedCandidateLink', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.link,
});

export const SharedCandidateLinkExpirationFieldObject = defineFieldObject('SharedCandidateLink', {
  type: Inputs.DateTime,
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.expiration,
});

export const SharedCandidateLinkCandidateFieldObject = defineRelationObject('SharedCandidateLink', 'candidate', {
  description: undefined,
  nullable: false,
  args: undefined,
  query: undefined,
});

export const SharedCandidateLinkCandidateIdFieldObject = defineFieldObject('SharedCandidateLink', {
  type: "Int",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.candidateId,
});
