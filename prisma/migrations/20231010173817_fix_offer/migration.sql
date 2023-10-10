/*
  Warnings:

  - You are about to drop the column `deparmentId` on the `Offer` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Offer" DROP CONSTRAINT "Offer_deparmentId_fkey";

-- AlterTable
ALTER TABLE "Offer" DROP COLUMN "deparmentId",
ADD COLUMN     "departmentId" INTEGER;

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE SET NULL ON UPDATE CASCADE;
