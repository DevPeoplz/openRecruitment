import * as Inputs from '@/graphql/schema/__generated__/inputs'
import {
  defineExposeObject,
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils'

export const MeetingRoomObject = definePrismaObject('MeetingRoom', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.exposeID('id', MeetingRoomIdFieldObject),
    name: t.exposeString('name', MeetingRoomNameFieldObject),
    type: t.exposeString('type', MeetingRoomTypeFieldObject),
    link: t.exposeString('link', MeetingRoomLinkFieldObject),
    company: t.relation('company', MeetingRoomCompanyFieldObject),
    companyId: t.exposeString('companyId', MeetingRoomCompanyIdFieldObject),
  }),
})

export const MeetingRoomIdFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: false,
})

export const MeetingRoomNameFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: false,
})

export const MeetingRoomTypeFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: false,
})

export const MeetingRoomLinkFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: false,
})

export const MeetingRoomCompanyFieldObject = defineRelationObject(
  'MeetingRoom',
  'company',
  {
    description: undefined,
    nullable: false,
    args: undefined,
    query: undefined,
  }
)

export const MeetingRoomCompanyIdFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: false,
})
