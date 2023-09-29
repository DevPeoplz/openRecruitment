import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { builder } from '../../builder';
import {
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils';

export const UserObject = definePrismaObject('User', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.field(UserIdFieldObject),
    name: t.field(UserNameFieldObject),
    email: t.field(UserEmailFieldObject),
    emailVerified: t.field(UserEmailVerifiedFieldObject),
    image: t.field(UserImageFieldObject),
    password: t.field(UserPasswordFieldObject),
    phone: t.field(UserPhoneFieldObject),
    firstName: t.field(UserFirstNameFieldObject),
    lastName: t.field(UserLastNameFieldObject),
    preferredLanguage: t.field(UserPreferredLanguageFieldObject),
    timeformat24: t.field(UserTimeformat24FieldObject),
    timezone: t.field(UserTimezoneFieldObject),
    weekStartDate: t.field(UserWeekStartDateFieldObject),
    photo: t.relation('photo', UserPhotoFieldObject),
    photoId: t.field(UserPhotoIdFieldObject),
    featureDiscovery: t.field(UserFeatureDiscoveryFieldObject),
    emailProviders: t.field(UserEmailProvidersFieldObject),
    theme: t.field(UserThemeFieldObject),
    notifications: t.field(UserNotificationsFieldObject),
    createdAt: t.field(UserCreatedAtFieldObject),
    updatedAt: t.field(UserUpdatedAtFieldObject),
    accounts: t.relation('accounts', UserAccountsFieldObject(t)),
    sessions: t.relation('sessions', UserSessionsFieldObject(t)),
    hiringRoles: t.relation('hiringRoles', UserHiringRolesFieldObject(t)),
    companiesOwned: t.relation('companiesOwned', UserCompaniesOwnedFieldObject(t)),
    userRole: t.field(UserUserRoleFieldObject),
  }),
});

export const UserIdFieldObject = defineFieldObject('User', {
  type: "ID",
  description: undefined,
  nullable: false,
  resolve: (parent) => String(parent.id),
});

export const UserNameFieldObject = defineFieldObject('User', {
  type: "String",
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.name,
});

export const UserEmailFieldObject = defineFieldObject('User', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.email,
});

export const UserEmailVerifiedFieldObject = defineFieldObject('User', {
  type: Inputs.DateTime,
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.emailVerified,
});

export const UserImageFieldObject = defineFieldObject('User', {
  type: "String",
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.image,
});

export const UserPasswordFieldObject = defineFieldObject('User', {
  type: "String",
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.password,
});

export const UserPhoneFieldObject = defineFieldObject('User', {
  type: "String",
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.phone,
});

export const UserFirstNameFieldObject = defineFieldObject('User', {
  type: "String",
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.firstName,
});

export const UserLastNameFieldObject = defineFieldObject('User', {
  type: "String",
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.lastName,
});

export const UserPreferredLanguageFieldObject = defineFieldObject('User', {
  type: "String",
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.preferredLanguage,
});

export const UserTimeformat24FieldObject = defineFieldObject('User', {
  type: "Boolean",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.timeformat24,
});

export const UserTimezoneFieldObject = defineFieldObject('User', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.timezone,
});

export const UserWeekStartDateFieldObject = defineFieldObject('User', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.weekStartDate,
});

export const UserPhotoFieldObject = defineRelationObject('User', 'photo', {
  description: undefined,
  nullable: true,
  args: undefined,
  query: undefined,
});

export const UserPhotoIdFieldObject = defineFieldObject('User', {
  type: "Int",
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.photoId,
});

export const UserFeatureDiscoveryFieldObject = defineFieldObject('User', {
  type: ["String"],
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.featureDiscovery,
});

export const UserEmailProvidersFieldObject = defineFieldObject('User', {
  type: ["String"],
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.emailProviders,
});

export const UserThemeFieldObject = defineFieldObject('User', {
  type: "String",
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.theme,
});

export const UserNotificationsFieldObject = defineFieldObject('User', {
  type: Inputs.Json,
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.notifications,
});

export const UserCreatedAtFieldObject = defineFieldObject('User', {
  type: Inputs.DateTime,
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.createdAt,
});

export const UserUpdatedAtFieldObject = defineFieldObject('User', {
  type: Inputs.DateTime,
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.updatedAt,
});

export const UserAccountsFieldArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.AccountWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.AccountOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.AccountWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.AccountScalarFieldEnum], required: false }),
}))

export const UserAccountsFieldObject = defineRelationFunction('User', (t) =>
  defineRelationObject('User', 'accounts', {
    description: undefined,
    nullable: false,
    args: UserAccountsFieldArgs,
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

export const UserSessionsFieldArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.SessionWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.SessionOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.SessionWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.SessionScalarFieldEnum], required: false }),
}))

export const UserSessionsFieldObject = defineRelationFunction('User', (t) =>
  defineRelationObject('User', 'sessions', {
    description: undefined,
    nullable: false,
    args: UserSessionsFieldArgs,
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

export const UserHiringRolesFieldArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.HiringRoleWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.HiringRoleOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.HiringRoleWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.HiringRoleScalarFieldEnum], required: false }),
}))

export const UserHiringRolesFieldObject = defineRelationFunction('User', (t) =>
  defineRelationObject('User', 'hiringRoles', {
    description: undefined,
    nullable: false,
    args: UserHiringRolesFieldArgs,
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

export const UserCompaniesOwnedFieldArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.CompanyWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.CompanyOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.CompanyWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.CompanyScalarFieldEnum], required: false }),
}))

export const UserCompaniesOwnedFieldObject = defineRelationFunction('User', (t) =>
  defineRelationObject('User', 'companiesOwned', {
    description: undefined,
    nullable: false,
    args: UserCompaniesOwnedFieldArgs,
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

export const UserUserRoleFieldObject = defineFieldObject('User', {
  type: Inputs.UserRoles,
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.userRole,
});
