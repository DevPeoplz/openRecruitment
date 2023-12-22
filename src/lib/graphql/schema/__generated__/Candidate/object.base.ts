import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { builder } from '../../builder';
import {
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils';

export const CandidateObject = definePrismaObject('Candidate', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.field(CandidateIdFieldObject),
    firstName: t.field(CandidateFirstNameFieldObject),
    lastName: t.field(CandidateLastNameFieldObject),
    email: t.field(CandidateEmailFieldObject),
    phone: t.field(CandidatePhoneFieldObject),
    skills: t.field(CandidateSkillsFieldObject),
    mainLanguage: t.field(CandidateMainLanguageFieldObject),
    languages: t.field(CandidateLanguagesFieldObject),
    coverLetterText: t.field(CandidateCoverLetterTextFieldObject),
    birthday: t.field(CandidateBirthdayFieldObject),
    referrer: t.relation('referrer', CandidateReferrerFieldObject),
    referrerId: t.field(CandidateReferrerIdFieldObject),
    cv: t.relation('cv', CandidateCvFieldObject),
    cvId: t.field(CandidateCvIdFieldObject),
    avatar: t.relation('avatar', CandidateAvatarFieldObject),
    avatarId: t.field(CandidateAvatarIdFieldObject),
    coverLetter: t.relation('coverLetter', CandidateCoverLetterFieldObject),
    coverLetterId: t.field(CandidateCoverLetterIdFieldObject),
    educationLevel: t.field(CandidateEducationLevelFieldObject),
    socials: t.field(CandidateSocialsFieldObject),
    links: t.field(CandidateLinksFieldObject),
    salaryExpectation: t.field(CandidateSalaryExpectationFieldObject),
    hiredAt: t.relation('hiredAt', CandidateHiredAtFieldObject),
    hiredAtId: t.field(CandidateHiredAtIdFieldObject),
    hiredBy: t.relation('hiredBy', CandidateHiredByFieldObject),
    hiredById: t.field(CandidateHiredByIdFieldObject),
    auditLogs: t.relation('auditLogs', CandidateAuditLogsFieldObject(t)),
    offers: t.relation('offers', CandidateOffersFieldObject(t)),
    talentPools: t.relation('talentPools', CandidateTalentPoolsFieldObject(t)),
    candidateTags: t.relation('candidateTags', CandidateCandidateTagsFieldObject(t)),
    candidateCustomFields: t.relation('candidateCustomFields', CandidateCandidateCustomFieldsFieldObject(t)),
    evaluations: t.relation('evaluations', CandidateEvaluationsFieldObject(t)),
    tasks: t.relation('tasks', CandidateTasksFieldObject(t)),
    follows: t.relation('follows', CandidateFollowsFieldObject(t)),
    SharedCandidateLink: t.relation('SharedCandidateLink', CandidateSharedCandidateLinkFieldObject(t)),
    company: t.relation('company', CandidateCompanyFieldObject),
    companyId: t.field(CandidateCompanyIdFieldObject),
    createdAt: t.field(CandidateCreatedAtFieldObject),
    updatedAt: t.field(CandidateUpdatedAtFieldObject),
    events: t.relation('events', CandidateEventsFieldObject(t)),
  }),
});

export const CandidateIdFieldObject = defineFieldObject('Candidate', {
  type: "ID",
  description: undefined,
  nullable: false,
  resolve: (parent) => String(parent.id),
});

export const CandidateFirstNameFieldObject = defineFieldObject('Candidate', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.firstName,
});

export const CandidateLastNameFieldObject = defineFieldObject('Candidate', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.lastName,
});

export const CandidateEmailFieldObject = defineFieldObject('Candidate', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.email,
});

export const CandidatePhoneFieldObject = defineFieldObject('Candidate', {
  type: "String",
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.phone,
});

export const CandidateSkillsFieldObject = defineFieldObject('Candidate', {
  type: ["String"],
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.skills,
});

