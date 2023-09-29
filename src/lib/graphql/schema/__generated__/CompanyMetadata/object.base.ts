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
    metaKey: t.field(CompanyMetadataMetaKeyFieldObject),
    metaValue: t.field(CompanyMetadataMetaValueFieldObject),
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

export const CompanyMetadataMetaKeyFieldObject = defineFieldObject('CompanyMetadata', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.metaKey,
});

export const CompanyMetadataMetaValueFieldObject = defineFieldObject('CompanyMetadata', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.metaValue,
});
