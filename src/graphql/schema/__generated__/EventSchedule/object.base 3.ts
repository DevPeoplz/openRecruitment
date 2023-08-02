import * as Inputs from '@/graphql/schema/__generated__/inputs'
import {
  defineExposeObject,
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils'

export const EventScheduleObject = definePrismaObject('EventSchedule', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.exposeID('id', EventScheduleIdFieldObject),
    name: t.exposeString('name', EventScheduleNameFieldObject),
    dateRange: t.exposeInt('dateRange', EventScheduleDateRangeFieldObject),
    expiresAfter: t.exposeInt(
      'expiresAfter',
      EventScheduleExpiresAfterFieldObject
    ),
    inviteAll: t.exposeBoolean('inviteAll', EventScheduleInviteAllFieldObject),
    bufferTime: t.exposeInt('bufferTime', EventScheduleBufferTimeFieldObject),
    ignoreDayEvents: t.exposeBoolean(
      'ignoreDayEvents',
      EventScheduleIgnoreDayEventsFieldObject
    ),
    meetingLimit: t.exposeInt(
      'meetingLimit',
      EventScheduleMeetingLimitFieldObject
    ),
    duration: t.exposeInt('duration', EventScheduleDurationFieldObject),
    Interval: t.exposeInt('Interval', EventScheduleIntervalFieldObject),
    type: t.exposeString('type', EventScheduleTypeFieldObject),
    timezone: t.exposeString('timezone', EventScheduleTimezoneFieldObject),
    location: t.exposeString('location', EventScheduleLocationFieldObject),
    note: t.exposeString('note', EventScheduleNoteFieldObject),
    privateNote: t.exposeString(
      'privateNote',
      EventSchedulePrivateNoteFieldObject
    ),
    link: t.exposeString('link', EventScheduleLinkFieldObject),
    company: t.relation('company', EventScheduleCompanyFieldObject),
    companyId: t.exposeString('companyId', EventScheduleCompanyIdFieldObject),
    eventScheduleInterviewers: t.relation(
      'eventScheduleInterviewers',
      EventScheduleEventScheduleInterviewersFieldObject(t)
    ),
    eventScheduleEvaluations: t.relation(
      'eventScheduleEvaluations',
      EventScheduleEventScheduleEvaluationsFieldObject(t)
    ),
  }),
})

export const EventScheduleIdFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: false,
})

export const EventScheduleNameFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: false,
})

export const EventScheduleDateRangeFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: false,
})

export const EventScheduleExpiresAfterFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: false,
})

export const EventScheduleInviteAllFieldObject = defineExposeObject('Boolean', {
  description: undefined,
  nullable: false,
})

export const EventScheduleBufferTimeFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: false,
})

export const EventScheduleIgnoreDayEventsFieldObject = defineExposeObject(
  'Boolean',
  {
    description: undefined,
    nullable: false,
  }
)

export const EventScheduleMeetingLimitFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: false,
})

export const EventScheduleDurationFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: false,
})

export const EventScheduleIntervalFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: false,
})

export const EventScheduleTypeFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: false,
})

export const EventScheduleTimezoneFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: false,
})

export const EventScheduleLocationFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: false,
})

export const EventScheduleNoteFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: false,
})

export const EventSchedulePrivateNoteFieldObject = defineExposeObject(
  'String',
  {
    description: undefined,
    nullable: false,
  }
)

export const EventScheduleLinkFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: false,
})

export const EventScheduleCompanyFieldObject = defineRelationObject(
  'EventSchedule',
  'company',
  {
    description: undefined,
    nullable: false,
    args: undefined,
    query: undefined,
  }
)

export const EventScheduleCompanyIdFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: false,
})

export const EventScheduleEventScheduleInterviewersFieldObject =
  defineRelationFunction('EventSchedule', (t) =>
    defineRelationObject('EventSchedule', 'eventScheduleInterviewers', {
      description: undefined,
      nullable: false,
      args: {
        where: t.arg({
          type: Inputs.EventScheduleInterviewerWhereInput,
          required: false,
        }),
        orderBy: t.arg({
          type: [Inputs.EventScheduleInterviewerOrderByWithRelationInput],
          required: false,
        }),
        cursor: t.arg({
          type: Inputs.EventScheduleInterviewerWhereUniqueInput,
          required: false,
        }),
        take: t.arg({ type: 'Int', required: false }),
        skip: t.arg({ type: 'Int', required: false }),
        distinct: t.arg({
          type: [Inputs.EventScheduleInterviewerScalarFieldEnum],
          required: false,
        }),
      },
      query: (args) => ({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        distinct: args.distinct || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
      }),
    })
  )

export const EventScheduleEventScheduleEvaluationsFieldObject =
  defineRelationFunction('EventSchedule', (t) =>
    defineRelationObject('EventSchedule', 'eventScheduleEvaluations', {
      description: undefined,
      nullable: false,
      args: {
        where: t.arg({
          type: Inputs.EventScheduleEvaluationWhereInput,
          required: false,
        }),
        orderBy: t.arg({
          type: [Inputs.EventScheduleEvaluationOrderByWithRelationInput],
          required: false,
        }),
        cursor: t.arg({
          type: Inputs.EventScheduleEvaluationWhereUniqueInput,
          required: false,
        }),
        take: t.arg({ type: 'Int', required: false }),
        skip: t.arg({ type: 'Int', required: false }),
        distinct: t.arg({
          type: [Inputs.EventScheduleEvaluationScalarFieldEnum],
          required: false,
        }),
      },
      query: (args) => ({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        distinct: args.distinct || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
      }),
    })
  )