export const CandidateMainLanguageFieldObject = defineFieldObject('Candidate', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.mainLanguage,
});

export const CandidateLanguagesFieldObject = defineFieldObject('Candidate', {
  type: ["String"],
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.languages,
});

export const CandidateCoverLetterTextFieldObject = defineFieldObject('Candidate', {
  type: "String",
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.coverLetterText,
});

export const CandidateBirthdayFieldObject = defineFieldObject('Candidate', {
  type: Inputs.DateTime,
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.birthday,
});

export const CandidateReferrerFieldObject = defineRelationObject('Candidate', 'referrer', {
  description: undefined,
  nullable: true,
  args: undefined,
  query: undefined,
});

export const CandidateReferrerIdFieldObject = defineFieldObject('Candidate', {
  type: "Int",
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.referrerId,
});

export const CandidateCvFieldObject = defineRelationObject('Candidate', 'cv', {
  description: undefined,
  nullable: true,
  args: undefined,
  query: undefined,
});

export const CandidateCvIdFieldObject = defineFieldObject('Candidate', {
  type: "Int",
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.cvId,
});

export const CandidateAvatarFieldObject = defineRelationObject('Candidate', 'avatar', {
  description: undefined,
  nullable: true,
  args: undefined,
  query: undefined,
});

export const CandidateAvatarIdFieldObject = defineFieldObject('Candidate', {
  type: "Int",
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.avatarId,
});

export const CandidateCoverLetterFieldObject = defineRelationObject('Candidate', 'coverLetter', {
  description: undefined,
  nullable: true,
  args: undefined,
  query: undefined,
});

export const CandidateCoverLetterIdFieldObject = defineFieldObject('Candidate', {
  type: "Int",
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.coverLetterId,
});

export const CandidateEducationLevelFieldObject = defineFieldObject('Candidate', {
  type: "String",
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.educationLevel,
});

export const CandidateSocialsFieldObject = defineFieldObject('Candidate', {
  type: ["String"],
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.socials,
});

export const CandidateLinksFieldObject = defineFieldObject('Candidate', {
  type: ["String"],
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.links,
});

export const CandidateSalaryExpectationFieldObject = defineFieldObject('Candidate', {
  type: "Int",
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.salaryExpectation,
});

export const CandidateHiredAtFieldObject = defineRelationObject('Candidate', 'hiredAt', {
  description: undefined,
  nullable: true,
  args: undefined,
  query: undefined,
});

export const CandidateHiredAtIdFieldObject = defineFieldObject('Candidate', {
  type: "Int",
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.hiredAtId,
});

export const CandidateHiredByFieldObject = defineRelationObject('Candidate', 'hiredBy', {
  description: undefined,
  nullable: true,
  args: undefined,
  query: undefined,
});

export const CandidateHiredByIdFieldObject = defineFieldObject('Candidate', {
  type: "Int",
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.hiredById,
});

export const CandidateAuditLogsFieldArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.AuditLogWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.AuditLogOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.AuditLogWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.AuditLogScalarFieldEnum], required: false }),
}))

export const CandidateAuditLogsFieldObject = defineRelationFunction('Candidate', (t) =>
  defineRelationObject('Candidate', 'auditLogs', {
    description: undefined,
    nullable: false,
    args: CandidateAuditLogsFieldArgs,
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

export const CandidateOffersFieldArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.MatchWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.MatchOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.MatchWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.MatchScalarFieldEnum], required: false }),
}))

export const CandidateOffersFieldObject = defineRelationFunction('Candidate', (t) =>
  defineRelationObject('Candidate', 'offers', {
    description: undefined,
    nullable: false,
    args: CandidateOffersFieldArgs,
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

export const CandidateTalentPoolsFieldArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.TalentPoolMatchWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.TalentPoolMatchOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.TalentPoolMatchWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.TalentPoolMatchScalarFieldEnum], required: false }),
}))

