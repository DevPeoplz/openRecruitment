/*
  Warnings:

  - You are about to drop the column `coverLetter` on the `Candidate` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[avatarId]` on the table `Candidate` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[coverLetterId]` on the table `Candidate` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Candidate" DROP COLUMN "coverLetter",
ADD COLUMN     "avatarId" INTEGER,
ADD COLUMN     "coverLetterId" INTEGER,
ADD COLUMN     "coverLetterText" TEXT,
ALTER COLUMN "birthDate" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Candidate_avatarId_key" ON "Candidate"("avatarId");

-- CreateIndex
CREATE UNIQUE INDEX "Candidate_coverLetterId_key" ON "Candidate"("coverLetterId");

-- AddForeignKey
ALTER TABLE "Candidate" ADD CONSTRAINT "Candidate_avatarId_fkey" FOREIGN KEY ("avatarId") REFERENCES "Attachment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Candidate" ADD CONSTRAINT "Candidate_coverLetterId_fkey" FOREIGN KEY ("coverLetterId") REFERENCES "Attachment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
