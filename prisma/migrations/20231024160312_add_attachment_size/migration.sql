/*
  Warnings:

  - You are about to drop the column `isHired` on the `Candidate` table. All the data in the column will be lost.
  - You are about to drop the column `fieldSettings` on the `CandidateCustomFields` table. All the data in the column will be lost.
  - You are about to drop the column `note` on the `Evaluation` table. All the data in the column will be lost.
  - You are about to drop the `EvaluationAnswer` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[candidateId,fieldKey]` on the table `CandidateCustomFields` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `score` on the `Evaluation` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "SCORE_TYPES" AS ENUM ('APPROVED', 'NEUTRAL', 'REJECTED');

-- DropForeignKey
ALTER TABLE "Evaluation" DROP CONSTRAINT "Evaluation_templateId_fkey";

-- DropForeignKey
ALTER TABLE "EvaluationAnswer" DROP CONSTRAINT "EvaluationAnswer_answerId_fkey";

-- DropForeignKey
ALTER TABLE "EvaluationAnswer" DROP CONSTRAINT "EvaluationAnswer_evaluationId_fkey";

-- AlterTable
ALTER TABLE "Attachment" ADD COLUMN     "size" INTEGER;

-- AlterTable
ALTER TABLE "Candidate" DROP COLUMN "isHired";

-- AlterTable
ALTER TABLE "CandidateCustomFields" DROP COLUMN "fieldSettings";

-- AlterTable
ALTER TABLE "Evaluation" DROP COLUMN "note",
ALTER COLUMN "templateId" DROP NOT NULL,
DROP COLUMN "score",
ADD COLUMN     "score" "SCORE_TYPES" NOT NULL;

-- DropTable
DROP TABLE "EvaluationAnswer";

-- CreateTable
CREATE TABLE "EvaluationQuestion" (
    "id" SERIAL NOT NULL,
    "evaluationId" INTEGER NOT NULL,
    "inputType" TEXT NOT NULL,
    "settings" JSONB,
    "question" TEXT,
    "answer" TEXT NOT NULL,

    CONSTRAINT "EvaluationQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CandidateCustomFields_candidateId_fieldKey_key" ON "CandidateCustomFields"("candidateId", "fieldKey");

-- AddForeignKey
ALTER TABLE "Evaluation" ADD CONSTRAINT "Evaluation_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvaluationQuestion" ADD CONSTRAINT "EvaluationQuestion_evaluationId_fkey" FOREIGN KEY ("evaluationId") REFERENCES "Evaluation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
