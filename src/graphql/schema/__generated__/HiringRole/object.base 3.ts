import * as Inputs from '@/graphql/schema/__generated__/inputs'
import {
  defineExposeObject,
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils'

export const HiringRoleObject = definePrismaObject('HiringRole', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.exposeID('id', HiringRoleIdFieldObject),
    user: t.relation('user', HiringRoleUserFieldObject),
    userId: t.exposeString('userId', HiringRoleUserIdFieldObject),
    role: t.relation('role', HiringRoleRoleFieldObject),
    roleId: t.exposeInt('roleId', HiringRoleRoleIdFieldObject),
    attachments: t.relation('attachments', HiringRoleAttachmentsFieldObject(t)),
    extraAbilities: t.exposeStringList(
      'extraAbilities',
      HiringRoleExtraAbilitiesFieldObject
    ),
    auditLogs: t.relation('auditLogs', HiringRoleAuditLogsFieldObject(t)),
    eventScheduleInterviewer: t.relation(
      'eventScheduleInterviewer',
      HiringRoleEventScheduleInterviewerFieldObject(t)
    ),
    eventInterviewer: t.relation(
      'eventInterviewer',
      HiringRoleEventInterviewerFieldObject(t)
    ),
    createdAt: t.field(HiringRoleCreatedAtFieldObject),
    updatedAt: t.field(HiringRoleUpdatedAtFieldObject),
    offerRecruiter: t.relation(
      'offerRecruiter',
      HiringRoleOfferRecruiterFieldObject
    ),
    offerHiringManager: t.relation(
      'offerHiringManager',
      HiringRoleOfferHiringManagerFieldObject
    ),
    memberships: t.relation('memberships', HiringRoleMembershipsFieldObject(t)),
    stageVisibility: t.relation(
      'stageVisibility',
      HiringRoleStageVisibilityFieldObject(t)
    ),
    hiredCandidates: t.relation(
      'hiredCandidates',
      HiringRoleHiredCandidatesFieldObject(t)
    ),
    evaluations: t.relation('evaluations', HiringRoleEvaluationsFieldObject(t)),
    tasks: t.relation('tasks', HiringRoleTasksFieldObject(t)),
    follows: t.relation('follows', HiringRoleFollowsFieldObject(t)),
  }),
})

export const HiringRoleIdFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: false,
})

export const HiringRoleUserFieldObject = defineRelationObject(
  'HiringRole',
  'user',
  {
    description: undefined,
    nullable: false,
    args: undefined,
    query: undefined,
  }
)

export const HiringRoleUserIdFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: false,
})

export const HiringRoleRoleFieldObject = defineRelationObject(
  'HiringRole',
  'role',
  {
    description: undefined,
    nullable: false,
    args: undefined,
    query: undefined,
  }
)

export const HiringRoleRoleIdFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: false,
})

