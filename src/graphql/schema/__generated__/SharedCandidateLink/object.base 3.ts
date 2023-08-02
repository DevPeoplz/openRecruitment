import * as Inputs from '@/graphql/schema/__generated__/inputs'
import {
  defineExposeObject,
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils'

export const SharedCandidateLinkObject = definePrismaObject(
  'SharedCandidateLink',
  {
    description: undefined,
    findUnique: ({ id }) => ({ id }),
    fields: (t) => ({
      id: t.exposeID('id', SharedCandidateLinkIdFieldObject),
      name: t.exposeString('name', SharedCandidateLinkNameFieldObject),
      visibleSections: t.exposeStringList(
        'visibleSections',
        SharedCandidateLinkVisibleSectionsFieldObject
      ),
      editModelSections: t.exposeStringList(
        'editModelSections',
        SharedCandidateLinkEditModelSectionsFieldObject
      ),
      link: t.exposeString('link', SharedCandidateLinkLinkFieldObject),
      expiration: t.field(SharedCandidateLinkExpirationFieldObject),
      candidate: t.relation(
        'candidate',
        SharedCandidateLinkCandidateFieldObject
      ),
      candidateId: t.exposeInt(
        'candidateId',
        SharedCandidateLinkCandidateIdFieldObject
      ),
    }),
  }
)

export const SharedCandidateLinkIdFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: false,
})

export const SharedCandidateLinkNameFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: false,
})

export const SharedCandidateLinkVisibleSectionsFieldObject = defineExposeObject(
  'String',
  {
    description: undefined,
    nullable: false,
  }
)

export const SharedCandidateLinkEditModelSectionsFieldObject =
  defineExposeObject('String', {
    description: undefined,
    nullable: false,
  })

export const SharedCandidateLinkLinkFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: false,
})

export const SharedCandidateLinkExpirationFieldObject = defineFieldObject(
  'SharedCandidateLink',
  {
    type: Inputs.DateTime,
    description: undefined,
    nullable: false,
    resolve: (parent) => parent.expiration,
  }
)

export const SharedCandidateLinkCandidateFieldObject = defineRelationObject(
  'SharedCandidateLink',
  'candidate',
  {
    description: undefined,
    nullable: false,
    args: undefined,
    query: undefined,
  }
)

export const SharedCandidateLinkCandidateIdFieldObject = defineExposeObject(
  'Int',
  {
    description: undefined,
    nullable: false,
  }
)
