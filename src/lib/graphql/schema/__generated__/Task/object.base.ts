import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { builder } from '../../builder';
import {
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils';

export const TaskObject = definePrismaObject('Task', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.field(TaskIdFieldObject),
    company: t.relation('company', TaskCompanyFieldObject),
    companyId: t.field(TaskCompanyIdFieldObject),
    name: t.field(TaskNameFieldObject),
    status: t.field(TaskStatusFieldObject),
    dueDate: t.field(TaskDueDateFieldObject),
    note: t.field(TaskNoteFieldObject),
    taskMembers: t.relation('taskMembers', TaskTaskMembersFieldObject(t)),
    Candidate: t.relation('Candidate', TaskCandidateFieldObject),
    candidateId: t.field(TaskCandidateIdFieldObject),
  }),
});

export const TaskIdFieldObject = defineFieldObject('Task', {
  type: "ID",
  description: undefined,
  nullable: false,
  resolve: (parent) => String(parent.id),
});

export const TaskCompanyFieldObject = defineRelationObject('Task', 'company', {
  description: undefined,
  nullable: false,
  args: undefined,
  query: undefined,
});

export const TaskCompanyIdFieldObject = defineFieldObject('Task', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.companyId,
});

export const TaskNameFieldObject = defineFieldObject('Task', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.name,
});

export const TaskStatusFieldObject = defineFieldObject('Task', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.status,
});

export const TaskDueDateFieldObject = defineFieldObject('Task', {
  type: Inputs.DateTime,
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.dueDate,
});

export const TaskNoteFieldObject = defineFieldObject('Task', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.note,
});

export const TaskTaskMembersFieldArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.TaskMemberWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.TaskMemberOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.TaskMemberWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.TaskMemberScalarFieldEnum], required: false }),
}))

export const TaskTaskMembersFieldObject = defineRelationFunction('Task', (t) =>
  defineRelationObject('Task', 'taskMembers', {
    description: undefined,
    nullable: false,
    args: TaskTaskMembersFieldArgs,
    query: (args) => ({
      where: args.where || undefined,
      cursor: args.cursor || undefined,
      take: args.take || undefined,
      distinct: args.distinct || undefined,
      skip: args.skip || undefined,
      orderBy: args.orderBy || undefined,
    }),
  }),
);

export const TaskCandidateFieldObject = defineRelationObject('Task', 'Candidate', {
  description: undefined,
  nullable: true,
  args: undefined,
  query: undefined,
});

export const TaskCandidateIdFieldObject = defineFieldObject('Task', {
  type: "Int",
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.candidateId,
});
