import * as User from './User';
import * as Account from './Account';
import * as Session from './Session';
import * as VerificationToken from './VerificationToken';
import * as Attachment from './Attachment';
import * as HiringRole from './HiringRole';
import * as Role from './Role';
import * as Company from './Company';
import * as SubscriptionData from './SubscriptionData';
import * as CompanyMetadata from './CompanyMetadata';
import * as Department from './Department';
import * as DisqualifyReason from './DisqualifyReason';
import * as TagSource from './TagSource';
import * as AuditLog from './AuditLog';
import * as MeetingRoom from './MeetingRoom';
import * as EventSchedule from './EventSchedule';
import * as EventScheduleInterviewer from './EventScheduleInterviewer';
import * as EventScheduleEvaluation from './EventScheduleEvaluation';
import * as Event from './Event';
import * as EventInterviewer from './EventInterviewer';
import * as Offer from './Offer';
import * as OfferFile from './OfferFile';
import * as Match from './Match';
import * as OfferTag from './OfferTag';
import * as Membership from './Membership';
import * as TalentPool from './TalentPool';
import * as TalentPoolFile from './TalentPoolFile';
import * as TalentPoolMatch from './TalentPoolMatch';
import * as Template from './Template';
import * as Stage from './Stage';
import * as StageVisibility from './StageVisibility';
import * as StageMetadata from './StageMetadata';
import * as Candidate from './Candidate';
import * as CandidateTag from './CandidateTag';
import * as CandidateCustomField from './CandidateCustomField';
import * as CustomField from './CustomField';
import * as Evaluation from './Evaluation';
import * as EvaluationQuestion from './EvaluationQuestion';
import * as SharedCandidateLink from './SharedCandidateLink';
import * as Task from './Task';
import * as TaskMember from './TaskMember';
import * as Follow from './Follow';
import { builder } from '../builder';
import * as Objects from './objects';

type Model = Objects.Model;

export const Cruds: Record<
  Objects.Model,
  {
    Object: any;
    queries: Record<string, Function>;
    mutations: Record<string, Function>;
  }
