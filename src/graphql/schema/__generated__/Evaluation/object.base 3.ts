import * as Inputs from '@/graphql/schema/__generated__/inputs'
import {
  defineExposeObject,
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils'

export const EvaluationObject = definePrismaObject('Evaluation', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.exposeID('id', EvaluationIdFieldObject),
    template: t.relation('template', EvaluationTemplateFieldObject),
    templateId: t.exposeInt('templateId', EvaluationTemplateIdFieldObject),
    offer: t.relation('offer', EvaluationOfferFieldObject),
    offerId: t.exposeInt('offerId', EvaluationOfferIdFieldObject),
    candidate: t.relation('candidate', EvaluationCandidateFieldObject),
    candidateId: t.exposeInt('candidateId', EvaluationCandidateIdFieldObject),
    teamMember: t.relation('teamMember', EvaluationTeamMemberFieldObject),
    teamMemberId: t.exposeInt(
      'teamMemberId',
      EvaluationTeamMemberIdFieldObject
    ),
    note: t.exposeString('note', EvaluationNoteFieldObject),
    isQuickEval: t.exposeBoolean(
      'isQuickEval',
      EvaluationIsQuickEvalFieldObject
    ),
    score: t.exposeInt('score', EvaluationScoreFieldObject),
    eventScheduleEvaluations: t.relation(
      'eventScheduleEvaluations',
      EvaluationEventScheduleEvaluationsFieldObject(t)
    ),
    eventEvaluations: t.relation(
      'eventEvaluations',
      EvaluationEventEvaluationsFieldObject(t)
    ),
    answers: t.relation('answers', EvaluationAnswersFieldObject(t)),
  }),
})

export const EvaluationIdFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: false,
})

export const EvaluationTemplateFieldObject = defineRelationObject(
  'Evaluation',
  'template',
  {
    description: undefined,
    nullable: false,
    args: undefined,
    query: undefined,
  }
)

export const EvaluationTemplateIdFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: false,
})

export const EvaluationOfferFieldObject = defineRelationObject(
  'Evaluation',
  'offer',
  {
    description: undefined,
    nullable: true,
    args: undefined,
    query: undefined,
  }
)

export const EvaluationOfferIdFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: true,
})

export const EvaluationCandidateFieldObject = defineRelationObject(
  'Evaluation',
  'candidate',
  {
    description: undefined,
    nullable: false,
    args: undefined,
    query: undefined,
  }
)

export const EvaluationCandidateIdFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: false,
})

export const EvaluationTeamMemberFieldObject = defineRelationObject(
  'Evaluation',
  'teamMember',
  {
    description: undefined,
    nullable: false,
    args: undefined,
    query: undefined,
  }
)

export const EvaluationTeamMemberIdFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: false,
})

export const EvaluationNoteFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: false,
})

export const EvaluationIsQuickEvalFieldObject = defineExposeObject('Boolean', {
  description: undefined,
  nullable: false,
})

export const EvaluationScoreFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: false,
})

export const EvaluationEventScheduleEvaluationsFieldObject =
  defineRelationFunction('Evaluation', (t) =>
    defineRelationObject('Evaluation', 'eventScheduleEvaluations', {
      description: undefined,
      nullable: false,
      args: {
        where: t.arg({
          type: Inputs.EventScheduleEvaluationWhereInput,
          required: false,
        }),
        orderBy: t.arg({
          type: [Inputs.EventScheduleEvaluationOrderByWithRelationInput],
          required: false,
        }),
        cursor: t.arg({
          type: Inputs.EventScheduleEvaluationWhereUniqueInput,
          required: false,
        }),
        take: t.arg({ type: 'Int', required: false }),
        skip: t.arg({ type: 'Int', required: false }),
        distinct: t.arg({
          type: [Inputs.EventScheduleEvaluationScalarFieldEnum],
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

export const EvaluationEventEvaluationsFieldObject = defineRelationFunction(
  'Evaluation',
  (t) =>
    defineRelationObject('Evaluation', 'eventEvaluations', {
      description: undefined,
      nullable: false,
      args: {
        where: t.arg({
          type: Inputs.EventEvaluationWhereInput,
          required: false,
        }),
        orderBy: t.arg({
          type: [Inputs.EventEvaluationOrderByWithRelationInput],
          required: false,
        }),
        cursor: t.arg({
          type: Inputs.EventEvaluationWhereUniqueInput,
          required: false,
        }),
        take: t.arg({ type: 'Int', required: false }),
        skip: t.arg({ type: 'Int', required: false }),
        distinct: t.arg({
          type: [Inputs.EventEvaluationScalarFieldEnum],
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

export const EvaluationAnswersFieldObject = defineRelationFunction(
  'Evaluation',
  (t) =>
    defineRelationObject('Evaluation', 'answers', {
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
