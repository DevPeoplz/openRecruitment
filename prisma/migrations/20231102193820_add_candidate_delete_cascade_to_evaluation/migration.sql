-- DropForeignKey
ALTER TABLE "Evaluation" DROP CONSTRAINT "Evaluation_candidateId_fkey";

-- DropForeignKey
ALTER TABLE "Evaluation" DROP CONSTRAINT "Evaluation_teamMemberId_fkey";

-- AddForeignKey
ALTER TABLE "Evaluation" ADD CONSTRAINT "Evaluation_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evaluation" ADD CONSTRAINT "Evaluation_teamMemberId_fkey" FOREIGN KEY ("teamMemberId") REFERENCES "HiringRole"("id") ON DELETE CASCADE ON UPDATE CASCADE;
