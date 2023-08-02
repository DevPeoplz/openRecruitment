import * as Inputs from '@/graphql/schema/__generated__/inputs'
import {
  defineExposeObject,
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils'

export const TaskObject = definePrismaObject('Task', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.exposeID('id', TaskIdFieldObject),
    company: t.relation('company', TaskCompanyFieldObject),
    companyId: t.exposeString('companyId', TaskCompanyIdFieldObject),
    name: t.exposeString('name', TaskNameFieldObject),
    status: t.exposeString('status', TaskStatusFieldObject),
    dueDate: t.field(TaskDueDateFieldObject),
    note: t.exposeString('note', TaskNoteFieldObject),
    taskMembers: t.relation('taskMembers', TaskTaskMembersFieldObject(t)),
    Candidate: t.relation('Candidate', TaskCandidateFieldObject),
    candidateId: t.exposeInt('candidateId', TaskCandidateIdFieldObject),
  }),
})

export const TaskIdFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: false,
})

export const TaskCompanyFieldObject = defineRelationObject('Task', 'company', {
  description: undefined,
  nullable: false,
  args: undefined,
  query: undefined,
})

export const TaskCompanyIdFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: false,
})

export const TaskNameFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: false,
})

export const TaskStatusFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: false,
})

export const TaskDueDateFieldObject = defineFieldObject('Task', {
  type: Inputs.DateTime,
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.dueDate,
})

export const TaskNoteFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: false,
})

export const TaskTaskMembersFieldObject = defineRelationFunction('Task', (t) =>
  defineRelationObject('Task', 'taskMembers', {
    description: undefined,
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.TaskMemberWhereInput, required: false }),
      orderBy: t.arg({
        type: [Inputs.TaskMemberOrderByWithRelationInput],
        required: false,
      }),
      cursor: t.arg({
        type: Inputs.TaskMemberWhereUniqueInput,
        required: false,
      }),
      take: t.arg({ type: 'Int', required: false }),
      skip: t.arg({ type: 'Int', required: false }),
      distinct: t.arg({
        type: [Inputs.TaskMemberScalarFieldEnum],
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

export const TaskCandidateFieldObject = defineRelationObject(
  'Task',
  'Candidate',
  {
    description: undefined,
    nullable: true,
    args: undefined,
    query: undefined,
  }
)

export const TaskCandidateIdFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: true,
})
