/*
  Warnings:

  - You are about to drop the column `birthDate` on the `Candidate` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Candidate" DROP COLUMN "birthDate",
ADD COLUMN     "birthday" TIMESTAMP(3);
