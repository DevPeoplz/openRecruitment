import * as Inputs from '@/graphql/schema/__generated__/inputs'
import {
  defineExposeObject,
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils'

export const TalentPoolFileObject = definePrismaObject('TalentPoolFile', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.exposeID('id', TalentPoolFileIdFieldObject),
    talentPool: t.relation('talentPool', TalentPoolFileTalentPoolFieldObject),
    talentPoolId: t.exposeInt(
      'talentPoolId',
      TalentPoolFileTalentPoolIdFieldObject
    ),
    attachment: t.relation('attachment', TalentPoolFileAttachmentFieldObject),
    attachmentId: t.exposeInt(
      'attachmentId',
      TalentPoolFileAttachmentIdFieldObject
    ),
  }),
})

export const TalentPoolFileIdFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: false,
})

export const TalentPoolFileTalentPoolFieldObject = defineRelationObject(
  'TalentPoolFile',
  'talentPool',
  {
    description: undefined,
    nullable: false,
    args: undefined,
    query: undefined,
  }
)

export const TalentPoolFileTalentPoolIdFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: false,
})

export const TalentPoolFileAttachmentFieldObject = defineRelationObject(
  'TalentPoolFile',
  'attachment',
  {
    description: undefined,
    nullable: false,
    args: undefined,
    query: undefined,
  }
)

export const TalentPoolFileAttachmentIdFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: false,
})
