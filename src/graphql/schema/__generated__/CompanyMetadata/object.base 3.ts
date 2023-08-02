import * as Inputs from '@/graphql/schema/__generated__/inputs'
import {
  defineExposeObject,
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils'

export const CompanyMetadataObject = definePrismaObject('CompanyMetadata', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.exposeID('id', CompanyMetadataIdFieldObject),
    company: t.relation('company', CompanyMetadataCompanyFieldObject),
    companyId: t.exposeString('companyId', CompanyMetadataCompanyIdFieldObject),
    metaKey: t.exposeString('metaKey', CompanyMetadataMetaKeyFieldObject),
    metaValue: t.exposeString('metaValue', CompanyMetadataMetaValueFieldObject),
  }),
})

export const CompanyMetadataIdFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: false,
})

export const CompanyMetadataCompanyFieldObject = defineRelationObject(
  'CompanyMetadata',
  'company',
  {
    description: undefined,
    nullable: false,
    args: undefined,
    query: undefined,
  }
)

export const CompanyMetadataCompanyIdFieldObject = defineExposeObject(
  'String',
  {
    description: undefined,
    nullable: false,
  }
)

export const CompanyMetadataMetaKeyFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: false,
})

export const CompanyMetadataMetaValueFieldObject = defineExposeObject(
  'String',
  {
    description: undefined,
    nullable: false,
  }
)