export const CandidateTalentPoolsFieldObject = defineRelationFunction('Candidate', (t) =>
  defineRelationObject('Candidate', 'talentPools', {
    description: undefined,
    nullable: false,
    args: CandidateTalentPoolsFieldArgs,
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

export const CandidateCandidateTagsFieldArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.CandidateTagWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.CandidateTagOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.CandidateTagWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.CandidateTagScalarFieldEnum], required: false }),
}))

export const CandidateCandidateTagsFieldObject = defineRelationFunction('Candidate', (t) =>
  defineRelationObject('Candidate', 'candidateTags', {
    description: undefined,
    nullable: false,
    args: CandidateCandidateTagsFieldArgs,
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

export const CandidateCandidateCustomFieldsFieldArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.CandidateCustomFieldWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.CandidateCustomFieldOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.CandidateCustomFieldWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.CandidateCustomFieldScalarFieldEnum], required: false }),
}))

export const CandidateCandidateCustomFieldsFieldObject = defineRelationFunction('Candidate', (t) =>
  defineRelationObject('Candidate', 'candidateCustomFields', {
    description: undefined,
    nullable: false,
    args: CandidateCandidateCustomFieldsFieldArgs,
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

export const CandidateEvaluationsFieldArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.EvaluationWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.EvaluationOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.EvaluationWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.EvaluationScalarFieldEnum], required: false }),
}))

export const CandidateEvaluationsFieldObject = defineRelationFunction('Candidate', (t) =>
  defineRelationObject('Candidate', 'evaluations', {
    description: undefined,
    nullable: false,
    args: CandidateEvaluationsFieldArgs,
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

export const CandidateTasksFieldArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.TaskWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.TaskOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.TaskWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.TaskScalarFieldEnum], required: false }),
}))

export const CandidateTasksFieldObject = defineRelationFunction('Candidate', (t) =>
  defineRelationObject('Candidate', 'tasks', {
    description: undefined,
    nullable: false,
    args: CandidateTasksFieldArgs,
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

export const CandidateFollowsFieldArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.FollowWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.FollowOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.FollowWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.FollowScalarFieldEnum], required: false }),
}))

export const CandidateFollowsFieldObject = defineRelationFunction('Candidate', (t) =>
  defineRelationObject('Candidate', 'follows', {
    description: undefined,
    nullable: false,
    args: CandidateFollowsFieldArgs,
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

export const CandidateSharedCandidateLinkFieldArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.SharedCandidateLinkWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.SharedCandidateLinkOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.SharedCandidateLinkWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.SharedCandidateLinkScalarFieldEnum], required: false }),
}))

export const CandidateSharedCandidateLinkFieldObject = defineRelationFunction('Candidate', (t) =>
  defineRelationObject('Candidate', 'SharedCandidateLink', {
    description: undefined,
    nullable: false,
    args: CandidateSharedCandidateLinkFieldArgs,
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

export const CandidateCompanyFieldObject = defineRelationObject('Candidate', 'company', {
  description: undefined,
  nullable: false,
  args: undefined,
  query: undefined,
});

export const CandidateCompanyIdFieldObject = defineFieldObject('Candidate', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.companyId,
});

export const CandidateCreatedAtFieldObject = defineFieldObject('Candidate', {
  type: Inputs.DateTime,
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.createdAt,
});

export const CandidateUpdatedAtFieldObject = defineFieldObject('Candidate', {
  type: Inputs.DateTime,
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.updatedAt,
});

export const CandidateEventsFieldArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.EventWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.EventOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.EventWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.EventScalarFieldEnum], required: false }),
}))

export const CandidateEventsFieldObject = defineRelationFunction('Candidate', (t) =>
  defineRelationObject('Candidate', 'events', {
    description: undefined,
    nullable: false,
    args: CandidateEventsFieldArgs,
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
