import * as Inputs from '@/graphql/schema/__generated__/inputs'
import {
  defineExposeObject,
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils'

export const OfferObject = definePrismaObject('Offer', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.exposeID('id', OfferIdFieldObject),
    name: t.exposeString('name', OfferNameFieldObject),
    company: t.relation('company', OfferCompanyFieldObject),
    companyId: t.exposeString('companyId', OfferCompanyIdFieldObject),
    deparment: t.relation('deparment', OfferDeparmentFieldObject),
    deparmentId: t.exposeInt('deparmentId', OfferDeparmentIdFieldObject),
    recruiter: t.relation('recruiter', OfferRecruiterFieldObject),
    recruiterId: t.exposeInt('recruiterId', OfferRecruiterIdFieldObject),
    hiringManager: t.relation('hiringManager', OfferHiringManagerFieldObject),
    hiringManagerId: t.exposeInt(
      'hiringManagerId',
      OfferHiringManagerIdFieldObject
    ),
    description: t.exposeString('description', OfferDescriptionFieldObject),
    requirements: t.exposeString('requirements', OfferRequirementsFieldObject),
    locationCountry: t.exposeString(
      'locationCountry',
      OfferLocationCountryFieldObject
    ),
    locationState: t.exposeString(
      'locationState',
      OfferLocationStateFieldObject
    ),
    locationCity: t.exposeString('locationCity', OfferLocationCityFieldObject),
    locationStreet: t.exposeString(
      'locationStreet',
      OfferLocationStreetFieldObject
    ),
    zipcode: t.exposeString('zipcode', OfferZipcodeFieldObject),
    remote: t.exposeBoolean('remote', OfferRemoteFieldObject),
    jobType: t.exposeString('jobType', OfferJobTypeFieldObject),
    jobCategory: t.exposeString('jobCategory', OfferJobCategoryFieldObject),
    jobReqEducation: t.exposeString(
      'jobReqEducation',
      OfferJobReqEducationFieldObject
    ),
    jobReqExperience: t.exposeString(
      'jobReqExperience',
      OfferJobReqExperienceFieldObject
    ),
    jobHoursMin: t.exposeInt('jobHoursMin', OfferJobHoursMinFieldObject),
    jobHoursMax: t.exposeInt('jobHoursMax', OfferJobHoursMaxFieldObject),
    jobSalaryMin: t.exposeInt('jobSalaryMin', OfferJobSalaryMinFieldObject),
    jobSalaryMax: t.exposeInt('jobSalaryMax', OfferJobSalaryMaxFieldObject),
    jobSalaryPeriod: t.exposeString(
      'jobSalaryPeriod',
      OfferJobSalaryPeriodFieldObject
    ),
    jobSalaryCurrency: t.exposeString(
      'jobSalaryCurrency',
      OfferJobSalaryCurrencyFieldObject
    ),
    personalInfoCv: t.field(OfferPersonalInfoCvFieldObject),
    personalInfoCoverLetter: t.field(OfferPersonalInfoCoverLetterFieldObject),
    personalInfoPhoto: t.field(OfferPersonalInfoPhotoFieldObject),
    personalInfoPhone: t.field(OfferPersonalInfoPhoneFieldObject),
    screeningQuestionsTemplate: t.relation(
      'screeningQuestionsTemplate',
      OfferScreeningQuestionsTemplateFieldObject
    ),
    screeningQuestionsTemplateId: t.exposeInt(
      'screeningQuestionsTemplateId',
      OfferScreeningQuestionsTemplateIdFieldObject
    ),
    pipelineTemplate: t.relation(
      'pipelineTemplate',
      OfferPipelineTemplateFieldObject
    ),
    pipelineTemplateId: t.exposeInt(
      'pipelineTemplateId',
      OfferPipelineTemplateIdFieldObject
    ),
    autoConfirmationEmail: t.relation(
      'autoConfirmationEmail',
      OfferAutoConfirmationEmailFieldObject
    ),
    autoConfirmationEmailId: t.exposeInt(
      'autoConfirmationEmailId',
      OfferAutoConfirmationEmailIdFieldObject
    ),
    isPublished: t.exposeBoolean('isPublished', OfferIsPublishedFieldObject),
    auditLogs: t.relation('auditLogs', OfferAuditLogsFieldObject(t)),
    files: t.relation('files', OfferFilesFieldObject(t)),
    offerTags: t.relation('offerTags', OfferOfferTagsFieldObject(t)),
    memberships: t.relation('memberships', OfferMembershipsFieldObject(t)),
    matches: t.relation('matches', OfferMatchesFieldObject(t)),
    hired: t.relation('hired', OfferHiredFieldObject(t)),
    evaluations: t.relation('evaluations', OfferEvaluationsFieldObject(t)),
    follows: t.relation('follows', OfferFollowsFieldObject(t)),
  }),
})

