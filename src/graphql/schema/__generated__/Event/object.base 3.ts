import * as Inputs from '@/graphql/schema/__generated__/inputs'
import {
  defineExposeObject,
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils'

export const EventObject = definePrismaObject('Event', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.exposeID('id', EventIdFieldObject),
    date: t.field(EventDateFieldObject),
    time: t.exposeInt('time', EventTimeFieldObject),
    duration: t.exposeInt('duration', EventDurationFieldObject),
    type: t.exposeString('type', EventTypeFieldObject),
    location: t.exposeString('location', EventLocationFieldObject),
    note: t.exposeString('note', EventNoteFieldObject),
    privateNote: t.exposeString('privateNote', EventPrivateNoteFieldObject),
    company: t.relation('company', EventCompanyFieldObject),
    companyId: t.exposeString('companyId', EventCompanyIdFieldObject),
    eventInterviewers: t.relation(
      'eventInterviewers',
      EventEventInterviewersFieldObject(t)
    ),
    eventEvaluations: t.relation(
      'eventEvaluations',
      EventEventEvaluationsFieldObject(t)
    ),
  }),
})

export const EventIdFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: false,
})

export const EventDateFieldObject = defineFieldObject('Event', {
  type: Inputs.DateTime,
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.date,
})

export const EventTimeFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: false,
})

export const EventDurationFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: false,
})

export const EventTypeFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: false,
})

export const EventLocationFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: false,
})

export const EventNoteFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: false,
})

export const EventPrivateNoteFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: false,
})

export const EventCompanyFieldObject = defineRelationObject(
  'Event',
  'company',
  {
    description: undefined,
    nullable: false,
    args: undefined,
    query: undefined,
  }
)

export const EventCompanyIdFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: false,
})

export const EventEventInterviewersFieldObject = defineRelationFunction(
  'Event',
  (t) =>
    defineRelationObject('Event', 'eventInterviewers', {
      description: undefined,
      nullable: false,
      args: {
        where: t.arg({
          type: Inputs.EventInterviewerWhereInput,
          required: false,
        }),
        orderBy: t.arg({
          type: [Inputs.EventInterviewerOrderByWithRelationInput],
          required: false,
        }),
        cursor: t.arg({
          type: Inputs.EventInterviewerWhereUniqueInput,
          required: false,
        }),
        take: t.arg({ type: 'Int', required: false }),
        skip: t.arg({ type: 'Int', required: false }),
        distinct: t.arg({
          type: [Inputs.EventInterviewerScalarFieldEnum],
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

export const EventEventEvaluationsFieldObject = defineRelationFunction(
  'Event',
  (t) =>
    defineRelationObject('Event', 'eventEvaluations', {
      description: undefined,
      nullable: false,
      args: {
        where: t.arg({
          type: Inputs.EventEvaluationWhereInput,
          required: false,
        }),
        orderBy: t.arg({
          type: [Inputs.EventEvaluationOrderByWithRelationInput],
          required: false,
        }),
        cursor: t.arg({
          type: Inputs.EventEvaluationWhereUniqueInput,
          required: false,
        }),
        take: t.arg({ type: 'Int', required: false }),
        skip: t.arg({ type: 'Int', required: false }),
        distinct: t.arg({
          type: [Inputs.EventEvaluationScalarFieldEnum],
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
