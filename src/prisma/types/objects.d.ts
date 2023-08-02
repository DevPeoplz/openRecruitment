/* eslint-disable */
import type {
  Prisma,
  User,
  Account,
  Session,
  VerificationToken,
  Attachment,
  HiringRole,
  Role,
  Company,
  SubscriptionData,
  CompanyMetadata,
  Department,
  DisqualifyReason,
  TagSource,
  AuditLog,
  MeetingRoom,
  EventSchedule,
  EventScheduleInterviewer,
  EventScheduleEvaluation,
  Event,
  EventInterviewer,
  EventEvaluation,
  Offer,
  OfferFile,
  Match,
  OfferTag,
  Membership,
  TalentPool,
  TalentPoolFile,
  TalentPoolMatch,
  Template,
  Stage,
  StageVisibility,
  StageMetadata,
  Candidate,
  CandidateTag,
  CandidateCustomFields,
  Evaluation,
  EvaluationAnswer,
  SharedCandidateLink,
  Task,
  TaskMember,
  Follow,
} from '.prisma/client'
export default interface PrismaTypes {
  User: {
    Name: 'User'
    Shape: User
    Include: Prisma.UserInclude
    Select: Prisma.UserSelect
    OrderBy: Prisma.UserOrderByWithRelationInput
    WhereUnique: Prisma.UserWhereUniqueInput
    Where: Prisma.UserWhereInput
    Create: {}
    Update: {}
    RelationName: 'photo' | 'accounts' | 'sessions' | 'hiringRole' | 'companies'
    ListRelations: 'accounts' | 'sessions' | 'hiringRole' | 'companies'
    Relations: {
      photo: {
        Shape: Attachment | null
        Name: 'Attachment'
      }
      accounts: {
        Shape: Account[]
        Name: 'Account'
      }
      sessions: {
        Shape: Session[]
        Name: 'Session'
      }
      hiringRole: {
        Shape: HiringRole[]
        Name: 'HiringRole'
      }
      companies: {
        Shape: Company[]
        Name: 'Company'
      }
    }
  }
  Account: {
    Name: 'Account'
    Shape: Account
    Include: Prisma.AccountInclude
    Select: Prisma.AccountSelect
    OrderBy: Prisma.AccountOrderByWithRelationInput
    WhereUnique: Prisma.AccountWhereUniqueInput
    Where: Prisma.AccountWhereInput
    Create: {}
    Update: {}
    RelationName: 'user'
    ListRelations: never
    Relations: {
      user: {
        Shape: User
        Name: 'User'
      }
    }
  }
  Session: {
    Name: 'Session'
    Shape: Session
    Include: Prisma.SessionInclude
    Select: Prisma.SessionSelect
    OrderBy: Prisma.SessionOrderByWithRelationInput
    WhereUnique: Prisma.SessionWhereUniqueInput
    Where: Prisma.SessionWhereInput
    Create: {}
    Update: {}
    RelationName: 'user'
    ListRelations: never
    Relations: {
      user: {
        Shape: User
        Name: 'User'
      }
    }
  }
  VerificationToken: {
    Name: 'VerificationToken'
    Shape: VerificationToken
    Include: never
    Select: Prisma.VerificationTokenSelect
    OrderBy: Prisma.VerificationTokenOrderByWithRelationInput
    WhereUnique: Prisma.VerificationTokenWhereUniqueInput
    Where: Prisma.VerificationTokenWhereInput
    Create: {}
    Update: {}
    RelationName: never
    ListRelations: never
    Relations: {}
  }
  Attachment: {
    Name: 'Attachment'
    Shape: Attachment
    Include: Prisma.AttachmentInclude
    Select: Prisma.AttachmentSelect
    OrderBy: Prisma.AttachmentOrderByWithRelationInput
    WhereUnique: Prisma.AttachmentWhereUniqueInput
    Where: Prisma.AttachmentWhereInput
    Create: {}
    Update: {}
    RelationName:
      | 'userProfilePhoto'
      | 'candidate'
      | 'uploader'
      | 'offerFiles'
      | 'talentPoolFiles'
    ListRelations: 'offerFiles' | 'talentPoolFiles'
    Relations: {
      userProfilePhoto: {
        Shape: User | null
        Name: 'User'
      }
      candidate: {
        Shape: Candidate | null
        Name: 'Candidate'
      }
      uploader: {
        Shape: HiringRole
        Name: 'HiringRole'
      }
      offerFiles: {
        Shape: OfferFile[]
        Name: 'OfferFile'
      }
      talentPoolFiles: {
        Shape: TalentPoolFile[]
        Name: 'TalentPoolFile'
      }
    }
  }
  HiringRole: {
    Name: 'HiringRole'
    Shape: HiringRole
    Include: Prisma.HiringRoleInclude
    Select: Prisma.HiringRoleSelect
    OrderBy: Prisma.HiringRoleOrderByWithRelationInput
    WhereUnique: Prisma.HiringRoleWhereUniqueInput
    Where: Prisma.HiringRoleWhereInput
    Create: {}
    Update: {}
    RelationName:
      | 'user'
      | 'role'
      | 'attachments'
      | 'auditLogs'
      | 'eventScheduleInterviewer'
      | 'eventInterviewer'
      | 'offerRecruiter'
      | 'offerHiringManager'
      | 'memberships'
      | 'stageVisibility'
      | 'hiredCandidates'
      | 'evaluations'
      | 'tasks'
      | 'follows'
    ListRelations:
      | 'attachments'
      | 'auditLogs'
      | 'eventScheduleInterviewer'
      | 'eventInterviewer'
      | 'memberships'
      | 'stageVisibility'
      | 'hiredCandidates'
      | 'evaluations'
      | 'tasks'
      | 'follows'
    Relations: {
      user: {
        Shape: User
        Name: 'User'
      }
      role: {
        Shape: Role
        Name: 'Role'
      }
      attachments: {
        Shape: Attachment[]
        Name: 'Attachment'
      }
      auditLogs: {
        Shape: AuditLog[]
        Name: 'AuditLog'
      }
      eventScheduleInterviewer: {
        Shape: EventScheduleInterviewer[]
        Name: 'EventScheduleInterviewer'
      }
      eventInterviewer: {
        Shape: EventInterviewer[]
        Name: 'EventInterviewer'
      }
      offerRecruiter: {
        Shape: Offer | null
        Name: 'Offer'
      }
      offerHiringManager: {
        Shape: Offer | null
        Name: 'Offer'
      }
      memberships: {
        Shape: Membership[]
        Name: 'Membership'
      }
      stageVisibility: {
        Shape: StageVisibility[]
        Name: 'StageVisibility'
      }
      hiredCandidates: {
        Shape: Candidate[]
        Name: 'Candidate'
      }
      evaluations: {
        Shape: Evaluation[]
        Name: 'Evaluation'
      }
      tasks: {
        Shape: TaskMember[]
        Name: 'TaskMember'
      }
      follows: {
        Shape: Follow[]
        Name: 'Follow'
      }
    }
  }
  Role: {
    Name: 'Role'
    Shape: Role
    Include: Prisma.RoleInclude
    Select: Prisma.RoleSelect
    OrderBy: Prisma.RoleOrderByWithRelationInput
    WhereUnique: Prisma.RoleWhereUniqueInput
    Where: Prisma.RoleWhereInput
    Create: {}
    Update: {}
    RelationName: 'company' | 'hiringRoles' | 'memberships' | 'stageVisibility'
    ListRelations: 'hiringRoles' | 'memberships' | 'stageVisibility'
    Relations: {
      company: {
        Shape: Company
        Name: 'Company'
      }
      hiringRoles: {
        Shape: HiringRole[]
        Name: 'HiringRole'
      }
      memberships: {
        Shape: Membership[]
        Name: 'Membership'
      }
      stageVisibility: {
        Shape: StageVisibility[]
        Name: 'StageVisibility'
      }
    }
  }
  Company: {
    Name: 'Company'
    Shape: Company
    Include: Prisma.CompanyInclude
    Select: Prisma.CompanySelect
    OrderBy: Prisma.CompanyOrderByWithRelationInput
    WhereUnique: Prisma.CompanyWhereUniqueInput
    Where: Prisma.CompanyWhereInput
    Create: {}
    Update: {}
    RelationName:
      | 'roles'
      | 'subscription'
      | 'meetingRooms'
      | 'metadata'
      | 'eventSchedule'
      | 'events'
      | 'departments'
      | 'disqualifyReasons'
      | 'tagSources'
      | 'auditLogs'
      | 'offers'
      | 'templates'
      | 'tasks'
      | 'owner'
    ListRelations:
      | 'roles'
      | 'meetingRooms'
      | 'metadata'
      | 'eventSchedule'
      | 'events'
      | 'departments'
      | 'disqualifyReasons'
      | 'tagSources'
      | 'auditLogs'
      | 'offers'
      | 'templates'
      | 'tasks'
    Relations: {
      roles: {
        Shape: Role[]
        Name: 'Role'
      }
      subscription: {
        Shape: SubscriptionData | null
        Name: 'SubscriptionData'
      }
      meetingRooms: {
        Shape: MeetingRoom[]
        Name: 'MeetingRoom'
      }
      metadata: {
        Shape: CompanyMetadata[]
        Name: 'CompanyMetadata'
      }
      eventSchedule: {
        Shape: EventSchedule[]
        Name: 'EventSchedule'
      }
      events: {
        Shape: Event[]
        Name: 'Event'
      }
      departments: {
        Shape: Department[]
        Name: 'Department'
      }
      disqualifyReasons: {
        Shape: DisqualifyReason[]
        Name: 'DisqualifyReason'
      }
      tagSources: {
        Shape: TagSource[]
        Name: 'TagSource'
      }
      auditLogs: {
        Shape: AuditLog[]
        Name: 'AuditLog'
      }
      offers: {
        Shape: Offer[]
        Name: 'Offer'
      }
      templates: {
        Shape: Template[]
        Name: 'Template'
      }
      tasks: {
        Shape: Task[]
        Name: 'Task'
      }
      owner: {
        Shape: User
        Name: 'User'
      }
    }
  }
  SubscriptionData: {
    Name: 'SubscriptionData'
    Shape: SubscriptionData
    Include: Prisma.SubscriptionDataInclude
    Select: Prisma.SubscriptionDataSelect
    OrderBy: Prisma.SubscriptionDataOrderByWithRelationInput
    WhereUnique: Prisma.SubscriptionDataWhereUniqueInput
    Where: Prisma.SubscriptionDataWhereInput
    Create: {}
    Update: {}
    RelationName: 'company'
    ListRelations: never
    Relations: {
      company: {
        Shape: Company
        Name: 'Company'
      }
    }
  }
  CompanyMetadata: {
    Name: 'CompanyMetadata'
    Shape: CompanyMetadata
    Include: Prisma.CompanyMetadataInclude
    Select: Prisma.CompanyMetadataSelect
    OrderBy: Prisma.CompanyMetadataOrderByWithRelationInput
    WhereUnique: Prisma.CompanyMetadataWhereUniqueInput
    Where: Prisma.CompanyMetadataWhereInput
    Create: {}
    Update: {}
    RelationName: 'company'
    ListRelations: never
    Relations: {
      company: {
        Shape: Company
        Name: 'Company'
      }
    }
  }
  Department: {
    Name: 'Department'
    Shape: Department
    Include: Prisma.DepartmentInclude
    Select: Prisma.DepartmentSelect
    OrderBy: Prisma.DepartmentOrderByWithRelationInput
    WhereUnique: Prisma.DepartmentWhereUniqueInput
    Where: Prisma.DepartmentWhereInput
    Create: {}
    Update: {}
    RelationName: 'company' | 'offers'
    ListRelations: 'offers'
    Relations: {
      company: {
        Shape: Company
        Name: 'Company'
      }
      offers: {
        Shape: Offer[]
        Name: 'Offer'
      }
    }
  }
  DisqualifyReason: {
    Name: 'DisqualifyReason'
    Shape: DisqualifyReason
    Include: Prisma.DisqualifyReasonInclude
    Select: Prisma.DisqualifyReasonSelect
    OrderBy: Prisma.DisqualifyReasonOrderByWithRelationInput
    WhereUnique: Prisma.DisqualifyReasonWhereUniqueInput
    Where: Prisma.DisqualifyReasonWhereInput
    Create: {}
    Update: {}
    RelationName: 'company' | 'matches'
    ListRelations: 'matches'
    Relations: {
      company: {
        Shape: Company
        Name: 'Company'
      }
      matches: {
        Shape: Match[]
        Name: 'Match'
      }
    }
  }
  TagSource: {
    Name: 'TagSource'
    Shape: TagSource
    Include: Prisma.TagSourceInclude
    Select: Prisma.TagSourceSelect
    OrderBy: Prisma.TagSourceOrderByWithRelationInput
    WhereUnique: Prisma.TagSourceWhereUniqueInput
    Where: Prisma.TagSourceWhereInput
    Create: {}
    Update: {}
    RelationName:
      | 'company'
      | 'offerTags'
      | 'candidateReferrer'
      | 'candidateTags'
    ListRelations: 'offerTags' | 'candidateTags'
    Relations: {
      company: {
        Shape: Company
        Name: 'Company'
      }
      offerTags: {
        Shape: OfferTag[]
        Name: 'OfferTag'
      }
      candidateReferrer: {
        Shape: Candidate | null
        Name: 'Candidate'
      }
      candidateTags: {
        Shape: CandidateTag[]
        Name: 'CandidateTag'
      }
    }
  }
  AuditLog: {
    Name: 'AuditLog'
    Shape: AuditLog
    Include: Prisma.AuditLogInclude
    Select: Prisma.AuditLogSelect
    OrderBy: Prisma.AuditLogOrderByWithRelationInput
    WhereUnique: Prisma.AuditLogWhereUniqueInput
    Where: Prisma.AuditLogWhereInput
    Create: {}
    Update: {}
    RelationName: 'company' | 'user' | 'offer' | 'candidate'
    ListRelations: never
    Relations: {
      company: {
        Shape: Company
        Name: 'Company'
      }
      user: {
        Shape: HiringRole | null
        Name: 'HiringRole'
      }
      offer: {
        Shape: Offer | null
        Name: 'Offer'
      }
      candidate: {
        Shape: Candidate | null
        Name: 'Candidate'
      }
    }
  }
  MeetingRoom: {
    Name: 'MeetingRoom'
    Shape: MeetingRoom
    Include: Prisma.MeetingRoomInclude
    Select: Prisma.MeetingRoomSelect
    OrderBy: Prisma.MeetingRoomOrderByWithRelationInput
    WhereUnique: Prisma.MeetingRoomWhereUniqueInput
    Where: Prisma.MeetingRoomWhereInput
    Create: {}
    Update: {}
    RelationName: 'company'
    ListRelations: never
    Relations: {
      company: {
        Shape: Company
        Name: 'Company'
      }
    }
  }
  EventSchedule: {
    Name: 'EventSchedule'
    Shape: EventSchedule
    Include: Prisma.EventScheduleInclude
    Select: Prisma.EventScheduleSelect
    OrderBy: Prisma.EventScheduleOrderByWithRelationInput
    WhereUnique: Prisma.EventScheduleWhereUniqueInput
    Where: Prisma.EventScheduleWhereInput
    Create: {}
    Update: {}
    RelationName:
      | 'company'
      | 'eventScheduleInterviewers'
      | 'eventScheduleEvaluations'
    ListRelations: 'eventScheduleInterviewers' | 'eventScheduleEvaluations'
    Relations: {
      company: {
        Shape: Company
        Name: 'Company'
      }
      eventScheduleInterviewers: {
        Shape: EventScheduleInterviewer[]
        Name: 'EventScheduleInterviewer'
      }
      eventScheduleEvaluations: {
        Shape: EventScheduleEvaluation[]
        Name: 'EventScheduleEvaluation'
      }
    }
  }
  EventScheduleInterviewer: {
    Name: 'EventScheduleInterviewer'
    Shape: EventScheduleInterviewer
    Include: Prisma.EventScheduleInterviewerInclude
    Select: Prisma.EventScheduleInterviewerSelect
    OrderBy: Prisma.EventScheduleInterviewerOrderByWithRelationInput
    WhereUnique: Prisma.EventScheduleInterviewerWhereUniqueInput
    Where: Prisma.EventScheduleInterviewerWhereInput
    Create: {}
    Update: {}
    RelationName: 'eventSchedule' | 'teamMember'
    ListRelations: never
    Relations: {
      eventSchedule: {
        Shape: EventSchedule
        Name: 'EventSchedule'
      }
      teamMember: {
        Shape: HiringRole
        Name: 'HiringRole'
      }
    }
  }
  EventScheduleEvaluation: {
    Name: 'EventScheduleEvaluation'
    Shape: EventScheduleEvaluation
    Include: Prisma.EventScheduleEvaluationInclude
    Select: Prisma.EventScheduleEvaluationSelect
    OrderBy: Prisma.EventScheduleEvaluationOrderByWithRelationInput
    WhereUnique: Prisma.EventScheduleEvaluationWhereUniqueInput
    Where: Prisma.EventScheduleEvaluationWhereInput
    Create: {}
    Update: {}
    RelationName: 'eventSchedule' | 'evaluation'
    ListRelations: never
    Relations: {
      eventSchedule: {
        Shape: EventSchedule
        Name: 'EventSchedule'
      }
      evaluation: {
        Shape: Evaluation
        Name: 'Evaluation'
      }
    }
  }
  Event: {
    Name: 'Event'
    Shape: Event
    Include: Prisma.EventInclude
    Select: Prisma.EventSelect
    OrderBy: Prisma.EventOrderByWithRelationInput
    WhereUnique: Prisma.EventWhereUniqueInput
    Where: Prisma.EventWhereInput
    Create: {}
    Update: {}
    RelationName: 'company' | 'eventInterviewers' | 'eventEvaluations'
    ListRelations: 'eventInterviewers' | 'eventEvaluations'
    Relations: {
      company: {
        Shape: Company
        Name: 'Company'
      }
      eventInterviewers: {
        Shape: EventInterviewer[]
        Name: 'EventInterviewer'
      }
      eventEvaluations: {
        Shape: EventEvaluation[]
        Name: 'EventEvaluation'
      }
    }
  }
  EventInterviewer: {
    Name: 'EventInterviewer'
    Shape: EventInterviewer
    Include: Prisma.EventInterviewerInclude
    Select: Prisma.EventInterviewerSelect
    OrderBy: Prisma.EventInterviewerOrderByWithRelationInput
    WhereUnique: Prisma.EventInterviewerWhereUniqueInput
    Where: Prisma.EventInterviewerWhereInput
    Create: {}
    Update: {}
    RelationName: 'event' | 'teamMember'
    ListRelations: never
    Relations: {
      event: {
        Shape: Event
        Name: 'Event'
      }
      teamMember: {
        Shape: HiringRole
        Name: 'HiringRole'
      }
    }
  }
  EventEvaluation: {
    Name: 'EventEvaluation'
    Shape: EventEvaluation
    Include: Prisma.EventEvaluationInclude
    Select: Prisma.EventEvaluationSelect
    OrderBy: Prisma.EventEvaluationOrderByWithRelationInput
    WhereUnique: Prisma.EventEvaluationWhereUniqueInput
    Where: Prisma.EventEvaluationWhereInput
    Create: {}
    Update: {}
    RelationName: 'event' | 'evaluation'
    ListRelations: never
    Relations: {
      event: {
        Shape: Event
        Name: 'Event'
      }
      evaluation: {
        Shape: Evaluation
        Name: 'Evaluation'
      }
    }
  }
  Offer: {
    Name: 'Offer'
    Shape: Offer
    Include: Prisma.OfferInclude
    Select: Prisma.OfferSelect
    OrderBy: Prisma.OfferOrderByWithRelationInput
    WhereUnique: Prisma.OfferWhereUniqueInput
    Where: Prisma.OfferWhereInput
    Create: {}
    Update: {}
    RelationName:
      | 'company'
      | 'deparment'
      | 'recruiter'
      | 'hiringManager'
      | 'screeningQuestionsTemplate'
      | 'pipelineTemplate'
      | 'autoConfirmationEmail'
      | 'auditLogs'
      | 'files'
      | 'offerTags'
      | 'memberships'
      | 'matches'
      | 'hired'
      | 'evaluations'
      | 'follows'
    ListRelations:
      | 'auditLogs'
      | 'files'
      | 'offerTags'
      | 'memberships'
      | 'matches'
      | 'hired'
      | 'evaluations'
      | 'follows'
    Relations: {
      company: {
        Shape: Company
        Name: 'Company'
      }
      deparment: {
        Shape: Department | null
        Name: 'Department'
      }
      recruiter: {
        Shape: HiringRole | null
        Name: 'HiringRole'
      }
      hiringManager: {
        Shape: HiringRole | null
        Name: 'HiringRole'
      }
      screeningQuestionsTemplate: {
        Shape: Template
        Name: 'Template'
      }
      pipelineTemplate: {
        Shape: Template
        Name: 'Template'
      }
      autoConfirmationEmail: {
        Shape: Template
        Name: 'Template'
      }
      auditLogs: {
        Shape: AuditLog[]
        Name: 'AuditLog'
      }
      files: {
        Shape: OfferFile[]
        Name: 'OfferFile'
      }
      offerTags: {
        Shape: OfferTag[]
        Name: 'OfferTag'
      }
      memberships: {
        Shape: Membership[]
        Name: 'Membership'
      }
      matches: {
        Shape: Match[]
        Name: 'Match'
      }
      hired: {
        Shape: Candidate[]
        Name: 'Candidate'
      }
      evaluations: {
        Shape: Evaluation[]
        Name: 'Evaluation'
      }
      follows: {
        Shape: Follow[]
        Name: 'Follow'
      }
    }
  }
  OfferFile: {
    Name: 'OfferFile'
    Shape: OfferFile
    Include: Prisma.OfferFileInclude
    Select: Prisma.OfferFileSelect
    OrderBy: Prisma.OfferFileOrderByWithRelationInput
    WhereUnique: Prisma.OfferFileWhereUniqueInput
    Where: Prisma.OfferFileWhereInput
    Create: {}
    Update: {}
    RelationName: 'offer' | 'attachment'
    ListRelations: never
    Relations: {
      offer: {
        Shape: Offer
        Name: 'Offer'
      }
      attachment: {
        Shape: Attachment
        Name: 'Attachment'
      }
    }
  }
  Match: {
    Name: 'Match'
    Shape: Match
    Include: Prisma.MatchInclude
    Select: Prisma.MatchSelect
    OrderBy: Prisma.MatchOrderByWithRelationInput
    WhereUnique: Prisma.MatchWhereUniqueInput
    Where: Prisma.MatchWhereInput
    Create: {}
    Update: {}
    RelationName: 'offer' | 'candidate' | 'stage' | 'disqualifyReason'
    ListRelations: never
    Relations: {
      offer: {
        Shape: Offer
        Name: 'Offer'
      }
      candidate: {
        Shape: Candidate
        Name: 'Candidate'
      }
      stage: {
        Shape: Stage | null
        Name: 'Stage'
      }
      disqualifyReason: {
        Shape: DisqualifyReason | null
        Name: 'DisqualifyReason'
      }
    }
  }
  OfferTag: {
    Name: 'OfferTag'
    Shape: OfferTag
    Include: Prisma.OfferTagInclude
    Select: Prisma.OfferTagSelect
    OrderBy: Prisma.OfferTagOrderByWithRelationInput
    WhereUnique: Prisma.OfferTagWhereUniqueInput
    Where: Prisma.OfferTagWhereInput
    Create: {}
    Update: {}
    RelationName: 'offer' | 'tag'
    ListRelations: never
    Relations: {
      offer: {
        Shape: Offer
        Name: 'Offer'
      }
      tag: {
        Shape: TagSource
        Name: 'TagSource'
      }
    }
  }
  Membership: {
    Name: 'Membership'
    Shape: Membership
    Include: Prisma.MembershipInclude
    Select: Prisma.MembershipSelect
    OrderBy: Prisma.MembershipOrderByWithRelationInput
    WhereUnique: Prisma.MembershipWhereUniqueInput
    Where: Prisma.MembershipWhereInput
    Create: {}
    Update: {}
    RelationName: 'teamMember' | 'role' | 'offer'
    ListRelations: never
    Relations: {
      teamMember: {
        Shape: HiringRole | null
        Name: 'HiringRole'
      }
      role: {
        Shape: Role | null
        Name: 'Role'
      }
      offer: {
        Shape: Offer
        Name: 'Offer'
      }
    }
  }
  TalentPool: {
    Name: 'TalentPool'
    Shape: TalentPool
    Include: Prisma.TalentPoolInclude
    Select: Prisma.TalentPoolSelect
    OrderBy: Prisma.TalentPoolOrderByWithRelationInput
    WhereUnique: Prisma.TalentPoolWhereUniqueInput
    Where: Prisma.TalentPoolWhereInput
    Create: {}
    Update: {}
    RelationName: 'files' | 'matches' | 'follows'
    ListRelations: 'files' | 'matches' | 'follows'
    Relations: {
      files: {
        Shape: TalentPoolFile[]
        Name: 'TalentPoolFile'
      }
      matches: {
        Shape: TalentPoolMatch[]
        Name: 'TalentPoolMatch'
      }
      follows: {
        Shape: Follow[]
        Name: 'Follow'
      }
    }
  }
  TalentPoolFile: {
    Name: 'TalentPoolFile'
    Shape: TalentPoolFile
    Include: Prisma.TalentPoolFileInclude
    Select: Prisma.TalentPoolFileSelect
    OrderBy: Prisma.TalentPoolFileOrderByWithRelationInput
    WhereUnique: Prisma.TalentPoolFileWhereUniqueInput
    Where: Prisma.TalentPoolFileWhereInput
    Create: {}
    Update: {}
    RelationName: 'talentPool' | 'attachment'
    ListRelations: never
    Relations: {
      talentPool: {
        Shape: TalentPool
        Name: 'TalentPool'
      }
      attachment: {
        Shape: Attachment
        Name: 'Attachment'
      }
    }
  }
  TalentPoolMatch: {
    Name: 'TalentPoolMatch'
    Shape: TalentPoolMatch
    Include: Prisma.TalentPoolMatchInclude
    Select: Prisma.TalentPoolMatchSelect
    OrderBy: Prisma.TalentPoolMatchOrderByWithRelationInput
    WhereUnique: Prisma.TalentPoolMatchWhereUniqueInput
    Where: Prisma.TalentPoolMatchWhereInput
    Create: {}
    Update: {}
    RelationName: 'talentPool' | 'candidate'
    ListRelations: never
    Relations: {
      talentPool: {
        Shape: TalentPool
        Name: 'TalentPool'
      }
      candidate: {
        Shape: Candidate
        Name: 'Candidate'
      }
    }
  }
  Template: {
    Name: 'Template'
    Shape: Template
    Include: Prisma.TemplateInclude
    Select: Prisma.TemplateSelect
    OrderBy: Prisma.TemplateOrderByWithRelationInput
    WhereUnique: Prisma.TemplateWhereUniqueInput
    Where: Prisma.TemplateWhereInput
    Create: {}
    Update: {}
    RelationName:
      | 'company'
      | 'screeningQuestionsTemplate'
      | 'pipelineTemplate'
      | 'autoConfirmationEmail'
      | 'stages'
      | 'evaluations'
    ListRelations: 'stages' | 'evaluations'
    Relations: {
      company: {
        Shape: Company
        Name: 'Company'
      }
      screeningQuestionsTemplate: {
        Shape: Offer | null
        Name: 'Offer'
      }
      pipelineTemplate: {
        Shape: Offer | null
        Name: 'Offer'
      }
      autoConfirmationEmail: {
        Shape: Offer | null
        Name: 'Offer'
      }
      stages: {
        Shape: Stage[]
        Name: 'Stage'
      }
      evaluations: {
        Shape: Evaluation[]
        Name: 'Evaluation'
      }
    }
  }
  Stage: {
    Name: 'Stage'
    Shape: Stage
    Include: Prisma.StageInclude
    Select: Prisma.StageSelect
    OrderBy: Prisma.StageOrderByWithRelationInput
    WhereUnique: Prisma.StageWhereUniqueInput
    Where: Prisma.StageWhereInput
    Create: {}
    Update: {}
    RelationName: 'template' | 'matches' | 'visibility' | 'metadata'
    ListRelations: 'matches' | 'visibility' | 'metadata'
    Relations: {
      template: {
        Shape: Template
        Name: 'Template'
      }
      matches: {
        Shape: Match[]
        Name: 'Match'
      }
      visibility: {
        Shape: StageVisibility[]
        Name: 'StageVisibility'
      }
      metadata: {
        Shape: StageMetadata[]
        Name: 'StageMetadata'
      }
    }
  }
  StageVisibility: {
    Name: 'StageVisibility'
    Shape: StageVisibility
    Include: Prisma.StageVisibilityInclude
    Select: Prisma.StageVisibilitySelect
    OrderBy: Prisma.StageVisibilityOrderByWithRelationInput
    WhereUnique: Prisma.StageVisibilityWhereUniqueInput
    Where: Prisma.StageVisibilityWhereInput
    Create: {}
    Update: {}
    RelationName: 'teamMember' | 'role' | 'stage'
    ListRelations: never
    Relations: {
      teamMember: {
        Shape: HiringRole | null
        Name: 'HiringRole'
      }
      role: {
        Shape: Role | null
        Name: 'Role'
      }
      stage: {
        Shape: Stage
        Name: 'Stage'
      }
    }
  }
  StageMetadata: {
    Name: 'StageMetadata'
    Shape: StageMetadata
    Include: Prisma.StageMetadataInclude
    Select: Prisma.StageMetadataSelect
    OrderBy: Prisma.StageMetadataOrderByWithRelationInput
    WhereUnique: Prisma.StageMetadataWhereUniqueInput
    Where: Prisma.StageMetadataWhereInput
    Create: {}
    Update: {}
    RelationName: 'stage'
    ListRelations: never
    Relations: {
      stage: {
        Shape: Stage
        Name: 'Stage'
      }
    }
  }
  Candidate: {
    Name: 'Candidate'
    Shape: Candidate
    Include: Prisma.CandidateInclude
    Select: Prisma.CandidateSelect
    OrderBy: Prisma.CandidateOrderByWithRelationInput
    WhereUnique: Prisma.CandidateWhereUniqueInput
    Where: Prisma.CandidateWhereInput
    Create: {}
    Update: {}
    RelationName:
      | 'referrer'
      | 'cv'
      | 'hiredAt'
      | 'hiredBy'
      | 'auditLogs'
      | 'offers'
      | 'talentPools'
      | 'candidateTags'
      | 'customFields'
      | 'evaluation'
      | 'tasks'
      | 'follows'
      | 'SharedCandidateLink'
    ListRelations:
      | 'auditLogs'
      | 'offers'
      | 'talentPools'
      | 'candidateTags'
      | 'customFields'
      | 'evaluation'
      | 'tasks'
      | 'follows'
      | 'SharedCandidateLink'
    Relations: {
      referrer: {
        Shape: TagSource
        Name: 'TagSource'
      }
      cv: {
        Shape: Attachment | null
        Name: 'Attachment'
      }
      hiredAt: {
        Shape: Offer | null
        Name: 'Offer'
      }
      hiredBy: {
        Shape: HiringRole | null
        Name: 'HiringRole'
      }
      auditLogs: {
        Shape: AuditLog[]
        Name: 'AuditLog'
      }
      offers: {
        Shape: Match[]
        Name: 'Match'
      }
      talentPools: {
        Shape: TalentPoolMatch[]
        Name: 'TalentPoolMatch'
      }
      candidateTags: {
        Shape: CandidateTag[]
        Name: 'CandidateTag'
      }
      customFields: {
        Shape: CandidateCustomFields[]
        Name: 'CandidateCustomFields'
      }
      evaluation: {
        Shape: Evaluation[]
        Name: 'Evaluation'
      }
      tasks: {
        Shape: Task[]
        Name: 'Task'
      }
      follows: {
        Shape: Follow[]
        Name: 'Follow'
      }
      SharedCandidateLink: {
        Shape: SharedCandidateLink[]
        Name: 'SharedCandidateLink'
      }
    }
  }
  CandidateTag: {
    Name: 'CandidateTag'
    Shape: CandidateTag
    Include: Prisma.CandidateTagInclude
    Select: Prisma.CandidateTagSelect
    OrderBy: Prisma.CandidateTagOrderByWithRelationInput
    WhereUnique: Prisma.CandidateTagWhereUniqueInput
    Where: Prisma.CandidateTagWhereInput
    Create: {}
    Update: {}
    RelationName: 'candidate' | 'tag'
    ListRelations: never
    Relations: {
      candidate: {
        Shape: Candidate
        Name: 'Candidate'
      }
      tag: {
        Shape: TagSource
        Name: 'TagSource'
      }
    }
  }
  CandidateCustomFields: {
    Name: 'CandidateCustomFields'
    Shape: CandidateCustomFields
    Include: Prisma.CandidateCustomFieldsInclude
    Select: Prisma.CandidateCustomFieldsSelect
    OrderBy: Prisma.CandidateCustomFieldsOrderByWithRelationInput
    WhereUnique: Prisma.CandidateCustomFieldsWhereUniqueInput
    Where: Prisma.CandidateCustomFieldsWhereInput
    Create: {}
    Update: {}
    RelationName: 'candidate' | 'evaluationAnswers'
    ListRelations: 'evaluationAnswers'
    Relations: {
      candidate: {
        Shape: Candidate
        Name: 'Candidate'
      }
      evaluationAnswers: {
        Shape: EvaluationAnswer[]
        Name: 'EvaluationAnswer'
      }
    }
  }
  Evaluation: {
    Name: 'Evaluation'
    Shape: Evaluation
    Include: Prisma.EvaluationInclude
    Select: Prisma.EvaluationSelect
    OrderBy: Prisma.EvaluationOrderByWithRelationInput
    WhereUnique: Prisma.EvaluationWhereUniqueInput
    Where: Prisma.EvaluationWhereInput
    Create: {}
    Update: {}
    RelationName:
      | 'template'
      | 'offer'
      | 'candidate'
      | 'teamMember'
      | 'eventScheduleEvaluations'
      | 'eventEvaluations'
      | 'answers'
    ListRelations: 'eventScheduleEvaluations' | 'eventEvaluations' | 'answers'
    Relations: {
      template: {
        Shape: Template
        Name: 'Template'
      }
      offer: {
        Shape: Offer | null
        Name: 'Offer'
      }
      candidate: {
        Shape: Candidate
        Name: 'Candidate'
      }
      teamMember: {
        Shape: HiringRole
        Name: 'HiringRole'
      }
      eventScheduleEvaluations: {
        Shape: EventScheduleEvaluation[]
        Name: 'EventScheduleEvaluation'
      }
      eventEvaluations: {
        Shape: EventEvaluation[]
        Name: 'EventEvaluation'
      }
      answers: {
        Shape: EvaluationAnswer[]
        Name: 'EvaluationAnswer'
      }
    }
  }
  EvaluationAnswer: {
    Name: 'EvaluationAnswer'
    Shape: EvaluationAnswer
    Include: Prisma.EvaluationAnswerInclude
    Select: Prisma.EvaluationAnswerSelect
    OrderBy: Prisma.EvaluationAnswerOrderByWithRelationInput
    WhereUnique: Prisma.EvaluationAnswerWhereUniqueInput
    Where: Prisma.EvaluationAnswerWhereInput
    Create: {}
    Update: {}
    RelationName: 'evaluation' | 'answer'
    ListRelations: never
    Relations: {
      evaluation: {
        Shape: Evaluation
        Name: 'Evaluation'
      }
      answer: {
        Shape: CandidateCustomFields
        Name: 'CandidateCustomFields'
      }
    }
  }
  SharedCandidateLink: {
    Name: 'SharedCandidateLink'
    Shape: SharedCandidateLink
    Include: Prisma.SharedCandidateLinkInclude
    Select: Prisma.SharedCandidateLinkSelect
    OrderBy: Prisma.SharedCandidateLinkOrderByWithRelationInput
    WhereUnique: Prisma.SharedCandidateLinkWhereUniqueInput
    Where: Prisma.SharedCandidateLinkWhereInput
    Create: {}
    Update: {}
    RelationName: 'candidate'
    ListRelations: never
    Relations: {
      candidate: {
        Shape: Candidate
        Name: 'Candidate'
      }
    }
  }
  Task: {
    Name: 'Task'
    Shape: Task
    Include: Prisma.TaskInclude
    Select: Prisma.TaskSelect
    OrderBy: Prisma.TaskOrderByWithRelationInput
    WhereUnique: Prisma.TaskWhereUniqueInput
    Where: Prisma.TaskWhereInput
    Create: {}
    Update: {}
    RelationName: 'company' | 'taskMembers' | 'Candidate'
    ListRelations: 'taskMembers'
    Relations: {
      company: {
        Shape: Company
        Name: 'Company'
      }
      taskMembers: {
        Shape: TaskMember[]
        Name: 'TaskMember'
      }
      Candidate: {
        Shape: Candidate | null
        Name: 'Candidate'
      }
    }
  }
  TaskMember: {
    Name: 'TaskMember'
    Shape: TaskMember
    Include: Prisma.TaskMemberInclude
    Select: Prisma.TaskMemberSelect
    OrderBy: Prisma.TaskMemberOrderByWithRelationInput
    WhereUnique: Prisma.TaskMemberWhereUniqueInput
    Where: Prisma.TaskMemberWhereInput
    Create: {}
    Update: {}
    RelationName: 'task' | 'teamMember'
    ListRelations: never
    Relations: {
      task: {
        Shape: Task
        Name: 'Task'
      }
      teamMember: {
        Shape: HiringRole
        Name: 'HiringRole'
      }
    }
  }
  Follow: {
    Name: 'Follow'
    Shape: Follow
    Include: Prisma.FollowInclude
    Select: Prisma.FollowSelect
    OrderBy: Prisma.FollowOrderByWithRelationInput
    WhereUnique: Prisma.FollowWhereUniqueInput
    Where: Prisma.FollowWhereInput
    Create: {}
    Update: {}
    RelationName: 'offer' | 'candidate' | 'talentPool' | 'teamMember'
    ListRelations: never
    Relations: {
      offer: {
        Shape: Offer | null
        Name: 'Offer'
      }
      candidate: {
        Shape: Candidate | null
        Name: 'Candidate'
      }
      talentPool: {
        Shape: TalentPool | null
        Name: 'TalentPool'
      }
      teamMember: {
        Shape: HiringRole
        Name: 'HiringRole'
      }
    }
  }
}
