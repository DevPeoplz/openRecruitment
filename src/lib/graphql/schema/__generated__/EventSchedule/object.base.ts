import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { builder } from '../../builder';
import {
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils';

export const EventScheduleObject = definePrismaObject('EventSchedule', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.field(EventScheduleIdFieldObject),
    name: t.field(EventScheduleNameFieldObject),
    dateRange: t.field(EventScheduleDateRangeFieldObject),
    expiresAfter: t.field(EventScheduleExpiresAfterFieldObject),
    inviteAll: t.field(EventScheduleInviteAllFieldObject),
    bufferTime: t.field(EventScheduleBufferTimeFieldObject),
    ignoreDayEvents: t.field(EventScheduleIgnoreDayEventsFieldObject),
    meetingLimit: t.field(EventScheduleMeetingLimitFieldObject),
    duration: t.field(EventScheduleDurationFieldObject),
    Interval: t.field(EventScheduleIntervalFieldObject),
    type: t.field(EventScheduleTypeFieldObject),
    timezone: t.field(EventScheduleTimezoneFieldObject),
    location: t.field(EventScheduleLocationFieldObject),
    note: t.field(EventScheduleNoteFieldObject),
    privateNote: t.field(EventSchedulePrivateNoteFieldObject),
    link: t.field(EventScheduleLinkFieldObject),
    company: t.relation('company', EventScheduleCompanyFieldObject),
    companyId: t.field(EventScheduleCompanyIdFieldObject),
    eventScheduleInterviewers: t.relation('eventScheduleInterviewers', EventScheduleEventScheduleInterviewersFieldObject(t)),
    eventScheduleEvaluations: t.relation('eventScheduleEvaluations', EventScheduleEventScheduleEvaluationsFieldObject(t)),
  }),
});

export const EventScheduleIdFieldObject = defineFieldObject('EventSchedule', {
  type: "ID",
  description: undefined,
  nullable: false,
  resolve: (parent) => String(parent.id),
});

export const EventScheduleNameFieldObject = defineFieldObject('EventSchedule', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.name,
});

export const EventScheduleDateRangeFieldObject = defineFieldObject('EventSchedule', {
  type: "Int",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.dateRange,
});

export const EventScheduleExpiresAfterFieldObject = defineFieldObject('EventSchedule', {
  type: "Int",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.expiresAfter,
});

export const EventScheduleInviteAllFieldObject = defineFieldObject('EventSchedule', {
  type: "Boolean",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.inviteAll,
});

export const EventScheduleBufferTimeFieldObject = defineFieldObject('EventSchedule', {
  type: "Int",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.bufferTime,
});

export const EventScheduleIgnoreDayEventsFieldObject = defineFieldObject('EventSchedule', {
  type: "Boolean",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.ignoreDayEvents,
});

export const EventScheduleMeetingLimitFieldObject = defineFieldObject('EventSchedule', {
  type: "Int",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.meetingLimit,
});

export const EventScheduleDurationFieldObject = defineFieldObject('EventSchedule', {
  type: "Int",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.duration,
});

export const EventScheduleIntervalFieldObject = defineFieldObject('EventSchedule', {
  type: "Int",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.Interval,
});

export const EventScheduleTypeFieldObject = defineFieldObject('EventSchedule', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.type,
});

export const EventScheduleTimezoneFieldObject = defineFieldObject('EventSchedule', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.timezone,
});

export const EventScheduleLocationFieldObject = defineFieldObject('EventSchedule', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.location,
});

export const EventScheduleNoteFieldObject = defineFieldObject('EventSchedule', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.note,
});

export const EventSchedulePrivateNoteFieldObject = defineFieldObject('EventSchedule', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.privateNote,
});

export const EventScheduleLinkFieldObject = defineFieldObject('EventSchedule', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.link,
});

export const EventScheduleCompanyFieldObject = defineRelationObject('EventSchedule', 'company', {
  description: undefined,
  nullable: false,
  args: undefined,
  query: undefined,
});

export const EventScheduleCompanyIdFieldObject = defineFieldObject('EventSchedule', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.companyId,
});

export const EventScheduleEventScheduleInterviewersFieldArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.EventScheduleInterviewerWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.EventScheduleInterviewerOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.EventScheduleInterviewerWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.EventScheduleInterviewerScalarFieldEnum], required: false }),
}))

export const EventScheduleEventScheduleInterviewersFieldObject = defineRelationFunction('EventSchedule', (t) =>
  defineRelationObject('EventSchedule', 'eventScheduleInterviewers', {
    description: undefined,
    nullable: false,
    args: EventScheduleEventScheduleInterviewersFieldArgs,
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

export const EventScheduleEventScheduleEvaluationsFieldArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.EventScheduleEvaluationWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.EventScheduleEvaluationOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.EventScheduleEvaluationWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.EventScheduleEvaluationScalarFieldEnum], required: false }),
}))

export const EventScheduleEventScheduleEvaluationsFieldObject = defineRelationFunction('EventSchedule', (t) =>
  defineRelationObject('EventSchedule', 'eventScheduleEvaluations', {
    description: undefined,
    nullable: false,
    args: EventScheduleEventScheduleEvaluationsFieldArgs,
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
