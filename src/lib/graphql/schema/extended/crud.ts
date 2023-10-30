/* eslint-disable */
import { builder } from '../builder'
import { utils } from './utils'
import * as User from './User'
// import * as Account from './Account'
// import * as Session from './Session'
// import * as VerificationToken from './VerificationToken'
// import * as Attachment from './Attachment'
// import * as HiringRole from './HiringRole'
// import * as Role from './Role'
import * as Company from './Company'
import * as CustomField from './CustomField'
// import * as SubscriptionData from './SubscriptionData'
// import * as CompanyMetadata from './CompanyMetadata'
// import * as Department from './Department'
// import * as DisqualifyReason from './DisqualifyReason'
import * as TagSource from './TagSource'
import * as AuditLog from './AuditLog'
// import * as MeetingRoom from './MeetingRoom'
// import * as EventSchedule from './EventSchedule'
// import * as EventScheduleInterviewer from './EventScheduleInterviewer'
// import * as EventScheduleEvaluation from './EventScheduleEvaluation'
// import * as Event from './Event'
// import * as EventInterviewer from './EventInterviewer'
// import * as EventEvaluation from './EventEvaluation'
import * as Offer from './Offer'
// import * as OfferFile from './OfferFile'
// import * as Match from './Match'
// import * as OfferTag from './OfferTag'
// import * as Membership from './Membership'
import * as TalentPool from './TalentPool'
// import * as TalentPoolFile from './TalentPoolFile'
// import * as TalentPoolMatch from './TalentPoolMatch'
// import * as Template from './Template'
// import * as Stage from './Stage'
// import * as StageVisibility from './StageVisibility'
// import * as StageMetadata from './StageMetadata'
import * as Candidate from './Candidate'
// import * as CandidateTag from './CandidateTag'
// import * as CandidateCustomFields from './CandidateCustomFields'
import * as Evaluation from './Evaluation'
// import * as EvaluationAnswer from './EvaluationAnswer'
// import * as SharedCandidateLink from './SharedCandidateLink'
// import * as Task from './Task'
// import * as TaskMember from './TaskMember'
// import * as Follow from './Follow'
import * as Objects from '../__generated__/objects'
import { Cruds as AutoCruds } from '../__generated__/autocrud'

type Model = Objects.Model

export const Cruds: Record<
  Objects.Model,
  {
    Object: any
    queries: Record<string, Function>
    mutations: Record<string, Function>
  }
> = {
  ...AutoCruds,
  User: {
    Object: User.UserObject,
    queries: {
      ...AutoCruds.User.queries,
    },
    mutations: {
      ...AutoCruds.User.mutations,
      signUp: User.signUpUserMutationObject,
    },
  },
  Company: {
    Object: Company.CompanyObject,
    queries: AutoCruds.Company.queries,
    mutations: AutoCruds.Company.mutations,
  },
  CustomField: {
    Object: AutoCruds.CustomField.Object,
    queries: {
      ...AutoCruds.CustomField.queries,
      findMany: CustomField.findManyCustomFieldQueryObject,
    },
    mutations: {
      ...AutoCruds.Candidate.mutations,
      createOne: CustomField.createOneCustomFieldMutationObject,
    },
  },
  Candidate: {
    Object: Candidate.CandidateObject,
    queries: {
      ...AutoCruds.Candidate.queries,
      count: Candidate.countCandidateQueryObject,
      findMany: Candidate.findManyCandidateQueryObject,
      findUnique: Candidate.findUniqueCandidateQueryObject,
    },
    mutations: {
      ...AutoCruds.Candidate.mutations,
      createOne: Candidate.createOneCandidateMutationObject,
      updateOne: Candidate.updateOneCandidateMutationObject,
    },
  },
  Offer: {
    Object: AutoCruds.Offer.Object,
    queries: {
      ...AutoCruds.Offer.queries,
      count: Offer.countOfferQueryObject,
      findMany: Offer.findManyOfferQueryObject,
    },
    mutations: {
      ...AutoCruds.Offer.mutations,
      createOne: Offer.createOneOfferMutationObject,
    },
  },
  TalentPool: {
    Object: AutoCruds.TalentPool.Object,
    queries: {
      ...AutoCruds.TalentPool.queries,
      count: TalentPool.countTalentPoolQueryObject,
      findMany: TalentPool.findManyTalentPoolQueryObject,
    },
    mutations: {
      ...AutoCruds.TalentPool.mutations,
      createOne: TalentPool.createOneTalentPoolMutationObject,
    },
  },
  TagSource: {
    Object: AutoCruds.TagSource.Object,
    queries: {
      ...AutoCruds.TagSource.queries,
      findMany: TagSource.findManyTagSourceQueryObject,
    },
    mutations: AutoCruds.TagSource.mutations,
  },
  AuditLog: {
    Object: AutoCruds.AuditLog.Object,
    queries: {
      ...AutoCruds.AuditLog.queries,
      findMany: AuditLog.findManyAuditLogQueryObject,
    },
    mutations: AutoCruds.AuditLog.mutations,
  },
  Evaluation: {
    Object: AutoCruds.Evaluation.Object,
    queries: {
      ...AutoCruds.Evaluation.queries,
      findMany: Evaluation.findManyEvaluationQueryObject,
    },
    mutations: {
      ...AutoCruds.Evaluation.mutations,
      createOne: Evaluation.createOneEvaluationMutationObject,
    },
  },
}

