import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { builder } from '../../builder';
import {
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils';

export const OfferObject = definePrismaObject('Offer', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.field(OfferIdFieldObject),
    name: t.field(OfferNameFieldObject),
    company: t.relation('company', OfferCompanyFieldObject),
    companyId: t.field(OfferCompanyIdFieldObject),
    deparment: t.relation('deparment', OfferDeparmentFieldObject),
    deparmentId: t.field(OfferDeparmentIdFieldObject),
    recruiter: t.relation('recruiter', OfferRecruiterFieldObject),
    recruiterId: t.field(OfferRecruiterIdFieldObject),
    hiringManager: t.relation('hiringManager', OfferHiringManagerFieldObject),
    hiringManagerId: t.field(OfferHiringManagerIdFieldObject),
    description: t.field(OfferDescriptionFieldObject),
    requirements: t.field(OfferRequirementsFieldObject),
    locationCountry: t.field(OfferLocationCountryFieldObject),
    locationState: t.field(OfferLocationStateFieldObject),
    locationCity: t.field(OfferLocationCityFieldObject),
    locationStreet: t.field(OfferLocationStreetFieldObject),
    zipcode: t.field(OfferZipcodeFieldObject),
    remote: t.field(OfferRemoteFieldObject),
    jobType: t.field(OfferJobTypeFieldObject),
    jobCategory: t.field(OfferJobCategoryFieldObject),
    jobReqEducation: t.field(OfferJobReqEducationFieldObject),
    jobReqExperience: t.field(OfferJobReqExperienceFieldObject),
    jobHoursMin: t.field(OfferJobHoursMinFieldObject),
    jobHoursMax: t.field(OfferJobHoursMaxFieldObject),
    jobSalaryMin: t.field(OfferJobSalaryMinFieldObject),
    jobSalaryMax: t.field(OfferJobSalaryMaxFieldObject),
    jobSalaryPeriod: t.field(OfferJobSalaryPeriodFieldObject),
    jobSalaryCurrency: t.field(OfferJobSalaryCurrencyFieldObject),
    personalInfoCv: t.field(OfferPersonalInfoCvFieldObject),
    personalInfoCoverLetter: t.field(OfferPersonalInfoCoverLetterFieldObject),
    personalInfoPhoto: t.field(OfferPersonalInfoPhotoFieldObject),
    personalInfoPhone: t.field(OfferPersonalInfoPhoneFieldObject),
    screeningQuestionsTemplate: t.relation('screeningQuestionsTemplate', OfferScreeningQuestionsTemplateFieldObject),
    screeningQuestionsTemplateId: t.field(OfferScreeningQuestionsTemplateIdFieldObject),
    pipelineTemplate: t.relation('pipelineTemplate', OfferPipelineTemplateFieldObject),
    pipelineTemplateId: t.field(OfferPipelineTemplateIdFieldObject),
    autoConfirmationEmail: t.relation('autoConfirmationEmail', OfferAutoConfirmationEmailFieldObject),
    autoConfirmationEmailId: t.field(OfferAutoConfirmationEmailIdFieldObject),
    isPublished: t.field(OfferIsPublishedFieldObject),
    auditLogs: t.relation('auditLogs', OfferAuditLogsFieldObject(t)),
    files: t.relation('files', OfferFilesFieldObject(t)),
    offerTags: t.relation('offerTags', OfferOfferTagsFieldObject(t)),
    memberships: t.relation('memberships', OfferMembershipsFieldObject(t)),
    matches: t.relation('matches', OfferMatchesFieldObject(t)),
    hired: t.relation('hired', OfferHiredFieldObject(t)),
    evaluations: t.relation('evaluations', OfferEvaluationsFieldObject(t)),
    follows: t.relation('follows', OfferFollowsFieldObject(t)),
  }),
});

export const OfferIdFieldObject = defineFieldObject('Offer', {
  type: "ID",
  description: undefined,
  nullable: false,
  resolve: (parent) => String(parent.id),
});

export const OfferNameFieldObject = defineFieldObject('Offer', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.name,
});

export const OfferCompanyFieldObject = defineRelationObject('Offer', 'company', {
  description: undefined,
  nullable: false,
  args: undefined,
  query: undefined,
});

