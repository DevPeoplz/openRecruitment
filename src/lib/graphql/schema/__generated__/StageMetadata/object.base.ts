import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { builder } from '../../builder';
import {
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils';

export const StageMetadataObject = definePrismaObject('StageMetadata', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.field(StageMetadataIdFieldObject),
    metaKey: t.field(StageMetadataMetaKeyFieldObject),
    metaValue: t.field(StageMetadataMetaValueFieldObject),
    stage: t.relation('stage', StageMetadataStageFieldObject),
    stageId: t.field(StageMetadataStageIdFieldObject),
  }),
});

export const StageMetadataIdFieldObject = defineFieldObject('StageMetadata', {
  type: "ID",
  description: undefined,
  nullable: false,
  resolve: (parent) => String(parent.id),
});

export const StageMetadataMetaKeyFieldObject = defineFieldObject('StageMetadata', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.metaKey,
});

export const StageMetadataMetaValueFieldObject = defineFieldObject('StageMetadata', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.metaValue,
});

export const StageMetadataStageFieldObject = defineRelationObject('StageMetadata', 'stage', {
  description: undefined,
  nullable: false,
  args: undefined,
  query: undefined,
});

export const StageMetadataStageIdFieldObject = defineFieldObject('StageMetadata', {
  type: "Int",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.stageId,
});
