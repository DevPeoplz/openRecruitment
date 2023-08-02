import * as Inputs from '@/graphql/schema/__generated__/inputs'
import {
  defineExposeObject,
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils'

export const CompanyObject = definePrismaObject('Company', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.exposeID('id', CompanyIdFieldObject),
    name: t.exposeString('name', CompanyNameFieldObject),
    phone: t.exposeString('phone', CompanyPhoneFieldObject),
    address: t.exposeString('address', CompanyAddressFieldObject),
    city: t.exposeString('city', CompanyCityFieldObject),
    state: t.exposeString('state', CompanyStateFieldObject),
    country: t.exposeString('country', CompanyCountryFieldObject),
    companyInbox: t.exposeString(
      'companyInbox',
      CompanyCompanyInboxFieldObject
    ),
    subdomain: t.exposeString('subdomain', CompanySubdomainFieldObject),
    gdprEnable: t.exposeBoolean('gdprEnable', CompanyGdprEnableFieldObject),
    gdprRetention: t.exposeInt(
      'gdprRetention',
      CompanyGdprRetentionFieldObject
    ),
    gdprPrivacyPolicyLink: t.exposeString(
      'gdprPrivacyPolicyLink',
      CompanyGdprPrivacyPolicyLinkFieldObject
    ),
    gdprEmailFooter: t.exposeString(
      'gdprEmailFooter',
      CompanyGdprEmailFooterFieldObject
    ),
    roles: t.relation('roles', CompanyRolesFieldObject(t)),
    subscription: t.relation('subscription', CompanySubscriptionFieldObject),
    meetingRooms: t.relation('meetingRooms', CompanyMeetingRoomsFieldObject(t)),
    metadata: t.relation('metadata', CompanyMetadataFieldObject(t)),
    eventSchedule: t.relation(
      'eventSchedule',
      CompanyEventScheduleFieldObject(t)
    ),
    events: t.relation('events', CompanyEventsFieldObject(t)),
    createdAt: t.field(CompanyCreatedAtFieldObject),
    updatedAt: t.field(CompanyUpdatedAtFieldObject),
    departments: t.relation('departments', CompanyDepartmentsFieldObject(t)),
    disqualifyReasons: t.relation(
      'disqualifyReasons',
      CompanyDisqualifyReasonsFieldObject(t)
    ),
    tagSources: t.relation('tagSources', CompanyTagSourcesFieldObject(t)),
    auditLogs: t.relation('auditLogs', CompanyAuditLogsFieldObject(t)),
    offers: t.relation('offers', CompanyOffersFieldObject(t)),
    templates: t.relation('templates', CompanyTemplatesFieldObject(t)),
    tasks: t.relation('tasks', CompanyTasksFieldObject(t)),
    owner: t.relation('owner', CompanyOwnerFieldObject),
    ownerId: t.exposeString('ownerId', CompanyOwnerIdFieldObject),
  }),
})

export const CompanyIdFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: false,
})

export const CompanyNameFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: false,
})

export const CompanyPhoneFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: true,
})

export const CompanyAddressFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: true,
})

export const CompanyCityFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: true,
})

export const CompanyStateFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: true,
})

export const CompanyCountryFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: true,
})

export const CompanyCompanyInboxFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: true,
})

export const CompanySubdomainFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: true,
})

export const CompanyGdprEnableFieldObject = defineExposeObject('Boolean', {
  description: undefined,
  nullable: true,
})

export const CompanyGdprRetentionFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: true,
})

export const CompanyGdprPrivacyPolicyLinkFieldObject = defineExposeObject(
  'String',
  {
    description: undefined,
    nullable: true,
  }
)

export const CompanyGdprEmailFooterFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: true,
})