> = {
  User: {
    Object: User.UserObject,
    queries: {
      findFirst: User.findFirstUserQueryObject,
      findMany: User.findManyUserQueryObject,
      count: User.countUserQueryObject,
      findUnique: User.findUniqueUserQueryObject,
    },
    mutations: {
      createMany: User.createManyUserMutationObject,
      createOne: User.createOneUserMutationObject,
      deleteMany: User.deleteManyUserMutationObject,
      deleteOne: User.deleteOneUserMutationObject,
      updateMany: User.updateManyUserMutationObject,
      updateOne: User.updateOneUserMutationObject,
      upsertOne: User.upsertOneUserMutationObject,
    },
  },
  Account: {
    Object: Account.AccountObject,
    queries: {
      findFirst: Account.findFirstAccountQueryObject,
      findMany: Account.findManyAccountQueryObject,
      count: Account.countAccountQueryObject,
      findUnique: Account.findUniqueAccountQueryObject,
    },
    mutations: {
      createMany: Account.createManyAccountMutationObject,
      createOne: Account.createOneAccountMutationObject,
      deleteMany: Account.deleteManyAccountMutationObject,
      deleteOne: Account.deleteOneAccountMutationObject,
      updateMany: Account.updateManyAccountMutationObject,
      updateOne: Account.updateOneAccountMutationObject,
      upsertOne: Account.upsertOneAccountMutationObject,
    },
  },
  Session: {
    Object: Session.SessionObject,
    queries: {
      findFirst: Session.findFirstSessionQueryObject,
      findMany: Session.findManySessionQueryObject,
      count: Session.countSessionQueryObject,
      findUnique: Session.findUniqueSessionQueryObject,
    },
    mutations: {
      createMany: Session.createManySessionMutationObject,
      createOne: Session.createOneSessionMutationObject,
      deleteMany: Session.deleteManySessionMutationObject,
      deleteOne: Session.deleteOneSessionMutationObject,
      updateMany: Session.updateManySessionMutationObject,
      updateOne: Session.updateOneSessionMutationObject,
      upsertOne: Session.upsertOneSessionMutationObject,
    },
  },
  VerificationToken: {
    Object: VerificationToken.VerificationTokenObject,
    queries: {
      findFirst: VerificationToken.findFirstVerificationTokenQueryObject,
      findMany: VerificationToken.findManyVerificationTokenQueryObject,
      count: VerificationToken.countVerificationTokenQueryObject,
      findUnique: VerificationToken.findUniqueVerificationTokenQueryObject,
    },
    mutations: {
      createMany: VerificationToken.createManyVerificationTokenMutationObject,
      createOne: VerificationToken.createOneVerificationTokenMutationObject,
      deleteMany: VerificationToken.deleteManyVerificationTokenMutationObject,
      deleteOne: VerificationToken.deleteOneVerificationTokenMutationObject,
      updateMany: VerificationToken.updateManyVerificationTokenMutationObject,
      updateOne: VerificationToken.updateOneVerificationTokenMutationObject,
      upsertOne: VerificationToken.upsertOneVerificationTokenMutationObject,
    },
  },
  Attachment: {
    Object: Attachment.AttachmentObject,
    queries: {
      findFirst: Attachment.findFirstAttachmentQueryObject,
      findMany: Attachment.findManyAttachmentQueryObject,
      count: Attachment.countAttachmentQueryObject,
      findUnique: Attachment.findUniqueAttachmentQueryObject,
    },
    mutations: {
      createMany: Attachment.createManyAttachmentMutationObject,
      createOne: Attachment.createOneAttachmentMutationObject,
      deleteMany: Attachment.deleteManyAttachmentMutationObject,
      deleteOne: Attachment.deleteOneAttachmentMutationObject,
      updateMany: Attachment.updateManyAttachmentMutationObject,
      updateOne: Attachment.updateOneAttachmentMutationObject,
      upsertOne: Attachment.upsertOneAttachmentMutationObject,
    },
  },
  HiringRole: {
    Object: HiringRole.HiringRoleObject,
    queries: {
      findFirst: HiringRole.findFirstHiringRoleQueryObject,
      findMany: HiringRole.findManyHiringRoleQueryObject,
      count: HiringRole.countHiringRoleQueryObject,
      findUnique: HiringRole.findUniqueHiringRoleQueryObject,
    },
    mutations: {
      createMany: HiringRole.createManyHiringRoleMutationObject,
      createOne: HiringRole.createOneHiringRoleMutationObject,
      deleteMany: HiringRole.deleteManyHiringRoleMutationObject,
      deleteOne: HiringRole.deleteOneHiringRoleMutationObject,
      updateMany: HiringRole.updateManyHiringRoleMutationObject,
      updateOne: HiringRole.updateOneHiringRoleMutationObject,
      upsertOne: HiringRole.upsertOneHiringRoleMutationObject,
    },
  },
  Role: {
    Object: Role.RoleObject,
    queries: {
      findFirst: Role.findFirstRoleQueryObject,
      findMany: Role.findManyRoleQueryObject,
      count: Role.countRoleQueryObject,
      findUnique: Role.findUniqueRoleQueryObject,
    },
    mutations: {
      createMany: Role.createManyRoleMutationObject,
      createOne: Role.createOneRoleMutationObject,
      deleteMany: Role.deleteManyRoleMutationObject,
      deleteOne: Role.deleteOneRoleMutationObject,
      updateMany: Role.updateManyRoleMutationObject,
      updateOne: Role.updateOneRoleMutationObject,
      upsertOne: Role.upsertOneRoleMutationObject,
    },
  },
  Company: {
    Object: Company.CompanyObject,
    queries: {
      findFirst: Company.findFirstCompanyQueryObject,
      findMany: Company.findManyCompanyQueryObject,
      count: Company.countCompanyQueryObject,
      findUnique: Company.findUniqueCompanyQueryObject,
    },
    mutations: {
      createMany: Company.createManyCompanyMutationObject,
      createOne: Company.createOneCompanyMutationObject,
      deleteMany: Company.deleteManyCompanyMutationObject,
      deleteOne: Company.deleteOneCompanyMutationObject,
      updateMany: Company.updateManyCompanyMutationObject,
      updateOne: Company.updateOneCompanyMutationObject,
      upsertOne: Company.upsertOneCompanyMutationObject,
    },
  },
  SubscriptionData: {
    Object: SubscriptionData.SubscriptionDataObject,
    queries: {
      findFirst: SubscriptionData.findFirstSubscriptionDataQueryObject,
      findMany: SubscriptionData.findManySubscriptionDataQueryObject,
      count: SubscriptionData.countSubscriptionDataQueryObject,
      findUnique: SubscriptionData.findUniqueSubscriptionDataQueryObject,
    },
    mutations: {
      createMany: SubscriptionData.createManySubscriptionDataMutationObject,
      createOne: SubscriptionData.createOneSubscriptionDataMutationObject,
      deleteMany: SubscriptionData.deleteManySubscriptionDataMutationObject,
      deleteOne: SubscriptionData.deleteOneSubscriptionDataMutationObject,
      updateMany: SubscriptionData.updateManySubscriptionDataMutationObject,
      updateOne: SubscriptionData.updateOneSubscriptionDataMutationObject,
      upsertOne: SubscriptionData.upsertOneSubscriptionDataMutationObject,
    },
  },
  CompanyMetadata: {
    Object: CompanyMetadata.CompanyMetadataObject,
    queries: {
      findFirst: CompanyMetadata.findFirstCompanyMetadataQueryObject,
      findMany: CompanyMetadata.findManyCompanyMetadataQueryObject,
      count: CompanyMetadata.countCompanyMetadataQueryObject,
      findUnique: CompanyMetadata.findUniqueCompanyMetadataQueryObject,
    },
    mutations: {
      createMany: CompanyMetadata.createManyCompanyMetadataMutationObject,
      createOne: CompanyMetadata.createOneCompanyMetadataMutationObject,
      deleteMany: CompanyMetadata.deleteManyCompanyMetadataMutationObject,
      deleteOne: CompanyMetadata.deleteOneCompanyMetadataMutationObject,
      updateMany: CompanyMetadata.updateManyCompanyMetadataMutationObject,
      updateOne: CompanyMetadata.updateOneCompanyMetadataMutationObject,
      upsertOne: CompanyMetadata.upsertOneCompanyMetadataMutationObject,
    },
  },
  Department: {
    Object: Department.DepartmentObject,
    queries: {
      findFirst: Department.findFirstDepartmentQueryObject,
      findMany: Department.findManyDepartmentQueryObject,
      count: Department.countDepartmentQueryObject,
      findUnique: Department.findUniqueDepartmentQueryObject,
    },
    mutations: {
      createMany: Department.createManyDepartmentMutationObject,
      createOne: Department.createOneDepartmentMutationObject,
      deleteMany: Department.deleteManyDepartmentMutationObject,
      deleteOne: Department.deleteOneDepartmentMutationObject,
      updateMany: Department.updateManyDepartmentMutationObject,
      updateOne: Department.updateOneDepartmentMutationObject,
      upsertOne: Department.upsertOneDepartmentMutationObject,
    },
  },
  DisqualifyReason: {
    Object: DisqualifyReason.DisqualifyReasonObject,
    queries: {
      findFirst: DisqualifyReason.findFirstDisqualifyReasonQueryObject,
      findMany: DisqualifyReason.findManyDisqualifyReasonQueryObject,
      count: DisqualifyReason.countDisqualifyReasonQueryObject,
      findUnique: DisqualifyReason.findUniqueDisqualifyReasonQueryObject,
    },
    mutations: {
      createMany: DisqualifyReason.createManyDisqualifyReasonMutationObject,
      createOne: DisqualifyReason.createOneDisqualifyReasonMutationObject,
      deleteMany: DisqualifyReason.deleteManyDisqualifyReasonMutationObject,
      deleteOne: DisqualifyReason.deleteOneDisqualifyReasonMutationObject,
      updateMany: DisqualifyReason.updateManyDisqualifyReasonMutationObject,
      updateOne: DisqualifyReason.updateOneDisqualifyReasonMutationObject,
      upsertOne: DisqualifyReason.upsertOneDisqualifyReasonMutationObject,
    },
  },
  TagSource: {
    Object: TagSource.TagSourceObject,
    queries: {
      findFirst: TagSource.findFirstTagSourceQueryObject,
      findMany: TagSource.findManyTagSourceQueryObject,
      count: TagSource.countTagSourceQueryObject,
      findUnique: TagSource.findUniqueTagSourceQueryObject,
    },
    mutations: {
      createMany: TagSource.createManyTagSourceMutationObject,
      createOne: TagSource.createOneTagSourceMutationObject,
      deleteMany: TagSource.deleteManyTagSourceMutationObject,
      deleteOne: TagSource.deleteOneTagSourceMutationObject,
      updateMany: TagSource.updateManyTagSourceMutationObject,
      updateOne: TagSource.updateOneTagSourceMutationObject,
      upsertOne: TagSource.upsertOneTagSourceMutationObject,
    },
  },
  AuditLog: {
    Object: AuditLog.AuditLogObject,
    queries: {
      findFirst: AuditLog.findFirstAuditLogQueryObject,
      findMany: AuditLog.findManyAuditLogQueryObject,
      count: AuditLog.countAuditLogQueryObject,
      findUnique: AuditLog.findUniqueAuditLogQueryObject,
    },
    mutations: {
      createMany: AuditLog.createManyAuditLogMutationObject,
      createOne: AuditLog.createOneAuditLogMutationObject,
      deleteMany: AuditLog.deleteManyAuditLogMutationObject,
      deleteOne: AuditLog.deleteOneAuditLogMutationObject,
      updateMany: AuditLog.updateManyAuditLogMutationObject,
      updateOne: AuditLog.updateOneAuditLogMutationObject,
      upsertOne: AuditLog.upsertOneAuditLogMutationObject,
    },
  },
  MeetingRoom: {
    Object: MeetingRoom.MeetingRoomObject,
    queries: {
      findFirst: MeetingRoom.findFirstMeetingRoomQueryObject,
      findMany: MeetingRoom.findManyMeetingRoomQueryObject,
      count: MeetingRoom.countMeetingRoomQueryObject,
      findUnique: MeetingRoom.findUniqueMeetingRoomQueryObject,
    },
    mutations: {
      createMany: MeetingRoom.createManyMeetingRoomMutationObject,
      createOne: MeetingRoom.createOneMeetingRoomMutationObject,
      deleteMany: MeetingRoom.deleteManyMeetingRoomMutationObject,
      deleteOne: MeetingRoom.deleteOneMeetingRoomMutationObject,
      updateMany: MeetingRoom.updateManyMeetingRoomMutationObject,
      updateOne: MeetingRoom.updateOneMeetingRoomMutationObject,
      upsertOne: MeetingRoom.upsertOneMeetingRoomMutationObject,
    },
  },
  EventSchedule: {
    Object: EventSchedule.EventScheduleObject,
    queries: {
      findFirst: EventSchedule.findFirstEventScheduleQueryObject,
      findMany: EventSchedule.findManyEventScheduleQueryObject,
      count: EventSchedule.countEventScheduleQueryObject,
      findUnique: EventSchedule.findUniqueEventScheduleQueryObject,
    },
    mutations: {
      createMany: EventSchedule.createManyEventScheduleMutationObject,
      createOne: EventSchedule.createOneEventScheduleMutationObject,
      deleteMany: EventSchedule.deleteManyEventScheduleMutationObject,
      deleteOne: EventSchedule.deleteOneEventScheduleMutationObject,
      updateMany: EventSchedule.updateManyEventScheduleMutationObject,
      updateOne: EventSchedule.updateOneEventScheduleMutationObject,
      upsertOne: EventSchedule.upsertOneEventScheduleMutationObject,
    },
  },
  EventScheduleInterviewer: {
    Object: EventScheduleInterviewer.EventScheduleInterviewerObject,
    queries: {
      findFirst: EventScheduleInterviewer.findFirstEventScheduleInterviewerQueryObject,
      findMany: EventScheduleInterviewer.findManyEventScheduleInterviewerQueryObject,
      count: EventScheduleInterviewer.countEventScheduleInterviewerQueryObject,
      findUnique: EventScheduleInterviewer.findUniqueEventScheduleInterviewerQueryObject,
    },
    mutations: {
      createMany: EventScheduleInterviewer.createManyEventScheduleInterviewerMutationObject,
      createOne: EventScheduleInterviewer.createOneEventScheduleInterviewerMutationObject,
      deleteMany: EventScheduleInterviewer.deleteManyEventScheduleInterviewerMutationObject,
      deleteOne: EventScheduleInterviewer.deleteOneEventScheduleInterviewerMutationObject,
      updateMany: EventScheduleInterviewer.updateManyEventScheduleInterviewerMutationObject,
      updateOne: EventScheduleInterviewer.updateOneEventScheduleInterviewerMutationObject,
      upsertOne: EventScheduleInterviewer.upsertOneEventScheduleInterviewerMutationObject,
    },
  },
  EventScheduleEvaluation: {
    Object: EventScheduleEvaluation.EventScheduleEvaluationObject,
    queries: {
      findFirst: EventScheduleEvaluation.findFirstEventScheduleEvaluationQueryObject,
      findMany: EventScheduleEvaluation.findManyEventScheduleEvaluationQueryObject,
      count: EventScheduleEvaluation.countEventScheduleEvaluationQueryObject,
      findUnique: EventScheduleEvaluation.findUniqueEventScheduleEvaluationQueryObject,
    },
    mutations: {
      createMany: EventScheduleEvaluation.createManyEventScheduleEvaluationMutationObject,
      createOne: EventScheduleEvaluation.createOneEventScheduleEvaluationMutationObject,
      deleteMany: EventScheduleEvaluation.deleteManyEventScheduleEvaluationMutationObject,
      deleteOne: EventScheduleEvaluation.deleteOneEventScheduleEvaluationMutationObject,
      updateMany: EventScheduleEvaluation.updateManyEventScheduleEvaluationMutationObject,
      updateOne: EventScheduleEvaluation.updateOneEventScheduleEvaluationMutationObject,
      upsertOne: EventScheduleEvaluation.upsertOneEventScheduleEvaluationMutationObject,
    },
  },
  Event: {
    Object: Event.EventObject,
    queries: {
      findFirst: Event.findFirstEventQueryObject,
      findMany: Event.findManyEventQueryObject,
      count: Event.countEventQueryObject,
      findUnique: Event.findUniqueEventQueryObject,
    },
    mutations: {
      createMany: Event.createManyEventMutationObject,
      createOne: Event.createOneEventMutationObject,
      deleteMany: Event.deleteManyEventMutationObject,
      deleteOne: Event.deleteOneEventMutationObject,
      updateMany: Event.updateManyEventMutationObject,
      updateOne: Event.updateOneEventMutationObject,
      upsertOne: Event.upsertOneEventMutationObject,
    },
  },
  EventInterviewer: {
    Object: EventInterviewer.EventInterviewerObject,
    queries: {
      findFirst: EventInterviewer.findFirstEventInterviewerQueryObject,
      findMany: EventInterviewer.findManyEventInterviewerQueryObject,
      count: EventInterviewer.countEventInterviewerQueryObject,
      findUnique: EventInterviewer.findUniqueEventInterviewerQueryObject,
    },
    mutations: {
      createMany: EventInterviewer.createManyEventInterviewerMutationObject,
      createOne: EventInterviewer.createOneEventInterviewerMutationObject,
      deleteMany: EventInterviewer.deleteManyEventInterviewerMutationObject,
      deleteOne: EventInterviewer.deleteOneEventInterviewerMutationObject,
      updateMany: EventInterviewer.updateManyEventInterviewerMutationObject,
      updateOne: EventInterviewer.updateOneEventInterviewerMutationObject,
      upsertOne: EventInterviewer.upsertOneEventInterviewerMutationObject,
    },
  },
  Offer: {
    Object: Offer.OfferObject,
    queries: {
      findFirst: Offer.findFirstOfferQueryObject,
      findMany: Offer.findManyOfferQueryObject,
      count: Offer.countOfferQueryObject,
      findUnique: Offer.findUniqueOfferQueryObject,
    },
    mutations: {
      createMany: Offer.createManyOfferMutationObject,
      createOne: Offer.createOneOfferMutationObject,
      deleteMany: Offer.deleteManyOfferMutationObject,
      deleteOne: Offer.deleteOneOfferMutationObject,
      updateMany: Offer.updateManyOfferMutationObject,
      updateOne: Offer.updateOneOfferMutationObject,
      upsertOne: Offer.upsertOneOfferMutationObject,
    },
  },
  OfferFile: {
    Object: OfferFile.OfferFileObject,
    queries: {
      findFirst: OfferFile.findFirstOfferFileQueryObject,
      findMany: OfferFile.findManyOfferFileQueryObject,
      count: OfferFile.countOfferFileQueryObject,
      findUnique: OfferFile.findUniqueOfferFileQueryObject,
    },
    mutations: {
      createMany: OfferFile.createManyOfferFileMutationObject,
      createOne: OfferFile.createOneOfferFileMutationObject,
      deleteMany: OfferFile.deleteManyOfferFileMutationObject,
      deleteOne: OfferFile.deleteOneOfferFileMutationObject,
      updateMany: OfferFile.updateManyOfferFileMutationObject,
      updateOne: OfferFile.updateOneOfferFileMutationObject,
      upsertOne: OfferFile.upsertOneOfferFileMutationObject,
    },
  },
  Match: {
    Object: Match.MatchObject,
    queries: {
      findFirst: Match.findFirstMatchQueryObject,
      findMany: Match.findManyMatchQueryObject,
      count: Match.countMatchQueryObject,
      findUnique: Match.findUniqueMatchQueryObject,
    },
    mutations: {
      createMany: Match.createManyMatchMutationObject,
      createOne: Match.createOneMatchMutationObject,
      deleteMany: Match.deleteManyMatchMutationObject,
      deleteOne: Match.deleteOneMatchMutationObject,
      updateMany: Match.updateManyMatchMutationObject,
      updateOne: Match.updateOneMatchMutationObject,
      upsertOne: Match.upsertOneMatchMutationObject,
    },
  },
  OfferTag: {
    Object: OfferTag.OfferTagObject,
    queries: {
      findFirst: OfferTag.findFirstOfferTagQueryObject,
      findMany: OfferTag.findManyOfferTagQueryObject,
      count: OfferTag.countOfferTagQueryObject,
      findUnique: OfferTag.findUniqueOfferTagQueryObject,
    },
    mutations: {
      createMany: OfferTag.createManyOfferTagMutationObject,
      createOne: OfferTag.createOneOfferTagMutationObject,
      deleteMany: OfferTag.deleteManyOfferTagMutationObject,
      deleteOne: OfferTag.deleteOneOfferTagMutationObject,
      updateMany: OfferTag.updateManyOfferTagMutationObject,
      updateOne: OfferTag.updateOneOfferTagMutationObject,
      upsertOne: OfferTag.upsertOneOfferTagMutationObject,
    },
  },
  Membership: {
    Object: Membership.MembershipObject,
    queries: {
      findFirst: Membership.findFirstMembershipQueryObject,
      findMany: Membership.findManyMembershipQueryObject,
      count: Membership.countMembershipQueryObject,
      findUnique: Membership.findUniqueMembershipQueryObject,
    },
    mutations: {
      createMany: Membership.createManyMembershipMutationObject,
      createOne: Membership.createOneMembershipMutationObject,
      deleteMany: Membership.deleteManyMembershipMutationObject,
      deleteOne: Membership.deleteOneMembershipMutationObject,
      updateMany: Membership.updateManyMembershipMutationObject,
      updateOne: Membership.updateOneMembershipMutationObject,
      upsertOne: Membership.upsertOneMembershipMutationObject,
    },
  },
  TalentPool: {
    Object: TalentPool.TalentPoolObject,
    queries: {
      findFirst: TalentPool.findFirstTalentPoolQueryObject,
      findMany: TalentPool.findManyTalentPoolQueryObject,
      count: TalentPool.countTalentPoolQueryObject,
      findUnique: TalentPool.findUniqueTalentPoolQueryObject,
    },
    mutations: {
      createMany: TalentPool.createManyTalentPoolMutationObject,
      createOne: TalentPool.createOneTalentPoolMutationObject,
      deleteMany: TalentPool.deleteManyTalentPoolMutationObject,
      deleteOne: TalentPool.deleteOneTalentPoolMutationObject,
      updateMany: TalentPool.updateManyTalentPoolMutationObject,
      updateOne: TalentPool.updateOneTalentPoolMutationObject,
      upsertOne: TalentPool.upsertOneTalentPoolMutationObject,
    },
  },
  TalentPoolFile: {
    Object: TalentPoolFile.TalentPoolFileObject,
    queries: {
      findFirst: TalentPoolFile.findFirstTalentPoolFileQueryObject,
      findMany: TalentPoolFile.findManyTalentPoolFileQueryObject,
      count: TalentPoolFile.countTalentPoolFileQueryObject,
      findUnique: TalentPoolFile.findUniqueTalentPoolFileQueryObject,
    },
    mutations: {
      createMany: TalentPoolFile.createManyTalentPoolFileMutationObject,
      createOne: TalentPoolFile.createOneTalentPoolFileMutationObject,
      deleteMany: TalentPoolFile.deleteManyTalentPoolFileMutationObject,
      deleteOne: TalentPoolFile.deleteOneTalentPoolFileMutationObject,
      updateMany: TalentPoolFile.updateManyTalentPoolFileMutationObject,
      updateOne: TalentPoolFile.updateOneTalentPoolFileMutationObject,
      upsertOne: TalentPoolFile.upsertOneTalentPoolFileMutationObject,
    },
  },
  TalentPoolMatch: {
    Object: TalentPoolMatch.TalentPoolMatchObject,
    queries: {
      findFirst: TalentPoolMatch.findFirstTalentPoolMatchQueryObject,
      findMany: TalentPoolMatch.findManyTalentPoolMatchQueryObject,
      count: TalentPoolMatch.countTalentPoolMatchQueryObject,
      findUnique: TalentPoolMatch.findUniqueTalentPoolMatchQueryObject,
    },
    mutations: {
      createMany: TalentPoolMatch.createManyTalentPoolMatchMutationObject,
      createOne: TalentPoolMatch.createOneTalentPoolMatchMutationObject,
      deleteMany: TalentPoolMatch.deleteManyTalentPoolMatchMutationObject,
      deleteOne: TalentPoolMatch.deleteOneTalentPoolMatchMutationObject,
      updateMany: TalentPoolMatch.updateManyTalentPoolMatchMutationObject,
      updateOne: TalentPoolMatch.updateOneTalentPoolMatchMutationObject,
      upsertOne: TalentPoolMatch.upsertOneTalentPoolMatchMutationObject,
    },
  },
  Template: {
    Object: Template.TemplateObject,
    queries: {
      findFirst: Template.findFirstTemplateQueryObject,
      findMany: Template.findManyTemplateQueryObject,
      count: Template.countTemplateQueryObject,
      findUnique: Template.findUniqueTemplateQueryObject,
    },
    mutations: {
      createMany: Template.createManyTemplateMutationObject,
      createOne: Template.createOneTemplateMutationObject,
      deleteMany: Template.deleteManyTemplateMutationObject,
      deleteOne: Template.deleteOneTemplateMutationObject,
      updateMany: Template.updateManyTemplateMutationObject,
      updateOne: Template.updateOneTemplateMutationObject,
      upsertOne: Template.upsertOneTemplateMutationObject,
    },
  },
  Stage: {
    Object: Stage.StageObject,
    queries: {
      findFirst: Stage.findFirstStageQueryObject,
      findMany: Stage.findManyStageQueryObject,
      count: Stage.countStageQueryObject,
      findUnique: Stage.findUniqueStageQueryObject,
    },
    mutations: {
      createMany: Stage.createManyStageMutationObject,
      createOne: Stage.createOneStageMutationObject,
      deleteMany: Stage.deleteManyStageMutationObject,
      deleteOne: Stage.deleteOneStageMutationObject,
      updateMany: Stage.updateManyStageMutationObject,
      updateOne: Stage.updateOneStageMutationObject,
      upsertOne: Stage.upsertOneStageMutationObject,
    },
  },
  StageVisibility: {
    Object: StageVisibility.StageVisibilityObject,
    queries: {
      findFirst: StageVisibility.findFirstStageVisibilityQueryObject,
      findMany: StageVisibility.findManyStageVisibilityQueryObject,
      count: StageVisibility.countStageVisibilityQueryObject,
      findUnique: StageVisibility.findUniqueStageVisibilityQueryObject,
    },
    mutations: {
      createMany: StageVisibility.createManyStageVisibilityMutationObject,
      createOne: StageVisibility.createOneStageVisibilityMutationObject,
      deleteMany: StageVisibility.deleteManyStageVisibilityMutationObject,
      deleteOne: StageVisibility.deleteOneStageVisibilityMutationObject,
      updateMany: StageVisibility.updateManyStageVisibilityMutationObject,
      updateOne: StageVisibility.updateOneStageVisibilityMutationObject,
      upsertOne: StageVisibility.upsertOneStageVisibilityMutationObject,
    },
  },
  StageMetadata: {
    Object: StageMetadata.StageMetadataObject,
    queries: {
      findFirst: StageMetadata.findFirstStageMetadataQueryObject,
      findMany: StageMetadata.findManyStageMetadataQueryObject,
      count: StageMetadata.countStageMetadataQueryObject,
      findUnique: StageMetadata.findUniqueStageMetadataQueryObject,
    },
    mutations: {
      createMany: StageMetadata.createManyStageMetadataMutationObject,
      createOne: StageMetadata.createOneStageMetadataMutationObject,
      deleteMany: StageMetadata.deleteManyStageMetadataMutationObject,
      deleteOne: StageMetadata.deleteOneStageMetadataMutationObject,
      updateMany: StageMetadata.updateManyStageMetadataMutationObject,
      updateOne: StageMetadata.updateOneStageMetadataMutationObject,
      upsertOne: StageMetadata.upsertOneStageMetadataMutationObject,
    },
  },
  Candidate: {
    Object: Candidate.CandidateObject,
    queries: {
      findFirst: Candidate.findFirstCandidateQueryObject,
      findMany: Candidate.findManyCandidateQueryObject,
      count: Candidate.countCandidateQueryObject,
      findUnique: Candidate.findUniqueCandidateQueryObject,
    },
    mutations: {
      createMany: Candidate.createManyCandidateMutationObject,
      createOne: Candidate.createOneCandidateMutationObject,
      deleteMany: Candidate.deleteManyCandidateMutationObject,
      deleteOne: Candidate.deleteOneCandidateMutationObject,
      updateMany: Candidate.updateManyCandidateMutationObject,
      updateOne: Candidate.updateOneCandidateMutationObject,
      upsertOne: Candidate.upsertOneCandidateMutationObject,
    },
  },
  CandidateTag: {
    Object: CandidateTag.CandidateTagObject,
    queries: {
      findFirst: CandidateTag.findFirstCandidateTagQueryObject,
      findMany: CandidateTag.findManyCandidateTagQueryObject,
      count: CandidateTag.countCandidateTagQueryObject,
      findUnique: CandidateTag.findUniqueCandidateTagQueryObject,
    },
    mutations: {
      createMany: CandidateTag.createManyCandidateTagMutationObject,
      createOne: CandidateTag.createOneCandidateTagMutationObject,
      deleteMany: CandidateTag.deleteManyCandidateTagMutationObject,
      deleteOne: CandidateTag.deleteOneCandidateTagMutationObject,
      updateMany: CandidateTag.updateManyCandidateTagMutationObject,
      updateOne: CandidateTag.updateOneCandidateTagMutationObject,
      upsertOne: CandidateTag.upsertOneCandidateTagMutationObject,
    },
  },
  CandidateCustomField: {
    Object: CandidateCustomField.CandidateCustomFieldObject,
    queries: {
      findFirst: CandidateCustomField.findFirstCandidateCustomFieldQueryObject,
      findMany: CandidateCustomField.findManyCandidateCustomFieldQueryObject,
      count: CandidateCustomField.countCandidateCustomFieldQueryObject,
      findUnique: CandidateCustomField.findUniqueCandidateCustomFieldQueryObject,
    },
    mutations: {
      createMany: CandidateCustomField.createManyCandidateCustomFieldMutationObject,
      createOne: CandidateCustomField.createOneCandidateCustomFieldMutationObject,
      deleteMany: CandidateCustomField.deleteManyCandidateCustomFieldMutationObject,
      deleteOne: CandidateCustomField.deleteOneCandidateCustomFieldMutationObject,
      updateMany: CandidateCustomField.updateManyCandidateCustomFieldMutationObject,
      updateOne: CandidateCustomField.updateOneCandidateCustomFieldMutationObject,
      upsertOne: CandidateCustomField.upsertOneCandidateCustomFieldMutationObject,
    },
  },
  CustomField: {
    Object: CustomField.CustomFieldObject,
    queries: {
      findFirst: CustomField.findFirstCustomFieldQueryObject,
      findMany: CustomField.findManyCustomFieldQueryObject,
      count: CustomField.countCustomFieldQueryObject,
      findUnique: CustomField.findUniqueCustomFieldQueryObject,
    },
    mutations: {
      createMany: CustomField.createManyCustomFieldMutationObject,
      createOne: CustomField.createOneCustomFieldMutationObject,
      deleteMany: CustomField.deleteManyCustomFieldMutationObject,
      deleteOne: CustomField.deleteOneCustomFieldMutationObject,
      updateMany: CustomField.updateManyCustomFieldMutationObject,
      updateOne: CustomField.updateOneCustomFieldMutationObject,
      upsertOne: CustomField.upsertOneCustomFieldMutationObject,
    },
  },
  Evaluation: {
    Object: Evaluation.EvaluationObject,
    queries: {
      findFirst: Evaluation.findFirstEvaluationQueryObject,
      findMany: Evaluation.findManyEvaluationQueryObject,
      count: Evaluation.countEvaluationQueryObject,
      findUnique: Evaluation.findUniqueEvaluationQueryObject,
    },
    mutations: {
      createMany: Evaluation.createManyEvaluationMutationObject,
      createOne: Evaluation.createOneEvaluationMutationObject,
      deleteMany: Evaluation.deleteManyEvaluationMutationObject,
      deleteOne: Evaluation.deleteOneEvaluationMutationObject,
      updateMany: Evaluation.updateManyEvaluationMutationObject,
      updateOne: Evaluation.updateOneEvaluationMutationObject,
      upsertOne: Evaluation.upsertOneEvaluationMutationObject,
    },
  },
  EvaluationQuestion: {
    Object: EvaluationQuestion.EvaluationQuestionObject,
    queries: {
      findFirst: EvaluationQuestion.findFirstEvaluationQuestionQueryObject,
      findMany: EvaluationQuestion.findManyEvaluationQuestionQueryObject,
      count: EvaluationQuestion.countEvaluationQuestionQueryObject,
      findUnique: EvaluationQuestion.findUniqueEvaluationQuestionQueryObject,
    },
    mutations: {
      createMany: EvaluationQuestion.createManyEvaluationQuestionMutationObject,
      createOne: EvaluationQuestion.createOneEvaluationQuestionMutationObject,
      deleteMany: EvaluationQuestion.deleteManyEvaluationQuestionMutationObject,
      deleteOne: EvaluationQuestion.deleteOneEvaluationQuestionMutationObject,
      updateMany: EvaluationQuestion.updateManyEvaluationQuestionMutationObject,
      updateOne: EvaluationQuestion.updateOneEvaluationQuestionMutationObject,
      upsertOne: EvaluationQuestion.upsertOneEvaluationQuestionMutationObject,
    },
  },
  SharedCandidateLink: {
    Object: SharedCandidateLink.SharedCandidateLinkObject,
    queries: {
      findFirst: SharedCandidateLink.findFirstSharedCandidateLinkQueryObject,
      findMany: SharedCandidateLink.findManySharedCandidateLinkQueryObject,
      count: SharedCandidateLink.countSharedCandidateLinkQueryObject,
      findUnique: SharedCandidateLink.findUniqueSharedCandidateLinkQueryObject,
    },
    mutations: {
      createMany: SharedCandidateLink.createManySharedCandidateLinkMutationObject,
      createOne: SharedCandidateLink.createOneSharedCandidateLinkMutationObject,
      deleteMany: SharedCandidateLink.deleteManySharedCandidateLinkMutationObject,
      deleteOne: SharedCandidateLink.deleteOneSharedCandidateLinkMutationObject,
      updateMany: SharedCandidateLink.updateManySharedCandidateLinkMutationObject,
      updateOne: SharedCandidateLink.updateOneSharedCandidateLinkMutationObject,
      upsertOne: SharedCandidateLink.upsertOneSharedCandidateLinkMutationObject,
    },
  },
  Task: {
    Object: Task.TaskObject,
    queries: {
      findFirst: Task.findFirstTaskQueryObject,
      findMany: Task.findManyTaskQueryObject,
      count: Task.countTaskQueryObject,
      findUnique: Task.findUniqueTaskQueryObject,
    },
    mutations: {
      createMany: Task.createManyTaskMutationObject,
      createOne: Task.createOneTaskMutationObject,
      deleteMany: Task.deleteManyTaskMutationObject,
      deleteOne: Task.deleteOneTaskMutationObject,
      updateMany: Task.updateManyTaskMutationObject,
      updateOne: Task.updateOneTaskMutationObject,
      upsertOne: Task.upsertOneTaskMutationObject,
    },
  },
  TaskMember: {
    Object: TaskMember.TaskMemberObject,
    queries: {
      findFirst: TaskMember.findFirstTaskMemberQueryObject,
      findMany: TaskMember.findManyTaskMemberQueryObject,
      count: TaskMember.countTaskMemberQueryObject,
      findUnique: TaskMember.findUniqueTaskMemberQueryObject,
    },
    mutations: {
      createMany: TaskMember.createManyTaskMemberMutationObject,
      createOne: TaskMember.createOneTaskMemberMutationObject,
      deleteMany: TaskMember.deleteManyTaskMemberMutationObject,
      deleteOne: TaskMember.deleteOneTaskMemberMutationObject,
      updateMany: TaskMember.updateManyTaskMemberMutationObject,
      updateOne: TaskMember.updateOneTaskMemberMutationObject,
      upsertOne: TaskMember.upsertOneTaskMemberMutationObject,
    },
  },
  Follow: {
    Object: Follow.FollowObject,
    queries: {
      findFirst: Follow.findFirstFollowQueryObject,
      findMany: Follow.findManyFollowQueryObject,
      count: Follow.countFollowQueryObject,
      findUnique: Follow.findUniqueFollowQueryObject,
    },
    mutations: {
      createMany: Follow.createManyFollowMutationObject,
      createOne: Follow.createOneFollowMutationObject,
      deleteMany: Follow.deleteManyFollowMutationObject,
      deleteOne: Follow.deleteOneFollowMutationObject,
      updateMany: Follow.updateManyFollowMutationObject,
      updateOne: Follow.updateOneFollowMutationObject,
      upsertOne: Follow.upsertOneFollowMutationObject,
    },
  },
};

