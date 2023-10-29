/*
  Warnings:

  - A unique constraint covering the columns `[candidateId,offerId]` on the table `Match` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Match_candidateId_offerId_key" ON "Match"("candidateId", "offerId");
