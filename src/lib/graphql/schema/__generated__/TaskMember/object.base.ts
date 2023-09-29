import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { builder } from '../../builder';
import {
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils';

export const TaskMemberObject = definePrismaObject('TaskMember', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.field(TaskMemberIdFieldObject),
    task: t.relation('task', TaskMemberTaskFieldObject),
    taskId: t.field(TaskMemberTaskIdFieldObject),
    teamMember: t.relation('teamMember', TaskMemberTeamMemberFieldObject),
    teamMemberId: t.field(TaskMemberTeamMemberIdFieldObject),
  }),
});

export const TaskMemberIdFieldObject = defineFieldObject('TaskMember', {
  type: "ID",
  description: undefined,
  nullable: false,
  resolve: (parent) => String(parent.id),
});

export const TaskMemberTaskFieldObject = defineRelationObject('TaskMember', 'task', {
  description: undefined,
  nullable: false,
  args: undefined,
  query: undefined,
});

export const TaskMemberTaskIdFieldObject = defineFieldObject('TaskMember', {
  type: "Int",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.taskId,
});

export const TaskMemberTeamMemberFieldObject = defineRelationObject('TaskMember', 'teamMember', {
  description: undefined,
  nullable: false,
  args: undefined,
  query: undefined,
});

export const TaskMemberTeamMemberIdFieldObject = defineFieldObject('TaskMember', {
  type: "Int",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.teamMemberId,
});
