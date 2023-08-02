import * as Inputs from '@/graphql/schema/__generated__/inputs'
import {
  defineExposeObject,
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils'

export const CandidateCustomFieldsObject = definePrismaObject(
  'CandidateCustomFields',
  {
    description: undefined,
    findUnique: ({ id }) => ({ id }),
    fields: (t) => ({
      id: t.exposeID('id', CandidateCustomFieldsIdFieldObject),
      candidate: t.relation(
        'candidate',
        CandidateCustomFieldsCandidateFieldObject
      ),
      candidateId: t.exposeInt(
        'candidateId',
        CandidateCustomFieldsCandidateIdFieldObject
      ),
      inputType: t.exposeString(
        'inputType',
        CandidateCustomFieldsInputTypeFieldObject
      ),
      fieldKey: t.exposeString(
        'fieldKey',
        CandidateCustomFieldsFieldKeyFieldObject
      ),
      fieldValue: t.exposeString(
        'fieldValue',
        CandidateCustomFieldsFieldValueFieldObject
      ),
      fieldSettings: t.field(CandidateCustomFieldsFieldSettingsFieldObject),
      evaluationAnswers: t.relation(
        'evaluationAnswers',
        CandidateCustomFieldsEvaluationAnswersFieldObject(t)
      ),
    }),
  }
)

export const CandidateCustomFieldsIdFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: false,
})

export const CandidateCustomFieldsCandidateFieldObject = defineRelationObject(
  'CandidateCustomFields',
  'candidate',
  {
    description: undefined,
    nullable: false,
    args: undefined,
    query: undefined,
  }
)

export const CandidateCustomFieldsCandidateIdFieldObject = defineExposeObject(
  'Int',
  {
    description: undefined,
    nullable: false,
  }
)

export const CandidateCustomFieldsInputTypeFieldObject = defineExposeObject(
  'String',
  {
    description: undefined,
    nullable: false,
  }
)

export const CandidateCustomFieldsFieldKeyFieldObject = defineExposeObject(
  'String',
  {
    description: undefined,
    nullable: false,
  }
)

export const CandidateCustomFieldsFieldValueFieldObject = defineExposeObject(
  'String',
  {
    description: undefined,
    nullable: false,
  }
)

export const CandidateCustomFieldsFieldSettingsFieldObject = defineFieldObject(
  'CandidateCustomFields',
  {
    type: Inputs.Json,
    description: undefined,
    nullable: false,
    resolve: (parent) => parent.fieldSettings,
  }
)

export const CandidateCustomFieldsEvaluationAnswersFieldObject =
  defineRelationFunction('CandidateCustomFields', (t) =>
    defineRelationObject('CandidateCustomFields', 'evaluationAnswers', {
      description: undefined,
      nullable: false,
      args: {
        where: t.arg({
          type: Inputs.EvaluationAnswerWhereInput,
          required: false,
        }),
        orderBy: t.arg({
          type: [Inputs.EvaluationAnswerOrderByWithRelationInput],
          required: false,
        }),
        cursor: t.arg({
          type: Inputs.EvaluationAnswerWhereUniqueInput,
          required: false,
        }),
        take: t.arg({ type: 'Int', required: false }),
        skip: t.arg({ type: 'Int', required: false }),
        distinct: t.arg({
          type: [Inputs.EvaluationAnswerScalarFieldEnum],
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