const crudEntries = Object.entries(Cruds);

type ResolverType = "Query" | "Mutation";
function generateResolversByType(type: ResolverType, opts?: CrudOptions) {
  return crudEntries
    .filter(([modelName]) => includeModel(modelName, opts))
    .map(([modelName, config]) => {
      const resolverEntries = Object.entries(config[type === "Query" ? "queries" : "mutations"]);

      return resolverEntries.map(([operationName, resolverObjectDefiner]) => {
        const resolverName = operationName + modelName;
        const isntPrismaFieldList = ["count", "deleteMany", "updateMany"];
        const isPrismaField = !isntPrismaFieldList.includes(operationName);

        const getFields = (t: any) => {
          const field = resolverObjectDefiner(t);
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
            : field;

          return {
            [resolverName]: isPrismaField
              ? t.prismaField(handledField)
              : t.field(handledField),
          }
        }

        return type === "Query"
          ? builder.queryFields((t) => getFields(t))
          : builder.mutationFields((t) => getFields(t));
      });
    });
}

export function generateAllObjects(opts?: CrudOptions) {
  return crudEntries
    .filter(([md]) => includeModel(md, opts))
    .map(([modelName, { Object }]) => {
      return builder.prismaObject(modelName as Model, Object); // Objects is all imports
    });
}

export function generateAllQueries(opts?: CrudOptions) {
  generateResolversByType("Query", opts);
}

export function generateAllMutations(opts?: CrudOptions) {
  generateResolversByType("Mutation", opts);
}

export function generateAllResolvers(opts?: CrudOptions) {
  generateResolversByType("Mutation", opts);
  generateResolversByType("Query", opts);
}

type CrudOptions = {
  include?: Model[];
  exclude?: Model[];
  /**
   * Caution: This is not type safe
   * Wrap all queries/mutations to override args, run extra code in resolve function (ie: throw errors, logs), apply plugins, etc.
   */
  handleResolver?: (props: {
    modelName: Model;
    field: any;
    operationName: string;
    resolverName: string;
    t: any;
    isPrismaField: boolean;
    type: ResolverType;
  }) => any;
};

const includeModel = (model: string, opts?: CrudOptions): boolean => {
  if (!opts) return true;
  if (opts.include) return opts.include.includes(model as Model);
  if (opts.exclude) return !opts.exclude.includes(model as Model);
  return true;
};

export function generateAllCrud(opts?: CrudOptions) {
  generateAllObjects(opts);
  generateAllQueries(opts);
  generateAllMutations(opts);
}
