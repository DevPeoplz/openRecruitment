/*
  Warnings:

  - The primary key for the `OfferTag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `OfferTag` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "OfferTag" DROP CONSTRAINT "OfferTag_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "OfferTag_pkey" PRIMARY KEY ("offerId", "tagId");
