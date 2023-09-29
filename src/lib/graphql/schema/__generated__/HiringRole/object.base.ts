import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { builder } from '../../builder';
import {
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils';

export const HiringRoleObject = definePrismaObject('HiringRole', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.field(HiringRoleIdFieldObject),
    user: t.relation('user', HiringRoleUserFieldObject),
    userId: t.field(HiringRoleUserIdFieldObject),
    role: t.relation('role', HiringRoleRoleFieldObject),
    roleId: t.field(HiringRoleRoleIdFieldObject),
    company: t.relation('company', HiringRoleCompanyFieldObject),
    companyId: t.field(HiringRoleCompanyIdFieldObject),
    attachments: t.relation('attachments', HiringRoleAttachmentsFieldObject(t)),
    extraAbilities: t.field(HiringRoleExtraAbilitiesFieldObject),
    auditLogs: t.relation('auditLogs', HiringRoleAuditLogsFieldObject(t)),
    eventScheduleInterviewer: t.relation('eventScheduleInterviewer', HiringRoleEventScheduleInterviewerFieldObject(t)),
    eventInterviewer: t.relation('eventInterviewer', HiringRoleEventInterviewerFieldObject(t)),
    createdAt: t.field(HiringRoleCreatedAtFieldObject),
    updatedAt: t.field(HiringRoleUpdatedAtFieldObject),
    offerRecruiter: t.relation('offerRecruiter', HiringRoleOfferRecruiterFieldObject),
    offerHiringManager: t.relation('offerHiringManager', HiringRoleOfferHiringManagerFieldObject),
    memberships: t.relation('memberships', HiringRoleMembershipsFieldObject(t)),
    stageVisibility: t.relation('stageVisibility', HiringRoleStageVisibilityFieldObject(t)),
    hiredCandidates: t.relation('hiredCandidates', HiringRoleHiredCandidatesFieldObject(t)),
    evaluations: t.relation('evaluations', HiringRoleEvaluationsFieldObject(t)),
    tasks: t.relation('tasks', HiringRoleTasksFieldObject(t)),
    follows: t.relation('follows', HiringRoleFollowsFieldObject(t)),
  }),
});

export const HiringRoleIdFieldObject = defineFieldObject('HiringRole', {
  type: "ID",
  description: undefined,
  nullable: false,
  resolve: (parent) => String(parent.id),
});

export const HiringRoleUserFieldObject = defineRelationObject('HiringRole', 'user', {
  description: undefined,
  nullable: false,
  args: undefined,
  query: undefined,
});

export const HiringRoleUserIdFieldObject = defineFieldObject('HiringRole', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.userId,
});

export const HiringRoleRoleFieldObject = defineRelationObject('HiringRole', 'role', {
  description: undefined,
  nullable: false,
  args: undefined,
  query: undefined,
});

export const HiringRoleRoleIdFieldObject = defineFieldObject('HiringRole', {
  type: "Int",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.roleId,
});

export const HiringRoleCompanyFieldObject = defineRelationObject('HiringRole', 'company', {
  description: undefined,
  nullable: false,
  args: undefined,
  query: undefined,
});

export const HiringRoleCompanyIdFieldObject = defineFieldObject('HiringRole', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.companyId,
});

export const HiringRoleAttachmentsFieldArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.AttachmentWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.AttachmentOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.AttachmentWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.AttachmentScalarFieldEnum], required: false }),
}))

export const HiringRoleAttachmentsFieldObject = defineRelationFunction('HiringRole', (t) =>
  defineRelationObject('HiringRole', 'attachments', {
    description: undefined,
    nullable: false,
    args: HiringRoleAttachmentsFieldArgs,
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

export const HiringRoleExtraAbilitiesFieldObject = defineFieldObject('HiringRole', {
  type: ["String"],
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.extraAbilities,
});

export const HiringRoleAuditLogsFieldArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.AuditLogWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.AuditLogOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.AuditLogWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.AuditLogScalarFieldEnum], required: false }),
}))

export const HiringRoleAuditLogsFieldObject = defineRelationFunction('HiringRole', (t) =>
  defineRelationObject('HiringRole', 'auditLogs', {
    description: undefined,
    nullable: false,
    args: HiringRoleAuditLogsFieldArgs,
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

export const HiringRoleEventScheduleInterviewerFieldArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.EventScheduleInterviewerWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.EventScheduleInterviewerOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.EventScheduleInterviewerWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.EventScheduleInterviewerScalarFieldEnum], required: false }),
}))

