import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { builder } from '../../builder';
import {
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils';

export const CompanyMetadataObject = definePrismaObject('CompanyMetadata', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.field(CompanyMetadataIdFieldObject),
    company: t.relation('company', CompanyMetadataCompanyFieldObject),
    companyId: t.field(CompanyMetadataCompanyIdFieldObject),
    key: t.field(CompanyMetadataKeyFieldObject),
    value: t.field(CompanyMetadataValueFieldObject),
    settings: t.field(CompanyMetadataSettingsFieldObject),
    type: t.field(CompanyMetadataTypeFieldObject),
  }),
});

export const CompanyMetadataIdFieldObject = defineFieldObject('CompanyMetadata', {
  type: "ID",
  description: undefined,
  nullable: false,
  resolve: (parent) => String(parent.id),
});

export const CompanyMetadataCompanyFieldObject = defineRelationObject('CompanyMetadata', 'company', {
  description: undefined,
  nullable: false,
  args: undefined,
  query: undefined,
});

export const CompanyMetadataCompanyIdFieldObject = defineFieldObject('CompanyMetadata', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.companyId,
});

export const CompanyMetadataKeyFieldObject = defineFieldObject('CompanyMetadata', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.key,
});

export const CompanyMetadataValueFieldObject = defineFieldObject('CompanyMetadata', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.value,
});

export const CompanyMetadataSettingsFieldObject = defineFieldObject('CompanyMetadata', {
  type: Inputs.Json,
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.settings,
});

export const CompanyMetadataTypeFieldObject = defineFieldObject('CompanyMetadata', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.type,
});
