import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { builder } from '../../builder';
import {
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils';

export const EventScheduleInterviewerObject = definePrismaObject('EventScheduleInterviewer', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.field(EventScheduleInterviewerIdFieldObject),
    eventSchedule: t.relation('eventSchedule', EventScheduleInterviewerEventScheduleFieldObject),
    eventScheduleId: t.field(EventScheduleInterviewerEventScheduleIdFieldObject),
    teamMember: t.relation('teamMember', EventScheduleInterviewerTeamMemberFieldObject),
    teamMemberId: t.field(EventScheduleInterviewerTeamMemberIdFieldObject),
    availability: t.field(EventScheduleInterviewerAvailabilityFieldObject),
  }),
});

export const EventScheduleInterviewerIdFieldObject = defineFieldObject('EventScheduleInterviewer', {
  type: "ID",
  description: undefined,
  nullable: false,
  resolve: (parent) => String(parent.id),
});

export const EventScheduleInterviewerEventScheduleFieldObject = defineRelationObject('EventScheduleInterviewer', 'eventSchedule', {
  description: undefined,
  nullable: false,
  args: undefined,
  query: undefined,
});

export const EventScheduleInterviewerEventScheduleIdFieldObject = defineFieldObject('EventScheduleInterviewer', {
  type: "Int",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.eventScheduleId,
});

export const EventScheduleInterviewerTeamMemberFieldObject = defineRelationObject('EventScheduleInterviewer', 'teamMember', {
  description: undefined,
  nullable: false,
  args: undefined,
  query: undefined,
});

export const EventScheduleInterviewerTeamMemberIdFieldObject = defineFieldObject('EventScheduleInterviewer', {
  type: "Int",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.teamMemberId,
});

export const EventScheduleInterviewerAvailabilityFieldObject = defineFieldObject('EventScheduleInterviewer', {
  type: Inputs.Json,
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.availability,
});