export const HiringRoleEventScheduleInterviewerFieldObject = defineRelationFunction('HiringRole', (t) =>
  defineRelationObject('HiringRole', 'eventScheduleInterviewer', {
    description: undefined,
    nullable: false,
    args: HiringRoleEventScheduleInterviewerFieldArgs,
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

export const HiringRoleEventInterviewerFieldArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.EventInterviewerWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.EventInterviewerOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.EventInterviewerWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.EventInterviewerScalarFieldEnum], required: false }),
}))

export const HiringRoleEventInterviewerFieldObject = defineRelationFunction('HiringRole', (t) =>
  defineRelationObject('HiringRole', 'eventInterviewer', {
    description: undefined,
    nullable: false,
    args: HiringRoleEventInterviewerFieldArgs,
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

export const HiringRoleCreatedAtFieldObject = defineFieldObject('HiringRole', {
  type: Inputs.DateTime,
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.createdAt,
});

export const HiringRoleUpdatedAtFieldObject = defineFieldObject('HiringRole', {
  type: Inputs.DateTime,
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.updatedAt,
});

export const HiringRoleOfferRecruiterFieldObject = defineRelationObject('HiringRole', 'offerRecruiter', {
  description: undefined,
  nullable: true,
  args: undefined,
  query: undefined,
});

export const HiringRoleOfferHiringManagerFieldObject = defineRelationObject('HiringRole', 'offerHiringManager', {
  description: undefined,
  nullable: true,
  args: undefined,
  query: undefined,
});

export const HiringRoleMembershipsFieldArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.MembershipWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.MembershipOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.MembershipWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.MembershipScalarFieldEnum], required: false }),
}))

export const HiringRoleMembershipsFieldObject = defineRelationFunction('HiringRole', (t) =>
  defineRelationObject('HiringRole', 'memberships', {
    description: undefined,
    nullable: false,
    args: HiringRoleMembershipsFieldArgs,
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

export const HiringRoleStageVisibilityFieldArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.StageVisibilityWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.StageVisibilityOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.StageVisibilityWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.StageVisibilityScalarFieldEnum], required: false }),
}))

export const HiringRoleStageVisibilityFieldObject = defineRelationFunction('HiringRole', (t) =>
  defineRelationObject('HiringRole', 'stageVisibility', {
    description: undefined,
    nullable: false,
    args: HiringRoleStageVisibilityFieldArgs,
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

export const HiringRoleHiredCandidatesFieldArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.CandidateWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.CandidateOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.CandidateWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.CandidateScalarFieldEnum], required: false }),
}))

export const HiringRoleHiredCandidatesFieldObject = defineRelationFunction('HiringRole', (t) =>
  defineRelationObject('HiringRole', 'hiredCandidates', {
    description: undefined,
    nullable: false,
    args: HiringRoleHiredCandidatesFieldArgs,
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

export const HiringRoleEvaluationsFieldArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.EvaluationWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.EvaluationOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.EvaluationWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.EvaluationScalarFieldEnum], required: false }),
}))

export const HiringRoleEvaluationsFieldObject = defineRelationFunction('HiringRole', (t) =>
  defineRelationObject('HiringRole', 'evaluations', {
    description: undefined,
    nullable: false,
    args: HiringRoleEvaluationsFieldArgs,
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

export const HiringRoleTasksFieldArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.TaskMemberWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.TaskMemberOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.TaskMemberWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.TaskMemberScalarFieldEnum], required: false }),
}))

export const HiringRoleTasksFieldObject = defineRelationFunction('HiringRole', (t) =>
  defineRelationObject('HiringRole', 'tasks', {
    description: undefined,
    nullable: false,
    args: HiringRoleTasksFieldArgs,
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

export const HiringRoleFollowsFieldArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.FollowWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.FollowOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.FollowWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.FollowScalarFieldEnum], required: false }),
}))

export const HiringRoleFollowsFieldObject = defineRelationFunction('HiringRole', (t) =>
  defineRelationObject('HiringRole', 'follows', {
    description: undefined,
    nullable: false,
    args: HiringRoleFollowsFieldArgs,
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
