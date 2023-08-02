import * as Inputs from '@/graphql/schema/__generated__/inputs'
import {
  defineExposeObject,
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils'

export const DepartmentObject = definePrismaObject('Department', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.exposeID('id', DepartmentIdFieldObject),
    name: t.exposeString('name', DepartmentNameFieldObject),
    company: t.relation('company', DepartmentCompanyFieldObject),
    companyId: t.exposeString('companyId', DepartmentCompanyIdFieldObject),
    offers: t.relation('offers', DepartmentOffersFieldObject(t)),
  }),
})

export const DepartmentIdFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: false,
})

export const DepartmentNameFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: false,
})

export const DepartmentCompanyFieldObject = defineRelationObject(
  'Department',
  'company',
  {
    description: undefined,
    nullable: false,
    args: undefined,
    query: undefined,
  }
)

export const DepartmentCompanyIdFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: false,
})

export const DepartmentOffersFieldObject = defineRelationFunction(
  'Department',
  (t) =>
    defineRelationObject('Department', 'offers', {
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
        distinct: t.arg({
          type: [Inputs.OfferScalarFieldEnum],
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