export const OfferIdFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: false,
})

export const OfferNameFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: false,
})

export const OfferCompanyFieldObject = defineRelationObject(
  'Offer',
  'company',
  {
    description: undefined,
    nullable: false,
    args: undefined,
    query: undefined,
  }
)

export const OfferCompanyIdFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: false,
})

export const OfferDeparmentFieldObject = defineRelationObject(
  'Offer',
  'deparment',
  {
    description: undefined,
    nullable: true,
    args: undefined,
    query: undefined,
  }
)

export const OfferDeparmentIdFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: true,
})

export const OfferRecruiterFieldObject = defineRelationObject(
  'Offer',
  'recruiter',
  {
    description: undefined,
    nullable: true,
    args: undefined,
    query: undefined,
  }
)

export const OfferRecruiterIdFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: true,
})

export const OfferHiringManagerFieldObject = defineRelationObject(
  'Offer',
  'hiringManager',
  {
    description: undefined,
    nullable: true,
    args: undefined,
    query: undefined,
  }
)

export const OfferHiringManagerIdFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: true,
})

export const OfferDescriptionFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: false,
})

export const OfferRequirementsFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: false,
})

export const OfferLocationCountryFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: false,
})

export const OfferLocationStateFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: false,
})

export const OfferLocationCityFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: false,
})

export const OfferLocationStreetFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: false,
})

export const OfferZipcodeFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: false,
})

export const OfferRemoteFieldObject = defineExposeObject('Boolean', {
  description: undefined,
  nullable: false,
})

export const OfferJobTypeFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: false,
})

export const OfferJobCategoryFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: false,
})

export const OfferJobReqEducationFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: false,
})

export const OfferJobReqExperienceFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: false,
})

export const OfferJobHoursMinFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: false,
})

export const OfferJobHoursMaxFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: false,
})

export const OfferJobSalaryMinFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: false,
})

export const OfferJobSalaryMaxFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: false,
})

export const OfferJobSalaryPeriodFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: false,
})

export const OfferJobSalaryCurrencyFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: false,
})

export const OfferPersonalInfoCvFieldObject = defineFieldObject('Offer', {
  type: Inputs.OfferPersonalItems,
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.personalInfoCv,
})

export const OfferPersonalInfoCoverLetterFieldObject = defineFieldObject(
  'Offer',
  {
    type: Inputs.OfferPersonalItems,
    description: undefined,
    nullable: false,
    resolve: (parent) => parent.personalInfoCoverLetter,
  }
)

export const OfferPersonalInfoPhotoFieldObject = defineFieldObject('Offer', {
  type: Inputs.OfferPersonalItems,
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.personalInfoPhoto,
})

export const OfferPersonalInfoPhoneFieldObject = defineFieldObject('Offer', {
  type: Inputs.OfferPersonalItems,
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.personalInfoPhone,
})

export const OfferScreeningQuestionsTemplateFieldObject = defineRelationObject(
  'Offer',
  'screeningQuestionsTemplate',
  {
    description: undefined,
    nullable: false,
    args: undefined,
    query: undefined,
  }
)

export const OfferScreeningQuestionsTemplateIdFieldObject = defineExposeObject(
  'Int',
  {
    description: undefined,
    nullable: false,
  }
)

export const OfferPipelineTemplateFieldObject = defineRelationObject(
  'Offer',
  'pipelineTemplate',
  {
    description: undefined,
    nullable: false,
    args: undefined,
    query: undefined,
  }
)

export const OfferPipelineTemplateIdFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: false,
})

export const OfferAutoConfirmationEmailFieldObject = defineRelationObject(
  'Offer',
  'autoConfirmationEmail',
  {
    description: undefined,
    nullable: false,
    args: undefined,
    query: undefined,
  }
)

export const OfferAutoConfirmationEmailIdFieldObject = defineExposeObject(
  'Int',
  {
    description: undefined,
    nullable: false,
  }
)

export const OfferIsPublishedFieldObject = defineExposeObject('Boolean', {
  description: undefined,
  nullable: false,
})

export const OfferAuditLogsFieldObject = defineRelationFunction('Offer', (t) =>
  defineRelationObject('Offer', 'auditLogs', {
    description: undefined,
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.AuditLogWhereInput, required: false }),
      orderBy: t.arg({
        type: [Inputs.AuditLogOrderByWithRelationInput],
        required: false,
      }),
      cursor: t.arg({ type: Inputs.AuditLogWhereUniqueInput, required: false }),
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

export const OfferFilesFieldObject = defineRelationFunction('Offer', (t) =>
  defineRelationObject('Offer', 'files', {
    description: undefined,
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.OfferFileWhereInput, required: false }),
      orderBy: t.arg({
        type: [Inputs.OfferFileOrderByWithRelationInput],
        required: false,
      }),
      cursor: t.arg({
        type: Inputs.OfferFileWhereUniqueInput,
        required: false,
      }),
      take: t.arg({ type: 'Int', required: false }),
      skip: t.arg({ type: 'Int', required: false }),
      distinct: t.arg({
        type: [Inputs.OfferFileScalarFieldEnum],
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

export const OfferOfferTagsFieldObject = defineRelationFunction('Offer', (t) =>
  defineRelationObject('Offer', 'offerTags', {
    description: undefined,
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.OfferTagWhereInput, required: false }),
      orderBy: t.arg({
        type: [Inputs.OfferTagOrderByWithRelationInput],
        required: false,
      }),
      cursor: t.arg({ type: Inputs.OfferTagWhereUniqueInput, required: false }),
      take: t.arg({ type: 'Int', required: false }),
      skip: t.arg({ type: 'Int', required: false }),
      distinct: t.arg({
        type: [Inputs.OfferTagScalarFieldEnum],
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

export const OfferMembershipsFieldObject = defineRelationFunction(
  'Offer',
  (t) =>
    defineRelationObject('Offer', 'memberships', {
      description: undefined,
      nullable: false,
      args: {
        where: t.arg({ type: Inputs.MembershipWhereInput, required: false }),
        orderBy: t.arg({
          type: [Inputs.MembershipOrderByWithRelationInput],
          required: false,
        }),
        cursor: t.arg({
          type: Inputs.MembershipWhereUniqueInput,
          required: false,
        }),
        take: t.arg({ type: 'Int', required: false }),
        skip: t.arg({ type: 'Int', required: false }),
        distinct: t.arg({
          type: [Inputs.MembershipScalarFieldEnum],
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

export const OfferMatchesFieldObject = defineRelationFunction('Offer', (t) =>
  defineRelationObject('Offer', 'matches', {
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

export const OfferHiredFieldObject = defineRelationFunction('Offer', (t) =>
  defineRelationObject('Offer', 'hired', {
    description: undefined,
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.CandidateWhereInput, required: false }),
      orderBy: t.arg({
        type: [Inputs.CandidateOrderByWithRelationInput],
        required: false,
      }),
      cursor: t.arg({
        type: Inputs.CandidateWhereUniqueInput,
        required: false,
      }),
      take: t.arg({ type: 'Int', required: false }),
      skip: t.arg({ type: 'Int', required: false }),
      distinct: t.arg({
        type: [Inputs.CandidateScalarFieldEnum],
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

export const OfferEvaluationsFieldObject = defineRelationFunction(
  'Offer',
  (t) =>
    defineRelationObject('Offer', 'evaluations', {
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

export const OfferFollowsFieldObject = defineRelationFunction('Offer', (t) =>
  defineRelationObject('Offer', 'follows', {
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
