import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { builder } from '../../builder';
import {
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils';

export const EventInterviewerObject = definePrismaObject('EventInterviewer', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.field(EventInterviewerIdFieldObject),
    event: t.relation('event', EventInterviewerEventFieldObject),
    eventId: t.field(EventInterviewerEventIdFieldObject),
    teamMember: t.relation('teamMember', EventInterviewerTeamMemberFieldObject),
    teamMemberId: t.field(EventInterviewerTeamMemberIdFieldObject),
  }),
});

export const EventInterviewerIdFieldObject = defineFieldObject('EventInterviewer', {
  type: "ID",
  description: undefined,
  nullable: false,
  resolve: (parent) => String(parent.id),
});

export const EventInterviewerEventFieldObject = defineRelationObject('EventInterviewer', 'event', {
  description: undefined,
  nullable: false,
  args: undefined,
  query: undefined,
});

export const EventInterviewerEventIdFieldObject = defineFieldObject('EventInterviewer', {
  type: "Int",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.eventId,
});

export const EventInterviewerTeamMemberFieldObject = defineRelationObject('EventInterviewer', 'teamMember', {
  description: undefined,
  nullable: false,
  args: undefined,
  query: undefined,
});

export const EventInterviewerTeamMemberIdFieldObject = defineFieldObject('EventInterviewer', {
  type: "Int",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.teamMemberId,
});
