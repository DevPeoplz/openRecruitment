import * as Inputs from '@/graphql/schema/__generated__/inputs'
import {
  defineExposeObject,
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils'

export const StageMetadataObject = definePrismaObject('StageMetadata', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.exposeID('id', StageMetadataIdFieldObject),
    metaKey: t.exposeString('metaKey', StageMetadataMetaKeyFieldObject),
    metaValue: t.exposeString('metaValue', StageMetadataMetaValueFieldObject),
    stage: t.relation('stage', StageMetadataStageFieldObject),
    stageId: t.exposeInt('stageId', StageMetadataStageIdFieldObject),
  }),
})

export const StageMetadataIdFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: false,
})

export const StageMetadataMetaKeyFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: false,
})

export const StageMetadataMetaValueFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: false,
})

export const StageMetadataStageFieldObject = defineRelationObject(
  'StageMetadata',
  'stage',
  {
    description: undefined,
    nullable: false,
    args: undefined,
    query: undefined,
  }
)

export const StageMetadataStageIdFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: false,
})
