import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { builder } from '../../builder';
import {
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils';

export const EvaluationObject = definePrismaObject('Evaluation', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.field(EvaluationIdFieldObject),
    template: t.relation('template', EvaluationTemplateFieldObject),
    templateId: t.field(EvaluationTemplateIdFieldObject),
    offer: t.relation('offer', EvaluationOfferFieldObject),
    offerId: t.field(EvaluationOfferIdFieldObject),
    candidate: t.relation('candidate', EvaluationCandidateFieldObject),
    candidateId: t.field(EvaluationCandidateIdFieldObject),
    teamMember: t.relation('teamMember', EvaluationTeamMemberFieldObject),
    teamMemberId: t.field(EvaluationTeamMemberIdFieldObject),
    isQuickEval: t.field(EvaluationIsQuickEvalFieldObject),
    score: t.field(EvaluationScoreFieldObject),
    eventScheduleEvaluations: t.relation('eventScheduleEvaluations', EvaluationEventScheduleEvaluationsFieldObject(t)),
    event: t.relation('event', EvaluationEventFieldObject),
    eventId: t.field(EvaluationEventIdFieldObject),
    answers: t.relation('answers', EvaluationAnswersFieldObject(t)),
  }),
});

export const EvaluationIdFieldObject = defineFieldObject('Evaluation', {
  type: "ID",
  description: undefined,
  nullable: false,
  resolve: (parent) => String(parent.id),
});

export const EvaluationTemplateFieldObject = defineRelationObject('Evaluation', 'template', {
  description: undefined,
  nullable: true,
  args: undefined,
  query: undefined,
});

export const EvaluationTemplateIdFieldObject = defineFieldObject('Evaluation', {
  type: "Int",
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.templateId,
});

export const EvaluationOfferFieldObject = defineRelationObject('Evaluation', 'offer', {
  description: undefined,
  nullable: true,
  args: undefined,
  query: undefined,
});

export const EvaluationOfferIdFieldObject = defineFieldObject('Evaluation', {
  type: "Int",
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.offerId,
});

export const EvaluationCandidateFieldObject = defineRelationObject('Evaluation', 'candidate', {
  description: undefined,
  nullable: false,
  args: undefined,
  query: undefined,
});

export const EvaluationCandidateIdFieldObject = defineFieldObject('Evaluation', {
  type: "Int",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.candidateId,
});

export const EvaluationTeamMemberFieldObject = defineRelationObject('Evaluation', 'teamMember', {
  description: undefined,
  nullable: false,
  args: undefined,
  query: undefined,
});

export const EvaluationTeamMemberIdFieldObject = defineFieldObject('Evaluation', {
  type: "Int",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.teamMemberId,
});

export const EvaluationIsQuickEvalFieldObject = defineFieldObject('Evaluation', {
  type: "Boolean",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.isQuickEval,
});

export const EvaluationScoreFieldObject = defineFieldObject('Evaluation', {
  type: Inputs.SCORE_TYPES,
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.score,
});

export const EvaluationEventScheduleEvaluationsFieldArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.EventScheduleEvaluationWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.EventScheduleEvaluationOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.EventScheduleEvaluationWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.EventScheduleEvaluationScalarFieldEnum], required: false }),
}))

export const EvaluationEventScheduleEvaluationsFieldObject = defineRelationFunction('Evaluation', (t) =>
  defineRelationObject('Evaluation', 'eventScheduleEvaluations', {
    description: undefined,
    nullable: false,
    args: EvaluationEventScheduleEvaluationsFieldArgs,
    query: (args) => ({
      where: args.where || undefined,
      cursor: args.cursor || undefined,
      take: args.take || undefined,
      distinct: args.distinct || undefined,
      skip: args.skip || undefined,
      orderBy: args.orderBy || undefined,
    }),
  }),
);

export const EvaluationEventFieldObject = defineRelationObject('Evaluation', 'event', {
  description: undefined,
  nullable: true,
  args: undefined,
  query: undefined,
});

export const EvaluationEventIdFieldObject = defineFieldObject('Evaluation', {
  type: "Int",
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.eventId,
});

export const EvaluationAnswersFieldArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.EvaluationQuestionWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.EvaluationQuestionOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.EvaluationQuestionWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.EvaluationQuestionScalarFieldEnum], required: false }),
}))

export const EvaluationAnswersFieldObject = defineRelationFunction('Evaluation', (t) =>
  defineRelationObject('Evaluation', 'answers', {
    description: undefined,
    nullable: false,
    args: EvaluationAnswersFieldArgs,
    query: (args) => ({
      where: args.where || undefined,
      cursor: args.cursor || undefined,
      take: args.take || undefined,
      distinct: args.distinct || undefined,
      skip: args.skip || undefined,
      orderBy: args.orderBy || undefined,
    }),
  }),
);
