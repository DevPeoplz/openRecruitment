import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { builder } from '../../builder';
import {
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils';

export const EventObject = definePrismaObject('Event', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.field(EventIdFieldObject),
    date: t.field(EventDateFieldObject),
    duration: t.field(EventDurationFieldObject),
    type: t.field(EventTypeFieldObject),
    location: t.field(EventLocationFieldObject),
    note: t.field(EventNoteFieldObject),
    privateNote: t.field(EventPrivateNoteFieldObject),
    company: t.relation('company', EventCompanyFieldObject),
    companyId: t.field(EventCompanyIdFieldObject),
    interviewers: t.relation('interviewers', EventInterviewersFieldObject(t)),
    evaluations: t.relation('evaluations', EventEvaluationsFieldObject(t)),
    candidates: t.relation('candidates', EventCandidatesFieldObject(t)),
    createdAt: t.field(EventCreatedAtFieldObject),
    updatedAt: t.field(EventUpdatedAtFieldObject),
    createdBy: t.relation('createdBy', EventCreatedByFieldObject),
    createdById: t.field(EventCreatedByIdFieldObject),
    EventInterviewer: t.relation('EventInterviewer', EventEventInterviewerFieldObject(t)),
  }),
});

export const EventIdFieldObject = defineFieldObject('Event', {
  type: "ID",
  description: undefined,
  nullable: false,
  resolve: (parent) => String(parent.id),
});

export const EventDateFieldObject = defineFieldObject('Event', {
  type: Inputs.DateTime,
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.date,
});

export const EventDurationFieldObject = defineFieldObject('Event', {
  type: "Int",
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.duration,
});

export const EventTypeFieldObject = defineFieldObject('Event', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.type,
});

export const EventLocationFieldObject = defineFieldObject('Event', {
  type: "String",
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.location,
});

export const EventNoteFieldObject = defineFieldObject('Event', {
  type: "String",
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.note,
});

export const EventPrivateNoteFieldObject = defineFieldObject('Event', {
  type: "String",
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.privateNote,
});

export const EventCompanyFieldObject = defineRelationObject('Event', 'company', {
  description: undefined,
  nullable: false,
  args: undefined,
  query: undefined,
});

export const EventCompanyIdFieldObject = defineFieldObject('Event', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.companyId,
});

export const EventInterviewersFieldArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.HiringRoleWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.HiringRoleOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.HiringRoleWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.HiringRoleScalarFieldEnum], required: false }),
}))

export const EventInterviewersFieldObject = defineRelationFunction('Event', (t) =>
  defineRelationObject('Event', 'interviewers', {
    description: undefined,
    nullable: false,
    args: EventInterviewersFieldArgs,
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

export const EventEvaluationsFieldArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.EvaluationWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.EvaluationOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.EvaluationWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.EvaluationScalarFieldEnum], required: false }),
}))

export const EventEvaluationsFieldObject = defineRelationFunction('Event', (t) =>
  defineRelationObject('Event', 'evaluations', {
    description: undefined,
    nullable: false,
    args: EventEvaluationsFieldArgs,
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

export const EventCandidatesFieldArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.CandidateWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.CandidateOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.CandidateWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.CandidateScalarFieldEnum], required: false }),
}))

export const EventCandidatesFieldObject = defineRelationFunction('Event', (t) =>
  defineRelationObject('Event', 'candidates', {
    description: undefined,
    nullable: false,
    args: EventCandidatesFieldArgs,
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

export const EventCreatedAtFieldObject = defineFieldObject('Event', {
  type: Inputs.DateTime,
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.createdAt,
});

export const EventUpdatedAtFieldObject = defineFieldObject('Event', {
  type: Inputs.DateTime,
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.updatedAt,
});

export const EventCreatedByFieldObject = defineRelationObject('Event', 'createdBy', {
  description: undefined,
  nullable: false,
  args: undefined,
  query: undefined,
});

export const EventCreatedByIdFieldObject = defineFieldObject('Event', {
  type: "Int",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.createdById,
});

export const EventEventInterviewerFieldArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.EventInterviewerWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.EventInterviewerOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.EventInterviewerWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.EventInterviewerScalarFieldEnum], required: false }),
}))

export const EventEventInterviewerFieldObject = defineRelationFunction('Event', (t) =>
  defineRelationObject('Event', 'EventInterviewer', {
    description: undefined,
    nullable: false,
    args: EventEventInterviewerFieldArgs,
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
