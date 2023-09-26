import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { builder } from '../../builder';
import {
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils';

export const MeetingRoomObject = definePrismaObject('MeetingRoom', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.field(MeetingRoomIdFieldObject),
    name: t.field(MeetingRoomNameFieldObject),
    type: t.field(MeetingRoomTypeFieldObject),
    link: t.field(MeetingRoomLinkFieldObject),
    company: t.relation('company', MeetingRoomCompanyFieldObject),
    companyId: t.field(MeetingRoomCompanyIdFieldObject),
  }),
});

export const MeetingRoomIdFieldObject = defineFieldObject('MeetingRoom', {
  type: "ID",
  description: undefined,
  nullable: false,
  resolve: (parent) => String(parent.id),
});

export const MeetingRoomNameFieldObject = defineFieldObject('MeetingRoom', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.name,
});

export const MeetingRoomTypeFieldObject = defineFieldObject('MeetingRoom', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.type,
});

export const MeetingRoomLinkFieldObject = defineFieldObject('MeetingRoom', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.link,
});

export const MeetingRoomCompanyFieldObject = defineRelationObject('MeetingRoom', 'company', {
  description: undefined,
  nullable: false,
  args: undefined,
  query: undefined,
});

export const MeetingRoomCompanyIdFieldObject = defineFieldObject('MeetingRoom', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.companyId,
});
