import * as Inputs from '@/graphql/schema/__generated__/inputs'
import {
  defineExposeObject,
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils'

export const EventScheduleInterviewerObject = definePrismaObject(
  'EventScheduleInterviewer',
  {
    description: undefined,
    findUnique: ({ id }) => ({ id }),
    fields: (t) => ({
      id: t.exposeID('id', EventScheduleInterviewerIdFieldObject),
      eventSchedule: t.relation(
        'eventSchedule',
        EventScheduleInterviewerEventScheduleFieldObject
      ),
      eventScheduleId: t.exposeInt(
        'eventScheduleId',
        EventScheduleInterviewerEventScheduleIdFieldObject
      ),
      teamMember: t.relation(
        'teamMember',
        EventScheduleInterviewerTeamMemberFieldObject
      ),
      teamMemberId: t.exposeInt(
        'teamMemberId',
        EventScheduleInterviewerTeamMemberIdFieldObject
      ),
      availability: t.field(EventScheduleInterviewerAvailabilityFieldObject),
    }),
  }
)

export const EventScheduleInterviewerIdFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: false,
})

export const EventScheduleInterviewerEventScheduleFieldObject =
  defineRelationObject('EventScheduleInterviewer', 'eventSchedule', {
    description: undefined,
    nullable: false,
    args: undefined,
    query: undefined,
  })

export const EventScheduleInterviewerEventScheduleIdFieldObject =
  defineExposeObject('Int', {
    description: undefined,
    nullable: false,
  })

export const EventScheduleInterviewerTeamMemberFieldObject =
  defineRelationObject('EventScheduleInterviewer', 'teamMember', {
    description: undefined,
    nullable: false,
    args: undefined,
    query: undefined,
  })

export const EventScheduleInterviewerTeamMemberIdFieldObject =
  defineExposeObject('Int', {
    description: undefined,
    nullable: false,
  })

export const EventScheduleInterviewerAvailabilityFieldObject =
  defineFieldObject('EventScheduleInterviewer', {
    type: Inputs.Json,
    description: undefined,
    nullable: false,
    resolve: (parent) => parent.availability,
  })
