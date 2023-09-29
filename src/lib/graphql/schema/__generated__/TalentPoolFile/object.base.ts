import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { builder } from '../../builder';
import {
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils';

export const TalentPoolFileObject = definePrismaObject('TalentPoolFile', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.field(TalentPoolFileIdFieldObject),
    talentPool: t.relation('talentPool', TalentPoolFileTalentPoolFieldObject),
    talentPoolId: t.field(TalentPoolFileTalentPoolIdFieldObject),
    attachment: t.relation('attachment', TalentPoolFileAttachmentFieldObject),
    attachmentId: t.field(TalentPoolFileAttachmentIdFieldObject),
  }),
});

export const TalentPoolFileIdFieldObject = defineFieldObject('TalentPoolFile', {
  type: "ID",
  description: undefined,
  nullable: false,
  resolve: (parent) => String(parent.id),
});

export const TalentPoolFileTalentPoolFieldObject = defineRelationObject('TalentPoolFile', 'talentPool', {
  description: undefined,
  nullable: false,
  args: undefined,
  query: undefined,
});

export const TalentPoolFileTalentPoolIdFieldObject = defineFieldObject('TalentPoolFile', {
  type: "Int",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.talentPoolId,
});

export const TalentPoolFileAttachmentFieldObject = defineRelationObject('TalentPoolFile', 'attachment', {
  description: undefined,
  nullable: false,
  args: undefined,
  query: undefined,
});

export const TalentPoolFileAttachmentIdFieldObject = defineFieldObject('TalentPoolFile', {
  type: "Int",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.attachmentId,
});