const crudEntries = Object.entries(Cruds)

type ResolverType = 'Query' | 'Mutation'

function generateResolversByType(type: ResolverType, opts?: CrudOptions) {
  return crudEntries
    .filter(([modelName]) => includeModel(modelName, opts))
    .map(([modelName, config]) => {
      const resolverEntries = Object.entries(config[type === 'Query' ? 'queries' : 'mutations'])

      return resolverEntries.map(([operationName, resolverObjectDefiner]) => {
        const resolverName = operationName + modelName
        const isntPrismaFieldList = ['count', 'deleteMany', 'updateMany']
        const isPrismaField = !isntPrismaFieldList.includes(operationName)

        const getFields = (t: any) => {
          const field = resolverObjectDefiner(t)
          const handledField = opts?.handleResolver
            ? opts.handleResolver({
                field,
                modelName: modelName as Model,
                operationName,
                resolverName,
                t,
                isPrismaField,
                type,
              })
            : field

          return {
            [resolverName]: isPrismaField ? t.prismaField(handledField) : t.field(handledField),
          }
        }

        return type === 'Query'
          ? builder.queryFields((t) => getFields(t))
          : builder.mutationFields((t) => getFields(t))
      })
    })
}

export function generateAllObjects(opts?: CrudOptions) {
  return crudEntries
    .filter(([md]) => includeModel(md, opts))
    .map(([modelName, { Object }]) => {
      return builder.prismaObject(modelName as Model, Object) // Objects is all imports
    })
}

export function generateAllQueries(opts?: CrudOptions) {
  generateResolversByType('Query', opts)
}

export function generateAllMutations(opts?: CrudOptions) {
  generateResolversByType('Mutation', opts)
}

export function generateAllResolvers(opts?: CrudOptions) {
  generateResolversByType('Mutation', opts)
  generateResolversByType('Query', opts)
}

type CrudOptions = {
  include?: Model[]
  exclude?: Model[]
  /**
   * Caution: This is not type safe
   * Wrap all queries/mutations to override args, run extra code in resolve function (ie: throw errors, logs), apply plugins, etc.
   */
  handleResolver?: (props: {
    modelName: Model
    field: any
    operationName: string
    resolverName: string
    t: any
    isPrismaField: boolean
    type: ResolverType
  }) => any
}

const includeModel = (model: string, opts?: CrudOptions): boolean => {
  if (!opts) return true
  if (opts.include) return opts.include.includes(model as Model)
  if (opts.exclude) return !opts.exclude.includes(model as Model)
  return true
}

const generateUtils = () => {
  return Object.entries(utils).map(([query, object]) => {
    return builder.queryFields(object) // Objects is all imports
  })
}

export function generateAllCrud(opts?: CrudOptions) {
  generateAllObjects(opts)
  generateAllQueries(opts)
  generateAllMutations(opts)
  generateUtils()
}
