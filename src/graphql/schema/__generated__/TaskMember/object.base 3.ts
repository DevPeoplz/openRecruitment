import * as Inputs from '@/graphql/schema/__generated__/inputs'
import {
  defineExposeObject,
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils'

export const TaskMemberObject = definePrismaObject('TaskMember', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.exposeID('id', TaskMemberIdFieldObject),
    task: t.relation('task', TaskMemberTaskFieldObject),
    taskId: t.exposeInt('taskId', TaskMemberTaskIdFieldObject),
    teamMember: t.relation('teamMember', TaskMemberTeamMemberFieldObject),
    teamMemberId: t.exposeInt(
      'teamMemberId',
      TaskMemberTeamMemberIdFieldObject
    ),
  }),
})

export const TaskMemberIdFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: false,
})

export const TaskMemberTaskFieldObject = defineRelationObject(
  'TaskMember',
  'task',
  {
    description: undefined,
    nullable: false,
    args: undefined,
    query: undefined,
  }
)

export const TaskMemberTaskIdFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: false,
})

export const TaskMemberTeamMemberFieldObject = defineRelationObject(
  'TaskMember',
  'teamMember',
  {
    description: undefined,
    nullable: false,
    args: undefined,
    query: undefined,
  }
)

export const TaskMemberTeamMemberIdFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: false,
})