export const OfferCompanyIdFieldObject = defineFieldObject('Offer', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.companyId,
});

export const OfferDeparmentFieldObject = defineRelationObject('Offer', 'deparment', {
  description: undefined,
  nullable: true,
  args: undefined,
  query: undefined,
});

export const OfferDeparmentIdFieldObject = defineFieldObject('Offer', {
  type: "Int",
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.deparmentId,
});

export const OfferRecruiterFieldObject = defineRelationObject('Offer', 'recruiter', {
  description: undefined,
  nullable: true,
  args: undefined,
  query: undefined,
});

export const OfferRecruiterIdFieldObject = defineFieldObject('Offer', {
  type: "Int",
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.recruiterId,
});

export const OfferHiringManagerFieldObject = defineRelationObject('Offer', 'hiringManager', {
  description: undefined,
  nullable: true,
  args: undefined,
  query: undefined,
});

export const OfferHiringManagerIdFieldObject = defineFieldObject('Offer', {
  type: "Int",
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.hiringManagerId,
});

export const OfferDescriptionFieldObject = defineFieldObject('Offer', {
  type: "String",
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.description,
});

export const OfferRequirementsFieldObject = defineFieldObject('Offer', {
  type: "String",
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.requirements,
});

export const OfferLocationCountryFieldObject = defineFieldObject('Offer', {
  type: "String",
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.locationCountry,
});

export const OfferLocationStateFieldObject = defineFieldObject('Offer', {
  type: "String",
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.locationState,
});

export const OfferLocationCityFieldObject = defineFieldObject('Offer', {
  type: "String",
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.locationCity,
});

export const OfferLocationStreetFieldObject = defineFieldObject('Offer', {
  type: "String",
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.locationStreet,
});

export const OfferZipcodeFieldObject = defineFieldObject('Offer', {
  type: "String",
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.zipcode,
});

export const OfferRemoteFieldObject = defineFieldObject('Offer', {
  type: "Boolean",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.remote,
});

export const OfferJobTypeFieldObject = defineFieldObject('Offer', {
  type: "String",
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.jobType,
});

export const OfferJobCategoryFieldObject = defineFieldObject('Offer', {
  type: "String",
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.jobCategory,
});

export const OfferJobReqEducationFieldObject = defineFieldObject('Offer', {
  type: "String",
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.jobReqEducation,
});

export const OfferJobReqExperienceFieldObject = defineFieldObject('Offer', {
  type: "String",
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.jobReqExperience,
});

export const OfferJobHoursMinFieldObject = defineFieldObject('Offer', {
  type: "Int",
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.jobHoursMin,
});

export const OfferJobHoursMaxFieldObject = defineFieldObject('Offer', {
  type: "Int",
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.jobHoursMax,
});

export const OfferJobSalaryMinFieldObject = defineFieldObject('Offer', {
  type: "Int",
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.jobSalaryMin,
});

export const OfferJobSalaryMaxFieldObject = defineFieldObject('Offer', {
  type: "Int",
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.jobSalaryMax,
});

export const OfferJobSalaryPeriodFieldObject = defineFieldObject('Offer', {
  type: "String",
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.jobSalaryPeriod,
});

export const OfferJobSalaryCurrencyFieldObject = defineFieldObject('Offer', {
  type: "String",
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.jobSalaryCurrency,
});

export const OfferPersonalInfoCvFieldObject = defineFieldObject('Offer', {
  type: Inputs.OfferPersonalItems,
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.personalInfoCv,
});

export const OfferPersonalInfoCoverLetterFieldObject = defineFieldObject('Offer', {
  type: Inputs.OfferPersonalItems,
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.personalInfoCoverLetter,
});

export const OfferPersonalInfoPhotoFieldObject = defineFieldObject('Offer', {
  type: Inputs.OfferPersonalItems,
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.personalInfoPhoto,
});

export const OfferPersonalInfoPhoneFieldObject = defineFieldObject('Offer', {
  type: Inputs.OfferPersonalItems,
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.personalInfoPhone,
});

export const OfferScreeningQuestionsTemplateFieldObject = defineRelationObject('Offer', 'screeningQuestionsTemplate', {
  description: undefined,
  nullable: true,
  args: undefined,
  query: undefined,
});

