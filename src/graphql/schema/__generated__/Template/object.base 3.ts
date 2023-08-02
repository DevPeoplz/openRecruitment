import * as Inputs from '@/graphql/schema/__generated__/inputs'
import {
  defineExposeObject,
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils'

export const TemplateObject = definePrismaObject('Template', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.exposeID('id', TemplateIdFieldObject),
    company: t.relation('company', TemplateCompanyFieldObject),
    companyId: t.exposeString('companyId', TemplateCompanyIdFieldObject),
    isCompanyWide: t.exposeBoolean(
      'isCompanyWide',
      TemplateIsCompanyWideFieldObject
    ),
    type: t.field(TemplateTypeFieldObject),
    name: t.exposeString('name', TemplateNameFieldObject),
    category: t.exposeString('category', TemplateCategoryFieldObject),
    screeningQuestionsTemplate: t.relation(
      'screeningQuestionsTemplate',
      TemplateScreeningQuestionsTemplateFieldObject
    ),
    pipelineTemplate: t.relation(
      'pipelineTemplate',
      TemplatePipelineTemplateFieldObject
    ),
    autoConfirmationEmail: t.relation(
      'autoConfirmationEmail',
      TemplateAutoConfirmationEmailFieldObject
    ),
    stages: t.relation('stages', TemplateStagesFieldObject(t)),
    evaluations: t.relation('evaluations', TemplateEvaluationsFieldObject(t)),
  }),
})

export const TemplateIdFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: false,
})

export const TemplateCompanyFieldObject = defineRelationObject(
  'Template',
  'company',
  {
    description: undefined,
    nullable: false,
    args: undefined,
    query: undefined,
  }
)

export const TemplateCompanyIdFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: false,
})

export const TemplateIsCompanyWideFieldObject = defineExposeObject('Boolean', {
  description: undefined,
  nullable: false,
})

export const TemplateTypeFieldObject = defineFieldObject('Template', {
  type: Inputs.TemplateTypes,
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.type,
})

export const TemplateNameFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: false,
})

export const TemplateCategoryFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: false,
})

export const TemplateScreeningQuestionsTemplateFieldObject =
  defineRelationObject('Template', 'screeningQuestionsTemplate', {
    description: undefined,
    nullable: true,
    args: undefined,
    query: undefined,
  })

export const TemplatePipelineTemplateFieldObject = defineRelationObject(
  'Template',
  'pipelineTemplate',
  {
    description: undefined,
    nullable: true,
    args: undefined,
    query: undefined,
  }
)

export const TemplateAutoConfirmationEmailFieldObject = defineRelationObject(
  'Template',
  'autoConfirmationEmail',
  {
    description: undefined,
    nullable: true,
    args: undefined,
    query: undefined,
  }
)

export const TemplateStagesFieldObject = defineRelationFunction(
  'Template',
  (t) =>
    defineRelationObject('Template', 'stages', {
      description: undefined,
      nullable: false,
      args: {
        where: t.arg({ type: Inputs.StageWhereInput, required: false }),
        orderBy: t.arg({
          type: [Inputs.StageOrderByWithRelationInput],
          required: false,
        }),
        cursor: t.arg({ type: Inputs.StageWhereUniqueInput, required: false }),
        take: t.arg({ type: 'Int', required: false }),
        skip: t.arg({ type: 'Int', required: false }),
        distinct: t.arg({
          type: [Inputs.StageScalarFieldEnum],
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

export const TemplateEvaluationsFieldObject = defineRelationFunction(
  'Template',
  (t) =>
    defineRelationObject('Template', 'evaluations', {
      description: undefined,
      nullable: false,
      args: {
        where: t.arg({ type: Inputs.EvaluationWhereInput, required: false }),
        orderBy: t.arg({
          type: [Inputs.EvaluationOrderByWithRelationInput],
          required: false,
        }),
        cursor: t.arg({
          type: Inputs.EvaluationWhereUniqueInput,
          required: false,
        }),
        take: t.arg({ type: 'Int', required: false }),
        skip: t.arg({ type: 'Int', required: false }),
        distinct: t.arg({
          type: [Inputs.EvaluationScalarFieldEnum],
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
