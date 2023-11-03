import { definePrismaObject } from '../../__generated__/utils'
import * as User from '../../__generated__/User'
import { omit } from 'lodash'

export const UserObject = definePrismaObject('User', {
  ...User.UserObject,
  fields: (t) => {
    // Type-safely omit and rename fields
    const fields = omit(User.UserObject.fields(t), 'password')

    return {
      ...fields,
      // Add custom fields
      customField: t.field({
        authz: {
          rules: ['IsAuthenticated'],
        },
        type: 'String',
        resolve: () => 'Hello world!2',
      }),
    }
  },
})