export const HiringRoleAttachmentsFieldObject = defineRelationFunction(
  'HiringRole',
  (t) =>
    defineRelationObject('HiringRole', 'attachments', {
      description: undefined,
      nullable: false,
      args: {
        where: t.arg({ type: Inputs.AttachmentWhereInput, required: false }),
        orderBy: t.arg({
          type: [Inputs.AttachmentOrderByWithRelationInput],
          required: false,
        }),
        cursor: t.arg({
          type: Inputs.AttachmentWhereUniqueInput,
          required: false,
        }),
        take: t.arg({ type: 'Int', required: false }),
        skip: t.arg({ type: 'Int', required: false }),
        distinct: t.arg({
          type: [Inputs.AttachmentScalarFieldEnum],
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

export const HiringRoleExtraAbilitiesFieldObject = defineExposeObject(
  'String',
  {
    description: undefined,
    nullable: false,
  }
)

export const HiringRoleAuditLogsFieldObject = defineRelationFunction(
  'HiringRole',
  (t) =>
    defineRelationObject('HiringRole', 'auditLogs', {
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

export const HiringRoleEventScheduleInterviewerFieldObject =
  defineRelationFunction('HiringRole', (t) =>
    defineRelationObject('HiringRole', 'eventScheduleInterviewer', {
      description: undefined,
      nullable: false,
      args: {
        where: t.arg({
          type: Inputs.EventScheduleInterviewerWhereInput,
          required: false,
        }),
        orderBy: t.arg({
          type: [Inputs.EventScheduleInterviewerOrderByWithRelationInput],
          required: false,
        }),
        cursor: t.arg({
          type: Inputs.EventScheduleInterviewerWhereUniqueInput,
          required: false,
        }),
        take: t.arg({ type: 'Int', required: false }),
        skip: t.arg({ type: 'Int', required: false }),
        distinct: t.arg({
          type: [Inputs.EventScheduleInterviewerScalarFieldEnum],
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

export const HiringRoleEventInterviewerFieldObject = defineRelationFunction(
  'HiringRole',
  (t) =>
    defineRelationObject('HiringRole', 'eventInterviewer', {
      description: undefined,
      nullable: false,
      args: {
        where: t.arg({
          type: Inputs.EventInterviewerWhereInput,
          required: false,
        }),
        orderBy: t.arg({
          type: [Inputs.EventInterviewerOrderByWithRelationInput],
          required: false,
        }),
        cursor: t.arg({
          type: Inputs.EventInterviewerWhereUniqueInput,
          required: false,
        }),
        take: t.arg({ type: 'Int', required: false }),
        skip: t.arg({ type: 'Int', required: false }),
        distinct: t.arg({
          type: [Inputs.EventInterviewerScalarFieldEnum],
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

export const HiringRoleCreatedAtFieldObject = defineFieldObject('HiringRole', {
  type: Inputs.DateTime,
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.createdAt,
})

export const HiringRoleUpdatedAtFieldObject = defineFieldObject('HiringRole', {
  type: Inputs.DateTime,
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.updatedAt,
})

export const HiringRoleOfferRecruiterFieldObject = defineRelationObject(
  'HiringRole',
  'offerRecruiter',
  {
    description: undefined,
    nullable: true,
    args: undefined,
    query: undefined,
  }
)

export const HiringRoleOfferHiringManagerFieldObject = defineRelationObject(
  'HiringRole',
  'offerHiringManager',
  {
    description: undefined,
    nullable: true,
    args: undefined,
    query: undefined,
  }
)

export const HiringRoleMembershipsFieldObject = defineRelationFunction(
  'HiringRole',
  (t) =>
    defineRelationObject('HiringRole', 'memberships', {
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

export const HiringRoleStageVisibilityFieldObject = defineRelationFunction(
  'HiringRole',
  (t) =>
    defineRelationObject('HiringRole', 'stageVisibility', {
      description: undefined,
      nullable: false,
      args: {
        where: t.arg({
          type: Inputs.StageVisibilityWhereInput,
          required: false,
        }),
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

export const HiringRoleHiredCandidatesFieldObject = defineRelationFunction(
  'HiringRole',
  (t) =>
    defineRelationObject('HiringRole', 'hiredCandidates', {
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

export const HiringRoleEvaluationsFieldObject = defineRelationFunction(
  'HiringRole',
  (t) =>
    defineRelationObject('HiringRole', 'evaluations', {
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

export const HiringRoleTasksFieldObject = defineRelationFunction(
  'HiringRole',
  (t) =>
    defineRelationObject('HiringRole', 'tasks', {
      description: undefined,
      nullable: false,
      args: {
        where: t.arg({ type: Inputs.TaskMemberWhereInput, required: false }),
        orderBy: t.arg({
          type: [Inputs.TaskMemberOrderByWithRelationInput],
          required: false,
        }),
        cursor: t.arg({
          type: Inputs.TaskMemberWhereUniqueInput,
          required: false,
        }),
        take: t.arg({ type: 'Int', required: false }),
        skip: t.arg({ type: 'Int', required: false }),
        distinct: t.arg({
          type: [Inputs.TaskMemberScalarFieldEnum],
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

export const HiringRoleFollowsFieldObject = defineRelationFunction(
  'HiringRole',
  (t) =>
    defineRelationObject('HiringRole', 'follows', {
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
