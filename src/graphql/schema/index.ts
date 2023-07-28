import { Prisma } from '@prisma/client'
import {
     generateAllCrud,
     generateAllObjects,
     generateAllQueries,
     generateAllMutations,
} from './extended/crud'
import { builder } from './builder'
import { UserUpdateInputFields } from './__generated__/inputs'
import { UserObject } from './__generated__/User'

export const UserUpdateInputCustom = builder.inputRef<Prisma.UserUpdateInput & {
     customArg: string
}>('UserUpdateInputCustom').implement({
     fields: (t) => ({
          ...UserUpdateInputFields(t),
          customArg: t.field({ 'required': true, 'type': 'String' }), // custom
     }),
})


// builder.prismaObject('User', {
//      ...UserObject,
//      fields: (t) => {
//           // Type-safely omit and rename fields
//           const { phone: asopotaPhone, email: emailAddress, ...fields } = UserObject.fields(t)
//
//           return {
//                ...fields,
//                // Renamed field
//                emailAddress,
//                asopotaPhone,
//                // Add custom fields
//                customField: t.field({ type: 'String', resolve: () => 'Hello world!' }),
//           }
//      },
// })

generateAllCrud()

builder.queryType({})
builder.mutationType({})

export const schema = builder.toSchema({})