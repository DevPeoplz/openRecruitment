import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { builder } from '../../builder';
import {
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils';

export const DepartmentObject = definePrismaObject('Department', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.field(DepartmentIdFieldObject),
    name: t.field(DepartmentNameFieldObject),
    company: t.relation('company', DepartmentCompanyFieldObject),
    companyId: t.field(DepartmentCompanyIdFieldObject),
    offers: t.relation('offers', DepartmentOffersFieldObject(t)),
  }),
});

export const DepartmentIdFieldObject = defineFieldObject('Department', {
  type: "ID",
  description: undefined,
  nullable: false,
  resolve: (parent) => String(parent.id),
});

export const DepartmentNameFieldObject = defineFieldObject('Department', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.name,
});

export const DepartmentCompanyFieldObject = defineRelationObject('Department', 'company', {
  description: undefined,
  nullable: false,
  args: undefined,
  query: undefined,
});

export const DepartmentCompanyIdFieldObject = defineFieldObject('Department', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.companyId,
});

export const DepartmentOffersFieldArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.OfferWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.OfferOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.OfferWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.OfferScalarFieldEnum], required: false }),
}))

export const DepartmentOffersFieldObject = defineRelationFunction('Department', (t) =>
  defineRelationObject('Department', 'offers', {
    description: undefined,
    nullable: false,
    args: DepartmentOffersFieldArgs,
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
