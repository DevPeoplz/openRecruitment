import * as Inputs from '@/graphql/schema/__generated__/inputs'
import {
  defineExposeObject,
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils'

export const UserObject = definePrismaObject('User', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.exposeID('id', UserIdFieldObject),
    name: t.exposeString('name', UserNameFieldObject),
    email: t.exposeString('email', UserEmailFieldObject),
    emailVerified: t.field(UserEmailVerifiedFieldObject),
    image: t.exposeString('image', UserImageFieldObject),
    password: t.exposeString('password', UserPasswordFieldObject),
    phone: t.exposeString('phone', UserPhoneFieldObject),
    firstName: t.exposeString('firstName', UserFirstNameFieldObject),
    lastName: t.exposeString('lastName', UserLastNameFieldObject),
    preferredLanguage: t.exposeString(
      'preferredLanguage',
      UserPreferredLanguageFieldObject
    ),
    timeformat24: t.exposeBoolean('timeformat24', UserTimeformat24FieldObject),
    timezone: t.exposeString('timezone', UserTimezoneFieldObject),
    weekStartDate: t.exposeString(
      'weekStartDate',
      UserWeekStartDateFieldObject
    ),
    photo: t.relation('photo', UserPhotoFieldObject),
    photoId: t.exposeInt('photoId', UserPhotoIdFieldObject),
    featureDiscovery: t.exposeStringList(
      'featureDiscovery',
      UserFeatureDiscoveryFieldObject
    ),
    emailProvider: t.exposeStringList(
      'emailProvider',
      UserEmailProviderFieldObject
    ),
    theme: t.exposeString('theme', UserThemeFieldObject),
    notifications: t.field(UserNotificationsFieldObject),
    createdAt: t.field(UserCreatedAtFieldObject),
    updatedAt: t.field(UserUpdatedAtFieldObject),
    accounts: t.relation('accounts', UserAccountsFieldObject(t)),
    sessions: t.relation('sessions', UserSessionsFieldObject(t)),
    hiringRole: t.relation('hiringRole', UserHiringRoleFieldObject(t)),
    companies: t.relation('companies', UserCompaniesFieldObject(t)),
    userRole: t.field(UserUserRoleFieldObject),
  }),
})

export const UserIdFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: false,
})

export const UserNameFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: true,
})

export const UserEmailFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: false,
})

export const UserEmailVerifiedFieldObject = defineFieldObject('User', {
  type: Inputs.DateTime,
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.emailVerified,
})

export const UserImageFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: true,
})

export const UserPasswordFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: true,
})

export const UserPhoneFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: true,
})

export const UserFirstNameFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: true,
})

export const UserLastNameFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: true,
})

export const UserPreferredLanguageFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: true,
})

export const UserTimeformat24FieldObject = defineExposeObject('Boolean', {
  description: undefined,
  nullable: false,
})

export const UserTimezoneFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: false,
})

export const UserWeekStartDateFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: false,
})

export const UserPhotoFieldObject = defineRelationObject('User', 'photo', {
  description: undefined,
  nullable: true,
  args: undefined,
  query: undefined,
})

export const UserPhotoIdFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: true,
})

export const UserFeatureDiscoveryFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: false,
})

export const UserEmailProviderFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: false,
})

export const UserThemeFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: true,
})

export const UserNotificationsFieldObject = defineFieldObject('User', {
  type: Inputs.Json,
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.notifications,
})

export const UserCreatedAtFieldObject = defineFieldObject('User', {
  type: Inputs.DateTime,
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.createdAt,
})

export const UserUpdatedAtFieldObject = defineFieldObject('User', {
  type: Inputs.DateTime,
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.updatedAt,
})

export const UserAccountsFieldObject = defineRelationFunction('User', (t) =>
  defineRelationObject('User', 'accounts', {
    description: undefined,
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.AccountWhereInput, required: false }),
      orderBy: t.arg({
        type: [Inputs.AccountOrderByWithRelationInput],
        required: false,
      }),
      cursor: t.arg({ type: Inputs.AccountWhereUniqueInput, required: false }),
      take: t.arg({ type: 'Int', required: false }),
      skip: t.arg({ type: 'Int', required: false }),
      distinct: t.arg({
        type: [Inputs.AccountScalarFieldEnum],
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

export const UserSessionsFieldObject = defineRelationFunction('User', (t) =>
  defineRelationObject('User', 'sessions', {
    description: undefined,
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.SessionWhereInput, required: false }),
      orderBy: t.arg({
        type: [Inputs.SessionOrderByWithRelationInput],
        required: false,
      }),
      cursor: t.arg({ type: Inputs.SessionWhereUniqueInput, required: false }),
      take: t.arg({ type: 'Int', required: false }),
      skip: t.arg({ type: 'Int', required: false }),
      distinct: t.arg({
        type: [Inputs.SessionScalarFieldEnum],
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

export const UserHiringRoleFieldObject = defineRelationFunction('User', (t) =>
  defineRelationObject('User', 'hiringRole', {
    description: undefined,
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.HiringRoleWhereInput, required: false }),
      orderBy: t.arg({
        type: [Inputs.HiringRoleOrderByWithRelationInput],
        required: false,
      }),
      cursor: t.arg({
        type: Inputs.HiringRoleWhereUniqueInput,
        required: false,
      }),
      take: t.arg({ type: 'Int', required: false }),
      skip: t.arg({ type: 'Int', required: false }),
      distinct: t.arg({
        type: [Inputs.HiringRoleScalarFieldEnum],
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

export const UserCompaniesFieldObject = defineRelationFunction('User', (t) =>
  defineRelationObject('User', 'companies', {
    description: undefined,
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.CompanyWhereInput, required: false }),
      orderBy: t.arg({
        type: [Inputs.CompanyOrderByWithRelationInput],
        required: false,
      }),
      cursor: t.arg({ type: Inputs.CompanyWhereUniqueInput, required: false }),
      take: t.arg({ type: 'Int', required: false }),
      skip: t.arg({ type: 'Int', required: false }),
      distinct: t.arg({
        type: [Inputs.CompanyScalarFieldEnum],
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

export const UserUserRoleFieldObject = defineFieldObject('User', {
  type: Inputs.UserRoles,
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.userRole,
})
