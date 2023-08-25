-- CreateEnum
CREATE TYPE "UserRoles" AS ENUM ('SUPERADMIN', 'DEFAULT');

-- CreateEnum
CREATE TYPE "OfferPersonalItems" AS ENUM ('REQUIRED', 'OPTIONAL', 'NONE');

-- CreateEnum
CREATE TYPE "MembershipTypes" AS ENUM ('MEMBER', 'ROLE');

-- CreateEnum
CREATE TYPE "TemplateTypes" AS ENUM ('SCREENING_QUESTIONS', 'PIPELINE', 'AUTOCONFIRMATION_EMAIL', 'EVALUATION');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "password" TEXT,
    "phone" TEXT,
    "firstName" TEXT,
    "lastName" TEXT,
    "preferredLanguage" TEXT DEFAULT 'en',
    "timeformat24" BOOLEAN NOT NULL DEFAULT false,
    "timezone" TEXT NOT NULL DEFAULT 'UTC',
    "weekStartDate" TEXT NOT NULL DEFAULT 'monday',
    "photoId" INTEGER,
    "featureDiscovery" TEXT[],
    "emailProviders" TEXT[],
    "theme" TEXT,
    "notifications" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userRole" "UserRoles" NOT NULL DEFAULT 'DEFAULT',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Attachment" (
    "id" SERIAL NOT NULL,
    "contentType" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "uploaderId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Attachment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HiringRole" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "roleId" INTEGER NOT NULL,
    "companyId" TEXT NOT NULL,
    "extraAbilities" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HiringRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "abilities" TEXT[],
    "companyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "address" TEXT,
    "city" TEXT,
    "state" TEXT,
    "country" TEXT,
    "companyInbox" TEXT,
    "subdomain" TEXT,
    "gdprEnable" BOOLEAN,
    "gdprRetention" INTEGER,
    "gdprPrivacyPolicyLink" TEXT,
    "gdprEmailFooter" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubscriptionData" (
    "id" SERIAL NOT NULL,
    "active" BOOLEAN NOT NULL,
    "currentPeriodStart" TIMESTAMP(3) NOT NULL,
    "currentPeriodEnd" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,

    CONSTRAINT "SubscriptionData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanyMetadata" (
    "id" SERIAL NOT NULL,
    "companyId" TEXT NOT NULL,
    "metaKey" TEXT NOT NULL,
    "metaValue" TEXT NOT NULL,

    CONSTRAINT "CompanyMetadata_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Department" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DisqualifyReason" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "action" JSONB NOT NULL,
    "companyId" TEXT NOT NULL,

    CONSTRAINT "DisqualifyReason_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TagSource" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,

    CONSTRAINT "TagSource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" SERIAL NOT NULL,
    "companyId" TEXT NOT NULL,
    "userId" INTEGER,
    "offerId" INTEGER,
    "candidateId" INTEGER,
    "actor" TEXT NOT NULL,
    "actorType" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "eventDetails" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MeetingRoom" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,

    CONSTRAINT "MeetingRoom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventSchedule" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "dateRange" INTEGER NOT NULL,
    "expiresAfter" INTEGER NOT NULL,
    "inviteAll" BOOLEAN NOT NULL,
    "bufferTime" INTEGER NOT NULL,
    "ignoreDayEvents" BOOLEAN NOT NULL,
    "meetingLimit" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,
    "Interval" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "timezone" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "privateNote" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,

    CONSTRAINT "EventSchedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventScheduleInterviewer" (
    "id" SERIAL NOT NULL,
    "eventScheduleId" INTEGER NOT NULL,
    "teamMemberId" INTEGER NOT NULL,
    "availability" JSONB NOT NULL,

    CONSTRAINT "EventScheduleInterviewer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventScheduleEvaluation" (
    "id" SERIAL NOT NULL,
    "eventScheduleId" INTEGER NOT NULL,
    "evaluationId" INTEGER NOT NULL,

    CONSTRAINT "EventScheduleEvaluation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "time" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "privateNote" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventInterviewer" (
    "id" SERIAL NOT NULL,
    "eventId" INTEGER NOT NULL,
    "teamMemberId" INTEGER NOT NULL,

    CONSTRAINT "EventInterviewer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventEvaluation" (
    "id" SERIAL NOT NULL,
    "eventId" INTEGER NOT NULL,
    "evaluationId" INTEGER NOT NULL,

    CONSTRAINT "EventEvaluation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Offer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "deparmentId" INTEGER,
    "recruiterId" INTEGER,
    "hiringManagerId" INTEGER,
    "description" TEXT NOT NULL,
    "requirements" TEXT NOT NULL,
    "locationCountry" TEXT NOT NULL,
    "locationState" TEXT NOT NULL,
    "locationCity" TEXT NOT NULL,
    "locationStreet" TEXT NOT NULL,
    "zipcode" TEXT NOT NULL,
    "remote" BOOLEAN NOT NULL,
    "jobType" TEXT NOT NULL,
    "jobCategory" TEXT NOT NULL,
    "jobReqEducation" TEXT NOT NULL,
    "jobReqExperience" TEXT NOT NULL,
    "jobHoursMin" INTEGER NOT NULL,
    "jobHoursMax" INTEGER NOT NULL,
    "jobSalaryMin" INTEGER NOT NULL,
    "jobSalaryMax" INTEGER NOT NULL,
    "jobSalaryPeriod" TEXT NOT NULL,
    "jobSalaryCurrency" TEXT NOT NULL,
    "personalInfoCv" "OfferPersonalItems" NOT NULL,
    "personalInfoCoverLetter" "OfferPersonalItems" NOT NULL,
    "personalInfoPhoto" "OfferPersonalItems" NOT NULL,
    "personalInfoPhone" "OfferPersonalItems" NOT NULL,
    "screeningQuestionsTemplateId" INTEGER NOT NULL,
    "pipelineTemplateId" INTEGER NOT NULL,
    "autoConfirmationEmailId" INTEGER NOT NULL,
    "isPublished" BOOLEAN NOT NULL,

    CONSTRAINT "Offer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OfferFile" (
    "id" SERIAL NOT NULL,
    "offerId" INTEGER NOT NULL,
    "attachmentId" INTEGER NOT NULL,

    CONSTRAINT "OfferFile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Match" (
    "id" SERIAL NOT NULL,
    "offerId" INTEGER NOT NULL,
    "candidateId" INTEGER NOT NULL,
    "stageId" INTEGER,
    "isHired" BOOLEAN NOT NULL,
    "disqualifyReasonId" INTEGER,

    CONSTRAINT "Match_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OfferTag" (
    "id" SERIAL NOT NULL,
    "offerId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,

    CONSTRAINT "OfferTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Membership" (
    "id" SERIAL NOT NULL,
    "type" "MembershipTypes" NOT NULL,
    "teamMemberId" INTEGER,
    "roleId" INTEGER,
    "offerId" INTEGER NOT NULL,

    CONSTRAINT "Membership_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TalentPool" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "TalentPool_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TalentPoolFile" (
    "id" SERIAL NOT NULL,
    "talentPoolId" INTEGER NOT NULL,
    "attachmentId" INTEGER NOT NULL,

    CONSTRAINT "TalentPoolFile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TalentPoolMatch" (
    "id" SERIAL NOT NULL,
    "talentPoolId" INTEGER NOT NULL,
    "candidateId" INTEGER NOT NULL,

    CONSTRAINT "TalentPoolMatch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Template" (
    "id" SERIAL NOT NULL,
    "companyId" TEXT NOT NULL,
    "isCompanyWide" BOOLEAN NOT NULL,
    "type" "TemplateTypes" NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "Template_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stage" (
    "id" SERIAL NOT NULL,
    "position" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "inputType" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "templateId" INTEGER NOT NULL,
    "isProtected" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Stage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StageVisibility" (
    "id" SERIAL NOT NULL,
    "type" "MembershipTypes" NOT NULL,
    "teamMemberId" INTEGER,
    "roleId" INTEGER,
    "stageId" INTEGER NOT NULL,

    CONSTRAINT "StageVisibility_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StageMetadata" (
    "id" SERIAL NOT NULL,
    "metaKey" TEXT NOT NULL,
    "metaValue" TEXT NOT NULL,
    "stageId" INTEGER NOT NULL,

    CONSTRAINT "StageMetadata_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Candidate" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "initials" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "skills" TEXT[],
    "mainLanguage" TEXT NOT NULL,
    "languages" TEXT[],
    "coverLetter" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "referrerId" INTEGER NOT NULL,
    "cvId" INTEGER,
    "educationLevel" TEXT NOT NULL,
    "socials" TEXT[],
    "links" TEXT[],
    "salaryExpectation" TEXT NOT NULL,
    "isHired" BOOLEAN NOT NULL,
    "hiredAtId" INTEGER,
    "hiredById" INTEGER,

    CONSTRAINT "Candidate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CandidateTag" (
    "id" SERIAL NOT NULL,
    "candidateId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,

    CONSTRAINT "CandidateTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CandidateCustomFields" (
    "id" SERIAL NOT NULL,
    "candidateId" INTEGER NOT NULL,
    "inputType" TEXT NOT NULL,
    "fieldKey" TEXT NOT NULL,
    "fieldValue" TEXT NOT NULL,
    "fieldSettings" JSONB NOT NULL,

    CONSTRAINT "CandidateCustomFields_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Evaluation" (
    "id" SERIAL NOT NULL,
    "templateId" INTEGER NOT NULL,
    "offerId" INTEGER,
    "candidateId" INTEGER NOT NULL,
    "teamMemberId" INTEGER NOT NULL,
    "note" TEXT NOT NULL,
    "isQuickEval" BOOLEAN NOT NULL DEFAULT false,
    "score" INTEGER NOT NULL,

    CONSTRAINT "Evaluation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EvaluationAnswer" (
    "id" SERIAL NOT NULL,
    "evaluationId" INTEGER NOT NULL,
    "answerId" INTEGER NOT NULL,

    CONSTRAINT "EvaluationAnswer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SharedCandidateLink" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "visibleSections" TEXT[],
    "editModelSections" TEXT[],
    "link" TEXT NOT NULL,
    "expiration" TIMESTAMP(3) NOT NULL,
    "candidateId" INTEGER NOT NULL,

    CONSTRAINT "SharedCandidateLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "companyId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "note" TEXT NOT NULL,
    "candidateId" INTEGER,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaskMember" (
    "id" SERIAL NOT NULL,
    "taskId" INTEGER NOT NULL,
    "teamMemberId" INTEGER NOT NULL,

    CONSTRAINT "TaskMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Follow" (
    "id" SERIAL NOT NULL,
    "offerId" INTEGER,
    "candidateId" INTEGER,
    "talentPoolId" INTEGER,
    "teamMemberId" INTEGER NOT NULL,

    CONSTRAINT "Follow_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_photoId_key" ON "User"("photoId");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "HiringRole_userId_companyId_key" ON "HiringRole"("userId", "companyId");

-- CreateIndex
CREATE UNIQUE INDEX "SubscriptionData_companyId_key" ON "SubscriptionData"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "Offer_recruiterId_key" ON "Offer"("recruiterId");

-- CreateIndex
CREATE UNIQUE INDEX "Offer_hiringManagerId_key" ON "Offer"("hiringManagerId");

-- CreateIndex
CREATE UNIQUE INDEX "Offer_screeningQuestionsTemplateId_key" ON "Offer"("screeningQuestionsTemplateId");

-- CreateIndex
CREATE UNIQUE INDEX "Offer_pipelineTemplateId_key" ON "Offer"("pipelineTemplateId");

-- CreateIndex
CREATE UNIQUE INDEX "Offer_autoConfirmationEmailId_key" ON "Offer"("autoConfirmationEmailId");

-- CreateIndex
CREATE UNIQUE INDEX "Candidate_email_key" ON "Candidate"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Candidate_referrerId_key" ON "Candidate"("referrerId");

-- CreateIndex
CREATE UNIQUE INDEX "Candidate_cvId_key" ON "Candidate"("cvId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_photoId_fkey" FOREIGN KEY ("photoId") REFERENCES "Attachment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_uploaderId_fkey" FOREIGN KEY ("uploaderId") REFERENCES "HiringRole"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HiringRole" ADD CONSTRAINT "HiringRole_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HiringRole" ADD CONSTRAINT "HiringRole_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HiringRole" ADD CONSTRAINT "HiringRole_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Role" ADD CONSTRAINT "Role_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubscriptionData" ADD CONSTRAINT "SubscriptionData_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyMetadata" ADD CONSTRAINT "CompanyMetadata_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Department" ADD CONSTRAINT "Department_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisqualifyReason" ADD CONSTRAINT "DisqualifyReason_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagSource" ADD CONSTRAINT "TagSource_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "HiringRole"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "Offer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MeetingRoom" ADD CONSTRAINT "MeetingRoom_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventSchedule" ADD CONSTRAINT "EventSchedule_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventScheduleInterviewer" ADD CONSTRAINT "EventScheduleInterviewer_eventScheduleId_fkey" FOREIGN KEY ("eventScheduleId") REFERENCES "EventSchedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventScheduleInterviewer" ADD CONSTRAINT "EventScheduleInterviewer_teamMemberId_fkey" FOREIGN KEY ("teamMemberId") REFERENCES "HiringRole"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventScheduleEvaluation" ADD CONSTRAINT "EventScheduleEvaluation_eventScheduleId_fkey" FOREIGN KEY ("eventScheduleId") REFERENCES "EventSchedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventScheduleEvaluation" ADD CONSTRAINT "EventScheduleEvaluation_evaluationId_fkey" FOREIGN KEY ("evaluationId") REFERENCES "Evaluation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventInterviewer" ADD CONSTRAINT "EventInterviewer_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventInterviewer" ADD CONSTRAINT "EventInterviewer_teamMemberId_fkey" FOREIGN KEY ("teamMemberId") REFERENCES "HiringRole"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventEvaluation" ADD CONSTRAINT "EventEvaluation_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventEvaluation" ADD CONSTRAINT "EventEvaluation_evaluationId_fkey" FOREIGN KEY ("evaluationId") REFERENCES "Evaluation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_deparmentId_fkey" FOREIGN KEY ("deparmentId") REFERENCES "Department"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_recruiterId_fkey" FOREIGN KEY ("recruiterId") REFERENCES "HiringRole"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_hiringManagerId_fkey" FOREIGN KEY ("hiringManagerId") REFERENCES "HiringRole"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_screeningQuestionsTemplateId_fkey" FOREIGN KEY ("screeningQuestionsTemplateId") REFERENCES "Template"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_pipelineTemplateId_fkey" FOREIGN KEY ("pipelineTemplateId") REFERENCES "Template"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_autoConfirmationEmailId_fkey" FOREIGN KEY ("autoConfirmationEmailId") REFERENCES "Template"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfferFile" ADD CONSTRAINT "OfferFile_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "Offer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfferFile" ADD CONSTRAINT "OfferFile_attachmentId_fkey" FOREIGN KEY ("attachmentId") REFERENCES "Attachment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "Offer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "Stage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_disqualifyReasonId_fkey" FOREIGN KEY ("disqualifyReasonId") REFERENCES "DisqualifyReason"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfferTag" ADD CONSTRAINT "OfferTag_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "Offer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfferTag" ADD CONSTRAINT "OfferTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "TagSource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Membership" ADD CONSTRAINT "Membership_teamMemberId_fkey" FOREIGN KEY ("teamMemberId") REFERENCES "HiringRole"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Membership" ADD CONSTRAINT "Membership_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Membership" ADD CONSTRAINT "Membership_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "Offer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TalentPoolFile" ADD CONSTRAINT "TalentPoolFile_talentPoolId_fkey" FOREIGN KEY ("talentPoolId") REFERENCES "TalentPool"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TalentPoolFile" ADD CONSTRAINT "TalentPoolFile_attachmentId_fkey" FOREIGN KEY ("attachmentId") REFERENCES "Attachment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TalentPoolMatch" ADD CONSTRAINT "TalentPoolMatch_talentPoolId_fkey" FOREIGN KEY ("talentPoolId") REFERENCES "TalentPool"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TalentPoolMatch" ADD CONSTRAINT "TalentPoolMatch_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Template" ADD CONSTRAINT "Template_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stage" ADD CONSTRAINT "Stage_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StageVisibility" ADD CONSTRAINT "StageVisibility_teamMemberId_fkey" FOREIGN KEY ("teamMemberId") REFERENCES "HiringRole"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StageVisibility" ADD CONSTRAINT "StageVisibility_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StageVisibility" ADD CONSTRAINT "StageVisibility_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "Stage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StageMetadata" ADD CONSTRAINT "StageMetadata_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "Stage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Candidate" ADD CONSTRAINT "Candidate_referrerId_fkey" FOREIGN KEY ("referrerId") REFERENCES "TagSource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Candidate" ADD CONSTRAINT "Candidate_cvId_fkey" FOREIGN KEY ("cvId") REFERENCES "Attachment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Candidate" ADD CONSTRAINT "Candidate_hiredAtId_fkey" FOREIGN KEY ("hiredAtId") REFERENCES "Offer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Candidate" ADD CONSTRAINT "Candidate_hiredById_fkey" FOREIGN KEY ("hiredById") REFERENCES "HiringRole"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CandidateTag" ADD CONSTRAINT "CandidateTag_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CandidateTag" ADD CONSTRAINT "CandidateTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "TagSource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CandidateCustomFields" ADD CONSTRAINT "CandidateCustomFields_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evaluation" ADD CONSTRAINT "Evaluation_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evaluation" ADD CONSTRAINT "Evaluation_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "Offer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evaluation" ADD CONSTRAINT "Evaluation_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evaluation" ADD CONSTRAINT "Evaluation_teamMemberId_fkey" FOREIGN KEY ("teamMemberId") REFERENCES "HiringRole"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvaluationAnswer" ADD CONSTRAINT "EvaluationAnswer_evaluationId_fkey" FOREIGN KEY ("evaluationId") REFERENCES "Evaluation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvaluationAnswer" ADD CONSTRAINT "EvaluationAnswer_answerId_fkey" FOREIGN KEY ("answerId") REFERENCES "CandidateCustomFields"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SharedCandidateLink" ADD CONSTRAINT "SharedCandidateLink_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskMember" ADD CONSTRAINT "TaskMember_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskMember" ADD CONSTRAINT "TaskMember_teamMemberId_fkey" FOREIGN KEY ("teamMemberId") REFERENCES "HiringRole"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "Offer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_talentPoolId_fkey" FOREIGN KEY ("talentPoolId") REFERENCES "TalentPool"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_teamMemberId_fkey" FOREIGN KEY ("teamMemberId") REFERENCES "HiringRole"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
