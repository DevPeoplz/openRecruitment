import * as Inputs from '@/graphql/schema/__generated__/inputs'
import {
  defineExposeObject,
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils'

export const CandidateObject = definePrismaObject('Candidate', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.exposeID('id', CandidateIdFieldObject),
    firstName: t.exposeString('firstName', CandidateFirstNameFieldObject),
    lastName: t.exposeString('lastName', CandidateLastNameFieldObject),
    initials: t.exposeString('initials', CandidateInitialsFieldObject),
    email: t.exposeString('email', CandidateEmailFieldObject),
    phone: t.exposeString('phone', CandidatePhoneFieldObject),
    skills: t.exposeStringList('skills', CandidateSkillsFieldObject),
    mainLanguage: t.exposeString(
      'mainLanguage',
      CandidateMainLanguageFieldObject
    ),
    languages: t.exposeStringList('languages', CandidateLanguagesFieldObject),
    coverLetter: t.exposeString('coverLetter', CandidateCoverLetterFieldObject),
    birthDate: t.field(CandidateBirthDateFieldObject),
    referrer: t.relation('referrer', CandidateReferrerFieldObject),
    referrerId: t.exposeInt('referrerId', CandidateReferrerIdFieldObject),
    cv: t.relation('cv', CandidateCvFieldObject),
    cvId: t.exposeInt('cvId', CandidateCvIdFieldObject),
    educationLevel: t.exposeString(
      'educationLevel',
      CandidateEducationLevelFieldObject
    ),
    socials: t.exposeStringList('socials', CandidateSocialsFieldObject),
    links: t.exposeStringList('links', CandidateLinksFieldObject),
    salaryExpectation: t.exposeString(
      'salaryExpectation',
      CandidateSalaryExpectationFieldObject
    ),
    isHired: t.exposeBoolean('isHired', CandidateIsHiredFieldObject),
    hiredAt: t.relation('hiredAt', CandidateHiredAtFieldObject),
    hiredAtId: t.exposeInt('hiredAtId', CandidateHiredAtIdFieldObject),
    hiredBy: t.relation('hiredBy', CandidateHiredByFieldObject),
    hiredById: t.exposeInt('hiredById', CandidateHiredByIdFieldObject),
    auditLogs: t.relation('auditLogs', CandidateAuditLogsFieldObject(t)),
    offers: t.relation('offers', CandidateOffersFieldObject(t)),
    talentPools: t.relation('talentPools', CandidateTalentPoolsFieldObject(t)),
    candidateTags: t.relation(
      'candidateTags',
      CandidateCandidateTagsFieldObject(t)
    ),
    customFields: t.relation(
      'customFields',
      CandidateCustomFieldsFieldObject(t)
    ),
    evaluation: t.relation('evaluation', CandidateEvaluationFieldObject(t)),
    tasks: t.relation('tasks', CandidateTasksFieldObject(t)),
    follows: t.relation('follows', CandidateFollowsFieldObject(t)),
    SharedCandidateLink: t.relation(
      'SharedCandidateLink',
      CandidateSharedCandidateLinkFieldObject(t)
    ),
  }),
})

export const CandidateIdFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: false,
})

export const CandidateFirstNameFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: false,
})

export const CandidateLastNameFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: false,
})

export const CandidateInitialsFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: false,
})

export const CandidateEmailFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: false,
})

export const CandidatePhoneFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: false,
})

export const CandidateSkillsFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: false,
})

export const CandidateMainLanguageFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: false,
})

export const CandidateLanguagesFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: false,
})

export const CandidateCoverLetterFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: false,
})

export const CandidateBirthDateFieldObject = defineFieldObject('Candidate', {
  type: Inputs.DateTime,
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.birthDate,
})

export const CandidateReferrerFieldObject = defineRelationObject(
  'Candidate',
  'referrer',
  {
    description: undefined,
    nullable: false,
    args: undefined,
    query: undefined,
  }
)

export const CandidateReferrerIdFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: false,
})

export const CandidateCvFieldObject = defineRelationObject('Candidate', 'cv', {
  description: undefined,
  nullable: true,
  args: undefined,
  query: undefined,
})

export const CandidateCvIdFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: true,
})

export const CandidateEducationLevelFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: false,
})

export const CandidateSocialsFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: false,
})

export const CandidateLinksFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: false,
})

export const CandidateSalaryExpectationFieldObject = defineExposeObject(
  'String',
  {
    description: undefined,
    nullable: false,
  }
)

export const CandidateIsHiredFieldObject = defineExposeObject('Boolean', {
  description: undefined,
  nullable: false,
})

export const CandidateHiredAtFieldObject = defineRelationObject(
  'Candidate',
  'hiredAt',
  {
    description: undefined,
    nullable: true,
    args: undefined,
    query: undefined,
  }
)

export const CandidateHiredAtIdFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: true,
})