export const CompanyRolesFieldObject = defineRelationFunction('Company', (t) =>
  defineRelationObject('Company', 'roles', {
    description: undefined,
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.RoleWhereInput, required: false }),
      orderBy: t.arg({
        type: [Inputs.RoleOrderByWithRelationInput],
        required: false,
      }),
      cursor: t.arg({ type: Inputs.RoleWhereUniqueInput, required: false }),
      take: t.arg({ type: 'Int', required: false }),
      skip: t.arg({ type: 'Int', required: false }),
      distinct: t.arg({ type: [Inputs.RoleScalarFieldEnum], required: false }),
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

export const CompanySubscriptionFieldObject = defineRelationObject(
  'Company',
  'subscription',
  {
    description: undefined,
    nullable: true,
    args: undefined,
    query: undefined,
  }
)

export const CompanyMeetingRoomsFieldObject = defineRelationFunction(
  'Company',
  (t) =>
    defineRelationObject('Company', 'meetingRooms', {
      description: undefined,
      nullable: false,
      args: {
        where: t.arg({ type: Inputs.MeetingRoomWhereInput, required: false }),
        orderBy: t.arg({
          type: [Inputs.MeetingRoomOrderByWithRelationInput],
          required: false,
        }),
        cursor: t.arg({
          type: Inputs.MeetingRoomWhereUniqueInput,
          required: false,
        }),
        take: t.arg({ type: 'Int', required: false }),
        skip: t.arg({ type: 'Int', required: false }),
        distinct: t.arg({
          type: [Inputs.MeetingRoomScalarFieldEnum],
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

export const CompanyMetadataFieldObject = defineRelationFunction(
  'Company',
  (t) =>
    defineRelationObject('Company', 'metadata', {
      description: undefined,
      nullable: false,
      args: {
        where: t.arg({
          type: Inputs.CompanyMetadataWhereInput,
          required: false,
        }),
        orderBy: t.arg({
          type: [Inputs.CompanyMetadataOrderByWithRelationInput],
          required: false,
        }),
        cursor: t.arg({
          type: Inputs.CompanyMetadataWhereUniqueInput,
          required: false,
        }),
        take: t.arg({ type: 'Int', required: false }),
        skip: t.arg({ type: 'Int', required: false }),
        distinct: t.arg({
          type: [Inputs.CompanyMetadataScalarFieldEnum],
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

export const CompanyEventScheduleFieldObject = defineRelationFunction(
  'Company',
  (t) =>
    defineRelationObject('Company', 'eventSchedule', {
      description: undefined,
      nullable: false,
      args: {
        where: t.arg({ type: Inputs.EventScheduleWhereInput, required: false }),
        orderBy: t.arg({
          type: [Inputs.EventScheduleOrderByWithRelationInput],
          required: false,
        }),
        cursor: t.arg({
          type: Inputs.EventScheduleWhereUniqueInput,
          required: false,
        }),
        take: t.arg({ type: 'Int', required: false }),
        skip: t.arg({ type: 'Int', required: false }),
        distinct: t.arg({
          type: [Inputs.EventScheduleScalarFieldEnum],
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

export const CompanyEventsFieldObject = defineRelationFunction('Company', (t) =>
  defineRelationObject('Company', 'events', {
    description: undefined,
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.EventWhereInput, required: false }),
      orderBy: t.arg({
        type: [Inputs.EventOrderByWithRelationInput],
        required: false,
      }),
      cursor: t.arg({ type: Inputs.EventWhereUniqueInput, required: false }),
      take: t.arg({ type: 'Int', required: false }),
      skip: t.arg({ type: 'Int', required: false }),
      distinct: t.arg({ type: [Inputs.EventScalarFieldEnum], required: false }),
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

export const CompanyCreatedAtFieldObject = defineFieldObject('Company', {
  type: Inputs.DateTime,
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.createdAt,
})

export const CompanyUpdatedAtFieldObject = defineFieldObject('Company', {
  type: Inputs.DateTime,
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.updatedAt,
})

export const CompanyDepartmentsFieldObject = defineRelationFunction(
  'Company',
  (t) =>
    defineRelationObject('Company', 'departments', {
      description: undefined,
      nullable: false,
      args: {
        where: t.arg({ type: Inputs.DepartmentWhereInput, required: false }),
        orderBy: t.arg({
          type: [Inputs.DepartmentOrderByWithRelationInput],
          required: false,
        }),
        cursor: t.arg({
          type: Inputs.DepartmentWhereUniqueInput,
          required: false,
        }),
        take: t.arg({ type: 'Int', required: false }),
        skip: t.arg({ type: 'Int', required: false }),
        distinct: t.arg({
          type: [Inputs.DepartmentScalarFieldEnum],
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

export const CompanyDisqualifyReasonsFieldObject = defineRelationFunction(
  'Company',
  (t) =>
    defineRelationObject('Company', 'disqualifyReasons', {
      description: undefined,
      nullable: false,
      args: {
        where: t.arg({
          type: Inputs.DisqualifyReasonWhereInput,
          required: false,
        }),
        orderBy: t.arg({
          type: [Inputs.DisqualifyReasonOrderByWithRelationInput],
          required: false,
        }),
        cursor: t.arg({
          type: Inputs.DisqualifyReasonWhereUniqueInput,
          required: false,
        }),
        take: t.arg({ type: 'Int', required: false }),
        skip: t.arg({ type: 'Int', required: false }),
        distinct: t.arg({
          type: [Inputs.DisqualifyReasonScalarFieldEnum],
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

export const CompanyTagSourcesFieldObject = defineRelationFunction(
  'Company',
  (t) =>
    defineRelationObject('Company', 'tagSources', {
      description: undefined,
      nullable: false,
      args: {
        where: t.arg({ type: Inputs.TagSourceWhereInput, required: false }),
        orderBy: t.arg({
          type: [Inputs.TagSourceOrderByWithRelationInput],
          required: false,
        }),
        cursor: t.arg({
          type: Inputs.TagSourceWhereUniqueInput,
          required: false,
        }),
        take: t.arg({ type: 'Int', required: false }),
        skip: t.arg({ type: 'Int', required: false }),
        distinct: t.arg({
          type: [Inputs.TagSourceScalarFieldEnum],
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

export const CompanyAuditLogsFieldObject = defineRelationFunction(
  'Company',
  (t) =>
    defineRelationObject('Company', 'auditLogs', {
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

export const CompanyOffersFieldObject = defineRelationFunction('Company', (t) =>
  defineRelationObject('Company', 'offers', {
    description: undefined,
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.OfferWhereInput, required: false }),
      orderBy: t.arg({
        type: [Inputs.OfferOrderByWithRelationInput],
        required: false,
      }),
      cursor: t.arg({ type: Inputs.OfferWhereUniqueInput, required: false }),
      take: t.arg({ type: 'Int', required: false }),
      skip: t.arg({ type: 'Int', required: false }),
      distinct: t.arg({ type: [Inputs.OfferScalarFieldEnum], required: false }),
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

export const CompanyTemplatesFieldObject = defineRelationFunction(
  'Company',
  (t) =>
    defineRelationObject('Company', 'templates', {
      description: undefined,
      nullable: false,
      args: {
        where: t.arg({ type: Inputs.TemplateWhereInput, required: false }),
        orderBy: t.arg({
          type: [Inputs.TemplateOrderByWithRelationInput],
          required: false,
        }),
        cursor: t.arg({
          type: Inputs.TemplateWhereUniqueInput,
          required: false,
        }),
        take: t.arg({ type: 'Int', required: false }),
        skip: t.arg({ type: 'Int', required: false }),
        distinct: t.arg({
          type: [Inputs.TemplateScalarFieldEnum],
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

export const CompanyTasksFieldObject = defineRelationFunction('Company', (t) =>
  defineRelationObject('Company', 'tasks', {
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
      distinct: t.arg({ type: [Inputs.TaskScalarFieldEnum], required: false }),
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

export const CompanyOwnerFieldObject = defineRelationObject(
  'Company',
  'owner',
  {
    description: undefined,
    nullable: false,
    args: undefined,
    query: undefined,
  }
)

export const CompanyOwnerIdFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: false,
})