export const OfferScreeningQuestionsTemplateIdFieldObject = defineFieldObject('Offer', {
  type: "Int",
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.screeningQuestionsTemplateId,
});

export const OfferPipelineTemplateFieldObject = defineRelationObject('Offer', 'pipelineTemplate', {
  description: undefined,
  nullable: true,
  args: undefined,
  query: undefined,
});

export const OfferPipelineTemplateIdFieldObject = defineFieldObject('Offer', {
  type: "Int",
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.pipelineTemplateId,
});

export const OfferAutoConfirmationEmailFieldObject = defineRelationObject('Offer', 'autoConfirmationEmail', {
  description: undefined,
  nullable: true,
  args: undefined,
  query: undefined,
});

export const OfferAutoConfirmationEmailIdFieldObject = defineFieldObject('Offer', {
  type: "Int",
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.autoConfirmationEmailId,
});

export const OfferIsPublishedFieldObject = defineFieldObject('Offer', {
  type: "Boolean",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.isPublished,
});

export const OfferAuditLogsFieldArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.AuditLogWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.AuditLogOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.AuditLogWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.AuditLogScalarFieldEnum], required: false }),
}))

export const OfferAuditLogsFieldObject = defineRelationFunction('Offer', (t) =>
  defineRelationObject('Offer', 'auditLogs', {
    description: undefined,
    nullable: false,
    args: OfferAuditLogsFieldArgs,
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

export const OfferFilesFieldArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.OfferFileWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.OfferFileOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.OfferFileWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.OfferFileScalarFieldEnum], required: false }),
}))

export const OfferFilesFieldObject = defineRelationFunction('Offer', (t) =>
  defineRelationObject('Offer', 'files', {
    description: undefined,
    nullable: false,
    args: OfferFilesFieldArgs,
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

export const OfferOfferTagsFieldArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.OfferTagWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.OfferTagOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.OfferTagWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.OfferTagScalarFieldEnum], required: false }),
}))

export const OfferOfferTagsFieldObject = defineRelationFunction('Offer', (t) =>
  defineRelationObject('Offer', 'offerTags', {
    description: undefined,
    nullable: false,
    args: OfferOfferTagsFieldArgs,
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

export const OfferMembershipsFieldArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.MembershipWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.MembershipOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.MembershipWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.MembershipScalarFieldEnum], required: false }),
}))

export const OfferMembershipsFieldObject = defineRelationFunction('Offer', (t) =>
  defineRelationObject('Offer', 'memberships', {
    description: undefined,
    nullable: false,
    args: OfferMembershipsFieldArgs,
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

export const OfferMatchesFieldArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.MatchWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.MatchOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.MatchWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.MatchScalarFieldEnum], required: false }),
}))

export const OfferMatchesFieldObject = defineRelationFunction('Offer', (t) =>
  defineRelationObject('Offer', 'matches', {
    description: undefined,
    nullable: false,
    args: OfferMatchesFieldArgs,
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

export const OfferHiredFieldArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.CandidateWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.CandidateOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.CandidateWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.CandidateScalarFieldEnum], required: false }),
}))

export const OfferHiredFieldObject = defineRelationFunction('Offer', (t) =>
  defineRelationObject('Offer', 'hired', {
    description: undefined,
    nullable: false,
    args: OfferHiredFieldArgs,
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

export const OfferEvaluationsFieldArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.EvaluationWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.EvaluationOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.EvaluationWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.EvaluationScalarFieldEnum], required: false }),
}))

export const OfferEvaluationsFieldObject = defineRelationFunction('Offer', (t) =>
  defineRelationObject('Offer', 'evaluations', {
    description: undefined,
    nullable: false,
    args: OfferEvaluationsFieldArgs,
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

export const OfferFollowsFieldArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.FollowWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.FollowOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.FollowWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.FollowScalarFieldEnum], required: false }),
}))

export const OfferFollowsFieldObject = defineRelationFunction('Offer', (t) =>
  defineRelationObject('Offer', 'follows', {
    description: undefined,
    nullable: false,
    args: OfferFollowsFieldArgs,
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