export const CandidateHiredByFieldObject = defineRelationObject(
  'Candidate',
  'hiredBy',
  {
    description: undefined,
    nullable: true,
    args: undefined,
    query: undefined,
  }
)

export const CandidateHiredByIdFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: true,
})

export const CandidateAuditLogsFieldObject = defineRelationFunction(
  'Candidate',
  (t) =>
    defineRelationObject('Candidate', 'auditLogs', {
      description: undefined,
      nullable: false,
      args: {
        where: t.arg({ type: Inputs.AuditLogWhereInput, required: false }),
        orderBy: t.arg({
          type: [Inputs.AuditLogOrderByWithRelationInput],
          required: false,
        }),
        cursor: t.arg({
          type: Inputs.AuditLogWhereUniqueInput,
          required: false,
        }),
        take: t.arg({ type: 'Int', required: false }),
        skip: t.arg({ type: 'Int', required: false }),
        distinct: t.arg({
          type: [Inputs.AuditLogScalarFieldEnum],
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

export const CandidateOffersFieldObject = defineRelationFunction(
  'Candidate',
  (t) =>
    defineRelationObject('Candidate', 'offers', {
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
        distinct: t.arg({
          type: [Inputs.MatchScalarFieldEnum],
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

export const CandidateTalentPoolsFieldObject = defineRelationFunction(
  'Candidate',
  (t) =>
    defineRelationObject('Candidate', 'talentPools', {
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

export const CandidateCandidateTagsFieldObject = defineRelationFunction(
  'Candidate',
  (t) =>
    defineRelationObject('Candidate', 'candidateTags', {
      description: undefined,
      nullable: false,
      args: {
        where: t.arg({ type: Inputs.CandidateTagWhereInput, required: false }),
        orderBy: t.arg({
          type: [Inputs.CandidateTagOrderByWithRelationInput],
          required: false,
        }),
        cursor: t.arg({
          type: Inputs.CandidateTagWhereUniqueInput,
          required: false,
        }),
        take: t.arg({ type: 'Int', required: false }),
        skip: t.arg({ type: 'Int', required: false }),
        distinct: t.arg({
          type: [Inputs.CandidateTagScalarFieldEnum],
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

export const CandidateCustomFieldsFieldObject = defineRelationFunction(
  'Candidate',
  (t) =>
    defineRelationObject('Candidate', 'customFields', {
      description: undefined,
      nullable: false,
      args: {
        where: t.arg({
          type: Inputs.CandidateCustomFieldsWhereInput,
          required: false,
        }),
        orderBy: t.arg({
          type: [Inputs.CandidateCustomFieldsOrderByWithRelationInput],
          required: false,
        }),
        cursor: t.arg({
          type: Inputs.CandidateCustomFieldsWhereUniqueInput,
          required: false,
        }),
        take: t.arg({ type: 'Int', required: false }),
        skip: t.arg({ type: 'Int', required: false }),
        distinct: t.arg({
          type: [Inputs.CandidateCustomFieldsScalarFieldEnum],
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

export const CandidateEvaluationFieldObject = defineRelationFunction(
  'Candidate',
  (t) =>
    defineRelationObject('Candidate', 'evaluation', {
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

export const CandidateTasksFieldObject = defineRelationFunction(
  'Candidate',
  (t) =>
    defineRelationObject('Candidate', 'tasks', {
      description: undefined,
      nullable: false,
      args: {
        where: t.arg({ type: Inputs.TaskWhereInput, required: false }),
        orderBy: t.arg({
          type: [Inputs.TaskOrderByWithRelationInput],
          required: false,
        }),
        cursor: t.arg({ type: Inputs.TaskWhereUniqueInput, required: false }),
        take: t.arg({ type: 'Int', required: false }),
        skip: t.arg({ type: 'Int', required: false }),
        distinct: t.arg({
          type: [Inputs.TaskScalarFieldEnum],
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

export const CandidateFollowsFieldObject = defineRelationFunction(
  'Candidate',
  (t) =>
    defineRelationObject('Candidate', 'follows', {
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

export const CandidateSharedCandidateLinkFieldObject = defineRelationFunction(
  'Candidate',
  (t) =>
    defineRelationObject('Candidate', 'SharedCandidateLink', {
      description: undefined,
      nullable: false,
      args: {
        where: t.arg({
          type: Inputs.SharedCandidateLinkWhereInput,
          required: false,
        }),
        orderBy: t.arg({
          type: [Inputs.SharedCandidateLinkOrderByWithRelationInput],
          required: false,
        }),
        cursor: t.arg({
          type: Inputs.SharedCandidateLinkWhereUniqueInput,
          required: false,
        }),
        take: t.arg({ type: 'Int', required: false }),
        skip: t.arg({ type: 'Int', required: false }),
        distinct: t.arg({
          type: [Inputs.SharedCandidateLinkScalarFieldEnum],
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
