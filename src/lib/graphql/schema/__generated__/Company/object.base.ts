import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { builder } from '../../builder';
import {
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils';

export const CompanyObject = definePrismaObject('Company', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.field(CompanyIdFieldObject),
    name: t.field(CompanyNameFieldObject),
    phone: t.field(CompanyPhoneFieldObject),
    address: t.field(CompanyAddressFieldObject),
    city: t.field(CompanyCityFieldObject),
    state: t.field(CompanyStateFieldObject),
    country: t.field(CompanyCountryFieldObject),
    companyInbox: t.field(CompanyCompanyInboxFieldObject),
    subdomain: t.field(CompanySubdomainFieldObject),
    gdprEnable: t.field(CompanyGdprEnableFieldObject),
    gdprRetention: t.field(CompanyGdprRetentionFieldObject),
    gdprPrivacyPolicyLink: t.field(CompanyGdprPrivacyPolicyLinkFieldObject),
    gdprEmailFooter: t.field(CompanyGdprEmailFooterFieldObject),
    roles: t.relation('roles', CompanyRolesFieldObject(t)),
    subscription: t.relation('subscription', CompanySubscriptionFieldObject),
    meetingRooms: t.relation('meetingRooms', CompanyMeetingRoomsFieldObject(t)),
    metadata: t.relation('metadata', CompanyMetadataFieldObject(t)),
    eventSchedule: t.relation('eventSchedule', CompanyEventScheduleFieldObject(t)),
    events: t.relation('events', CompanyEventsFieldObject(t)),
    createdAt: t.field(CompanyCreatedAtFieldObject),
    updatedAt: t.field(CompanyUpdatedAtFieldObject),
    departments: t.relation('departments', CompanyDepartmentsFieldObject(t)),
    disqualifyReasons: t.relation('disqualifyReasons', CompanyDisqualifyReasonsFieldObject(t)),
    tagSources: t.relation('tagSources', CompanyTagSourcesFieldObject(t)),
    auditLogs: t.relation('auditLogs', CompanyAuditLogsFieldObject(t)),
    offers: t.relation('offers', CompanyOffersFieldObject(t)),
    templates: t.relation('templates', CompanyTemplatesFieldObject(t)),
    tasks: t.relation('tasks', CompanyTasksFieldObject(t)),
    owner: t.relation('owner', CompanyOwnerFieldObject),
    ownerId: t.field(CompanyOwnerIdFieldObject),
    hiringRoles: t.relation('hiringRoles', CompanyHiringRolesFieldObject(t)),
    candidates: t.relation('candidates', CompanyCandidatesFieldObject(t)),
    TalentPool: t.relation('TalentPool', CompanyTalentPoolFieldObject(t)),
  }),
});

export const CompanyIdFieldObject = defineFieldObject('Company', {
  type: "ID",
  description: undefined,
  nullable: false,
  resolve: (parent) => String(parent.id),
});

export const CompanyNameFieldObject = defineFieldObject('Company', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.name,
});

export const CompanyPhoneFieldObject = defineFieldObject('Company', {
  type: "String",
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.phone,
});

export const CompanyAddressFieldObject = defineFieldObject('Company', {
  type: "String",
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.address,
});

export const CompanyCityFieldObject = defineFieldObject('Company', {
  type: "String",
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.city,
});

export const CompanyStateFieldObject = defineFieldObject('Company', {
  type: "String",
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.state,
});

export const CompanyCountryFieldObject = defineFieldObject('Company', {
  type: "String",
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.country,
});

export const CompanyCompanyInboxFieldObject = defineFieldObject('Company', {
  type: "String",
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.companyInbox,
});

export const CompanySubdomainFieldObject = defineFieldObject('Company', {
  type: "String",
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.subdomain,
});

export const CompanyGdprEnableFieldObject = defineFieldObject('Company', {
  type: "Boolean",
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.gdprEnable,
});

export const CompanyGdprRetentionFieldObject = defineFieldObject('Company', {
  type: "Int",
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.gdprRetention,
});

export const CompanyGdprPrivacyPolicyLinkFieldObject = defineFieldObject('Company', {
  type: "String",
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.gdprPrivacyPolicyLink,
});

export const CompanyGdprEmailFooterFieldObject = defineFieldObject('Company', {
  type: "String",
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.gdprEmailFooter,
});

export const CompanyRolesFieldArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.RoleWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.RoleOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.RoleWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.RoleScalarFieldEnum], required: false }),
}))

export const CompanyRolesFieldObject = defineRelationFunction('Company', (t) =>
  defineRelationObject('Company', 'roles', {
    description: undefined,
    nullable: false,
    args: CompanyRolesFieldArgs,
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

export const CompanySubscriptionFieldObject = defineRelationObject('Company', 'subscription', {
  description: undefined,
  nullable: true,
  args: undefined,
  query: undefined,
});

export const CompanyMeetingRoomsFieldArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.MeetingRoomWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.MeetingRoomOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.MeetingRoomWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.MeetingRoomScalarFieldEnum], required: false }),
}))

export const CompanyMeetingRoomsFieldObject = defineRelationFunction('Company', (t) =>
  defineRelationObject('Company', 'meetingRooms', {
    description: undefined,
    nullable: false,
    args: CompanyMeetingRoomsFieldArgs,
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

export const CompanyMetadataFieldArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.CompanyMetadataWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.CompanyMetadataOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.CompanyMetadataWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.CompanyMetadataScalarFieldEnum], required: false }),
}))

