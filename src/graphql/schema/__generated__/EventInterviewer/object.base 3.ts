import * as Inputs from '@/graphql/schema/__generated__/inputs'
import {
  defineExposeObject,
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils'

export const EventInterviewerObject = definePrismaObject('EventInterviewer', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.exposeID('id', EventInterviewerIdFieldObject),
    event: t.relation('event', EventInterviewerEventFieldObject),
    eventId: t.exposeInt('eventId', EventInterviewerEventIdFieldObject),
    teamMember: t.relation('teamMember', EventInterviewerTeamMemberFieldObject),
    teamMemberId: t.exposeInt(
      'teamMemberId',
      EventInterviewerTeamMemberIdFieldObject
    ),
  }),
})

export const EventInterviewerIdFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: false,
})

export const EventInterviewerEventFieldObject = defineRelationObject(
  'EventInterviewer',
  'event',
  {
    description: undefined,
    nullable: false,
    args: undefined,
    query: undefined,
  }
)

export const EventInterviewerEventIdFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: false,
})

export const EventInterviewerTeamMemberFieldObject = defineRelationObject(
  'EventInterviewer',
  'teamMember',
  {
    description: undefined,
    nullable: false,
    args: undefined,
    query: undefined,
  }
)

export const EventInterviewerTeamMemberIdFieldObject = defineExposeObject(
  'Int',
  {
    description: undefined,
    nullable: false,
  }
)
