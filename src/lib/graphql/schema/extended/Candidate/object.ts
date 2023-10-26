import { definePrismaObject } from '../../__generated__/utils'
import * as Candidate from '../../__generated__/Candidate'
import { omit } from 'lodash'

export const CandidateObject = definePrismaObject('Candidate', {
  ...Candidate.CandidateObject,
  fields: (t) => {
    // Type-safely omit and rename fields
    const fields = omit(Candidate.CandidateObject.fields(t), 'password')

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
      name: t.field({
        type: 'String',
        resolve: (parent) => `${parent.firstName} ${parent.lastName}`,
      }),
      shortName: t.field({
        type: 'String',
        resolve: (parent) => `${parent.firstName.split(' ')[0]} ${parent.lastName.split(' ')[0]}`,
      }),
      averageScore: t.field({
        type: 'Float',
        resolve: async (parent, args, ctx) => {
          // TODO: Implement proper evaluation scores
          return parseFloat((50 + Math.random() * 50).toFixed(2))
        },
      }),
      jobFitScore: t.field({
        type: 'Float',
        resolve: async (parent, args, ctx) => {
          // TODO: Implement proper evaluation scores
          return parseFloat((Math.random() * 100).toFixed(2))
        },
      }),
    }
  },
})
