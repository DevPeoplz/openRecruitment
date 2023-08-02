import * as Inputs from '@/graphql/schema/__generated__/inputs'
import {
  defineExposeObject,
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils'

export const CandidateTagObject = definePrismaObject('CandidateTag', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.exposeID('id', CandidateTagIdFieldObject),
    candidate: t.relation('candidate', CandidateTagCandidateFieldObject),
    candidateId: t.exposeInt('candidateId', CandidateTagCandidateIdFieldObject),
    tag: t.relation('tag', CandidateTagTagFieldObject),
    tagId: t.exposeInt('tagId', CandidateTagTagIdFieldObject),
  }),
})

export const CandidateTagIdFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: false,
})

export const CandidateTagCandidateFieldObject = defineRelationObject(
  'CandidateTag',
  'candidate',
  {
    description: undefined,
    nullable: false,
    args: undefined,
    query: undefined,
  }
)

export const CandidateTagCandidateIdFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: false,
})

export const CandidateTagTagFieldObject = defineRelationObject(
  'CandidateTag',
  'tag',
  {
    description: undefined,
    nullable: false,
    args: undefined,
    query: undefined,
  }
)

export const CandidateTagTagIdFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: false,
})
