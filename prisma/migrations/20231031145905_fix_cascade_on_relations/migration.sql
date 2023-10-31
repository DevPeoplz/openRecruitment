-- DropForeignKey
ALTER TABLE "CandidateCustomField" DROP CONSTRAINT "CandidateCustomField_candidateId_fkey";

-- DropForeignKey
ALTER TABLE "CandidateCustomField" DROP CONSTRAINT "CandidateCustomField_customFieldId_fkey";

-- DropForeignKey
ALTER TABLE "EventInterviewer" DROP CONSTRAINT "EventInterviewer_eventId_fkey";

-- DropForeignKey
ALTER TABLE "EventInterviewer" DROP CONSTRAINT "EventInterviewer_teamMemberId_fkey";

-- DropForeignKey
ALTER TABLE "Match" DROP CONSTRAINT "Match_candidateId_fkey";

-- DropForeignKey
ALTER TABLE "Match" DROP CONSTRAINT "Match_offerId_fkey";

-- DropForeignKey
ALTER TABLE "Stage" DROP CONSTRAINT "Stage_templateId_fkey";

-- DropForeignKey
ALTER TABLE "StageMetadata" DROP CONSTRAINT "StageMetadata_stageId_fkey";

-- DropForeignKey
ALTER TABLE "StageVisibility" DROP CONSTRAINT "StageVisibility_stageId_fkey";

-- DropForeignKey
ALTER TABLE "TalentPoolMatch" DROP CONSTRAINT "TalentPoolMatch_candidateId_fkey";

-- DropForeignKey
ALTER TABLE "TalentPoolMatch" DROP CONSTRAINT "TalentPoolMatch_talentPoolId_fkey";

-- AddForeignKey
ALTER TABLE "EventInterviewer" ADD CONSTRAINT "EventInterviewer_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventInterviewer" ADD CONSTRAINT "EventInterviewer_teamMemberId_fkey" FOREIGN KEY ("teamMemberId") REFERENCES "HiringRole"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "Offer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TalentPoolMatch" ADD CONSTRAINT "TalentPoolMatch_talentPoolId_fkey" FOREIGN KEY ("talentPoolId") REFERENCES "TalentPool"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TalentPoolMatch" ADD CONSTRAINT "TalentPoolMatch_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stage" ADD CONSTRAINT "Stage_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StageVisibility" ADD CONSTRAINT "StageVisibility_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "Stage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StageMetadata" ADD CONSTRAINT "StageMetadata_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "Stage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CandidateCustomField" ADD CONSTRAINT "CandidateCustomField_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CandidateCustomField" ADD CONSTRAINT "CandidateCustomField_customFieldId_fkey" FOREIGN KEY ("customFieldId") REFERENCES "CustomField"("id") ON DELETE CASCADE ON UPDATE CASCADE;
