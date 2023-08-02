import * as Inputs from '@/graphql/schema/__generated__/inputs'
import {
  defineExposeObject,
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils'

export const TalentPoolObject = definePrismaObject('TalentPool', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.exposeID('id', TalentPoolIdFieldObject),
    title: t.exposeString('title', TalentPoolTitleFieldObject),
    description: t.exposeString(
      'description',
      TalentPoolDescriptionFieldObject
    ),
    files: t.relation('files', TalentPoolFilesFieldObject(t)),
    matches: t.relation('matches', TalentPoolMatchesFieldObject(t)),
    follows: t.relation('follows', TalentPoolFollowsFieldObject(t)),
  }),
})

export const TalentPoolIdFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: false,
})

export const TalentPoolTitleFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: false,
})

export const TalentPoolDescriptionFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: false,
})

export const TalentPoolFilesFieldObject = defineRelationFunction(
  'TalentPool',
  (t) =>
    defineRelationObject('TalentPool', 'files', {
      description: undefined,
      nullable: false,
      args: {
        where: t.arg({
          type: Inputs.TalentPoolFileWhereInput,
          required: false,
        }),
        orderBy: t.arg({
          type: [Inputs.TalentPoolFileOrderByWithRelationInput],
          required: false,
        }),
        cursor: t.arg({
          type: Inputs.TalentPoolFileWhereUniqueInput,
          required: false,
        }),
        take: t.arg({ type: 'Int', required: false }),
        skip: t.arg({ type: 'Int', required: false }),
        distinct: t.arg({
          type: [Inputs.TalentPoolFileScalarFieldEnum],
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

export const TalentPoolMatchesFieldObject = defineRelationFunction(
  'TalentPool',
  (t) =>
    defineRelationObject('TalentPool', 'matches', {
      description: undefined,
      nullable: false,
      args: {
        where: t.arg({
          type: Inputs.TalentPoolMatchWhereInput,
          required: false,
        }),
        orderBy: t.arg({
          type: [Inputs.TalentPoolMatchOrderByWithRelationInput],
          required: false,
        }),
        cursor: t.arg({
          type: Inputs.TalentPoolMatchWhereUniqueInput,
          required: false,
        }),
        take: t.arg({ type: 'Int', required: false }),
        skip: t.arg({ type: 'Int', required: false }),
        distinct: t.arg({
          type: [Inputs.TalentPoolMatchScalarFieldEnum],
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

export const TalentPoolFollowsFieldObject = defineRelationFunction(
  'TalentPool',
  (t) =>
    defineRelationObject('TalentPool', 'follows', {
      description: undefined,
      nullable: false,
      args: {
        where: t.arg({ type: Inputs.FollowWhereInput, required: false }),
        orderBy: t.arg({
          type: [Inputs.FollowOrderByWithRelationInput],
          required: false,
        }),
        cursor: t.arg({ type: Inputs.FollowWhereUniqueInput, required: false }),
        take: t.arg({ type: 'Int', required: false }),
        skip: t.arg({ type: 'Int', required: false }),
        distinct: t.arg({
          type: [Inputs.FollowScalarFieldEnum],
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
