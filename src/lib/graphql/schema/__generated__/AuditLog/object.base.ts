import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { builder } from '../../builder';
import {
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils';

export const AuditLogObject = definePrismaObject('AuditLog', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.field(AuditLogIdFieldObject),
    company: t.relation('company', AuditLogCompanyFieldObject),
    companyId: t.field(AuditLogCompanyIdFieldObject),
    user: t.relation('user', AuditLogUserFieldObject),
    userId: t.field(AuditLogUserIdFieldObject),
    offer: t.relation('offer', AuditLogOfferFieldObject),
    offerId: t.field(AuditLogOfferIdFieldObject),
    candidate: t.relation('candidate', AuditLogCandidateFieldObject),
    candidateId: t.field(AuditLogCandidateIdFieldObject),
    actor: t.field(AuditLogActorFieldObject),
    actorType: t.field(AuditLogActorTypeFieldObject),
    ip: t.field(AuditLogIpFieldObject),
    action: t.field(AuditLogActionFieldObject),
    eventDetails: t.field(AuditLogEventDetailsFieldObject),
    createdAt: t.field(AuditLogCreatedAtFieldObject),
  }),
});

export const AuditLogIdFieldObject = defineFieldObject('AuditLog', {
  type: "ID",
  description: undefined,
  nullable: false,
  resolve: (parent) => String(parent.id),
});

export const AuditLogCompanyFieldObject = defineRelationObject('AuditLog', 'company', {
  description: undefined,
  nullable: false,
  args: undefined,
  query: undefined,
});

export const AuditLogCompanyIdFieldObject = defineFieldObject('AuditLog', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.companyId,
});

export const AuditLogUserFieldObject = defineRelationObject('AuditLog', 'user', {
  description: undefined,
  nullable: true,
  args: undefined,
  query: undefined,
});

export const AuditLogUserIdFieldObject = defineFieldObject('AuditLog', {
  type: "Int",
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.userId,
});

export const AuditLogOfferFieldObject = defineRelationObject('AuditLog', 'offer', {
  description: undefined,
  nullable: true,
  args: undefined,
  query: undefined,
});

export const AuditLogOfferIdFieldObject = defineFieldObject('AuditLog', {
  type: "Int",
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.offerId,
});

export const AuditLogCandidateFieldObject = defineRelationObject('AuditLog', 'candidate', {
  description: undefined,
  nullable: true,
  args: undefined,
  query: undefined,
});

export const AuditLogCandidateIdFieldObject = defineFieldObject('AuditLog', {
  type: "Int",
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.candidateId,
});

export const AuditLogActorFieldObject = defineFieldObject('AuditLog', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.actor,
});

export const AuditLogActorTypeFieldObject = defineFieldObject('AuditLog', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.actorType,
});

export const AuditLogIpFieldObject = defineFieldObject('AuditLog', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.ip,
});

export const AuditLogActionFieldObject = defineFieldObject('AuditLog', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.action,
});

export const AuditLogEventDetailsFieldObject = defineFieldObject('AuditLog', {
  type: Inputs.Json,
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.eventDetails,
});

export const AuditLogCreatedAtFieldObject = defineFieldObject('AuditLog', {
  type: Inputs.DateTime,
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.createdAt,
});
