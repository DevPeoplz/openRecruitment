import * as Inputs from '@/graphql/schema/__generated__/inputs'
import {
  defineExposeObject,
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils'

export const StageObject = definePrismaObject('Stage', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.exposeID('id', StageIdFieldObject),
    position: t.exposeInt('position', StagePositionFieldObject),
    category: t.exposeString('category', StageCategoryFieldObject),
    inputType: t.exposeString('inputType', StageInputTypeFieldObject),
    value: t.exposeString('value', StageValueFieldObject),
    template: t.relation('template', StageTemplateFieldObject),
    templateId: t.exposeInt('templateId', StageTemplateIdFieldObject),
    isProtected: t.exposeBoolean('isProtected', StageIsProtectedFieldObject),
    matches: t.relation('matches', StageMatchesFieldObject(t)),
    visibility: t.relation('visibility', StageVisibilityFieldObject(t)),
    metadata: t.relation('metadata', StageMetadataFieldObject(t)),
  }),
})

export const StageIdFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: false,
})

export const StagePositionFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: false,
})

export const StageCategoryFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: false,
})

export const StageInputTypeFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: false,
})

export const StageValueFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: false,
})

export const StageTemplateFieldObject = defineRelationObject(
  'Stage',
  'template',
  {
    description: undefined,
    nullable: false,
    args: undefined,
    query: undefined,
  }
)

export const StageTemplateIdFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: false,
})

export const StageIsProtectedFieldObject = defineExposeObject('Boolean', {
  description: undefined,
  nullable: false,
})

export const StageMatchesFieldObject = defineRelationFunction('Stage', (t) =>
  defineRelationObject('Stage', 'matches', {
    description: undefined,
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.MatchWhereInput, required: false }),
      orderBy: t.arg({
        type: [Inputs.MatchOrderByWithRelationInput],
        required: false,
      }),
      cursor: t.arg({ type: Inputs.MatchWhereUniqueInput, required: false }),
      take: t.arg({ type: 'Int', required: false }),
      skip: t.arg({ type: 'Int', required: false }),
      distinct: t.arg({ type: [Inputs.MatchScalarFieldEnum], required: false }),
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

export const StageVisibilityFieldObject = defineRelationFunction('Stage', (t) =>
  defineRelationObject('Stage', 'visibility', {
    description: undefined,
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.StageVisibilityWhereInput, required: false }),
      orderBy: t.arg({
        type: [Inputs.StageVisibilityOrderByWithRelationInput],
        required: false,
      }),
      cursor: t.arg({
        type: Inputs.StageVisibilityWhereUniqueInput,
        required: false,
      }),
      take: t.arg({ type: 'Int', required: false }),
      skip: t.arg({ type: 'Int', required: false }),
      distinct: t.arg({
        type: [Inputs.StageVisibilityScalarFieldEnum],
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

export const StageMetadataFieldObject = defineRelationFunction('Stage', (t) =>
  defineRelationObject('Stage', 'metadata', {
    description: undefined,
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.StageMetadataWhereInput, required: false }),
      orderBy: t.arg({
        type: [Inputs.StageMetadataOrderByWithRelationInput],
        required: false,
      }),
      cursor: t.arg({
        type: Inputs.StageMetadataWhereUniqueInput,
        required: false,
      }),
      take: t.arg({ type: 'Int', required: false }),
      skip: t.arg({ type: 'Int', required: false }),
      distinct: t.arg({
        type: [Inputs.StageMetadataScalarFieldEnum],
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