export const CompanyMetadataFieldObject = defineRelationFunction('Company', (t) =>
  defineRelationObject('Company', 'metadata', {
    description: undefined,
    nullable: false,
    args: CompanyMetadataFieldArgs,
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

export const CompanyEventScheduleFieldArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.EventScheduleWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.EventScheduleOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.EventScheduleWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.EventScheduleScalarFieldEnum], required: false }),
}))

export const CompanyEventScheduleFieldObject = defineRelationFunction('Company', (t) =>
  defineRelationObject('Company', 'eventSchedule', {
    description: undefined,
    nullable: false,
    args: CompanyEventScheduleFieldArgs,
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

export const CompanyEventsFieldArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.EventWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.EventOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.EventWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.EventScalarFieldEnum], required: false }),
}))

export const CompanyEventsFieldObject = defineRelationFunction('Company', (t) =>
  defineRelationObject('Company', 'events', {
    description: undefined,
    nullable: false,
    args: CompanyEventsFieldArgs,
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

export const CompanyCreatedAtFieldObject = defineFieldObject('Company', {
  type: Inputs.DateTime,
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.createdAt,
});

export const CompanyUpdatedAtFieldObject = defineFieldObject('Company', {
  type: Inputs.DateTime,
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.updatedAt,
});

export const CompanyDepartmentsFieldArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.DepartmentWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.DepartmentOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.DepartmentWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.DepartmentScalarFieldEnum], required: false }),
}))

export const CompanyDepartmentsFieldObject = defineRelationFunction('Company', (t) =>
  defineRelationObject('Company', 'departments', {
    description: undefined,
    nullable: false,
    args: CompanyDepartmentsFieldArgs,
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

export const CompanyDisqualifyReasonsFieldArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.DisqualifyReasonWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.DisqualifyReasonOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.DisqualifyReasonWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.DisqualifyReasonScalarFieldEnum], required: false }),
}))

export const CompanyDisqualifyReasonsFieldObject = defineRelationFunction('Company', (t) =>
  defineRelationObject('Company', 'disqualifyReasons', {
    description: undefined,
    nullable: false,
    args: CompanyDisqualifyReasonsFieldArgs,
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

export const CompanyTagSourcesFieldArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.TagSourceWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.TagSourceOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.TagSourceWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.TagSourceScalarFieldEnum], required: false }),
}))

export const CompanyTagSourcesFieldObject = defineRelationFunction('Company', (t) =>
  defineRelationObject('Company', 'tagSources', {
    description: undefined,
    nullable: false,
    args: CompanyTagSourcesFieldArgs,
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

export const CompanyAuditLogsFieldArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.AuditLogWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.AuditLogOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.AuditLogWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.AuditLogScalarFieldEnum], required: false }),
}))

export const CompanyAuditLogsFieldObject = defineRelationFunction('Company', (t) =>
  defineRelationObject('Company', 'auditLogs', {
    description: undefined,
    nullable: false,
    args: CompanyAuditLogsFieldArgs,
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

export const CompanyOffersFieldArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.OfferWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.OfferOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.OfferWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.OfferScalarFieldEnum], required: false }),
}))

export const CompanyOffersFieldObject = defineRelationFunction('Company', (t) =>
  defineRelationObject('Company', 'offers', {
    description: undefined,
    nullable: false,
    args: CompanyOffersFieldArgs,
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

export const CompanyTemplatesFieldArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.TemplateWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.TemplateOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.TemplateWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.TemplateScalarFieldEnum], required: false }),
}))

export const CompanyTemplatesFieldObject = defineRelationFunction('Company', (t) =>
  defineRelationObject('Company', 'templates', {
    description: undefined,
    nullable: false,
    args: CompanyTemplatesFieldArgs,
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

export const CompanyTasksFieldArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.TaskWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.TaskOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.TaskWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.TaskScalarFieldEnum], required: false }),
}))

export const CompanyTasksFieldObject = defineRelationFunction('Company', (t) =>
  defineRelationObject('Company', 'tasks', {
    description: undefined,
    nullable: false,
    args: CompanyTasksFieldArgs,
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

export const CompanyOwnerFieldObject = defineRelationObject('Company', 'owner', {
  description: undefined,
  nullable: false,
  args: undefined,
  query: undefined,
});

export const CompanyOwnerIdFieldObject = defineFieldObject('Company', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.ownerId,
});

export const CompanyHiringRolesFieldArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.HiringRoleWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.HiringRoleOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.HiringRoleWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.HiringRoleScalarFieldEnum], required: false }),
}))

export const CompanyHiringRolesFieldObject = defineRelationFunction('Company', (t) =>
  defineRelationObject('Company', 'hiringRoles', {
    description: undefined,
    nullable: false,
    args: CompanyHiringRolesFieldArgs,
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

export const CompanyCandidatesFieldArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.CandidateWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.CandidateOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.CandidateWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.CandidateScalarFieldEnum], required: false }),
}))

export const CompanyCandidatesFieldObject = defineRelationFunction('Company', (t) =>
  defineRelationObject('Company', 'candidates', {
    description: undefined,
    nullable: false,
    args: CompanyCandidatesFieldArgs,
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

export const CompanyTalentPoolFieldArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.TalentPoolWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.TalentPoolOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.TalentPoolWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.TalentPoolScalarFieldEnum], required: false }),
}))

export const CompanyTalentPoolFieldObject = defineRelationFunction('Company', (t) =>
  defineRelationObject('Company', 'TalentPool', {
    description: undefined,
    nullable: false,
    args: CompanyTalentPoolFieldArgs,
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
