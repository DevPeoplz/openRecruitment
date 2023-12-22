/*
  Warnings:

  - You are about to drop the column `time` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the `EventInterviewer` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `createdById` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "EventInterviewer" DROP CONSTRAINT "EventInterviewer_eventId_fkey";

-- DropForeignKey
ALTER TABLE "EventInterviewer" DROP CONSTRAINT "EventInterviewer_teamMemberId_fkey";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "time",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "createdById" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "duration" DROP NOT NULL,
ALTER COLUMN "location" DROP NOT NULL,
ALTER COLUMN "note" DROP NOT NULL,
ALTER COLUMN "privateNote" DROP NOT NULL;

-- DropTable
DROP TABLE "EventInterviewer";

-- CreateTable
CREATE TABLE "_interviewers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CandidateToEvent" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_interviewers_AB_unique" ON "_interviewers"("A", "B");

-- CreateIndex
CREATE INDEX "_interviewers_B_index" ON "_interviewers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CandidateToEvent_AB_unique" ON "_CandidateToEvent"("A", "B");

-- CreateIndex
CREATE INDEX "_CandidateToEvent_B_index" ON "_CandidateToEvent"("B");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "HiringRole"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_interviewers" ADD CONSTRAINT "_interviewers_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_interviewers" ADD CONSTRAINT "_interviewers_B_fkey" FOREIGN KEY ("B") REFERENCES "HiringRole"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CandidateToEvent" ADD CONSTRAINT "_CandidateToEvent_A_fkey" FOREIGN KEY ("A") REFERENCES "Candidate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CandidateToEvent" ADD CONSTRAINT "_CandidateToEvent_B_fkey" FOREIGN KEY ("B") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
