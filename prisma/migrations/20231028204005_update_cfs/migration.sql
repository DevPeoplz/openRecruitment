/*
  Warnings:

  - You are about to drop the `CandidateCustomFields` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CustomFields` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CandidateCustomFields" DROP CONSTRAINT "CandidateCustomFields_candidateId_fkey";

-- DropForeignKey
ALTER TABLE "CandidateCustomFields" DROP CONSTRAINT "CandidateCustomFields_customFieldId_fkey";

-- DropForeignKey
ALTER TABLE "CustomFields" DROP CONSTRAINT "CustomFields_companyId_fkey";

-- DropTable
DROP TABLE "CandidateCustomFields";

-- DropTable
DROP TABLE "CustomFields";

-- CreateTable
CREATE TABLE "CandidateCustomField" (
    "candidateId" INTEGER NOT NULL,
    "customFieldId" INTEGER NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "CandidateCustomField_pkey" PRIMARY KEY ("candidateId","customFieldId")
);

-- CreateTable
CREATE TABLE "CustomField" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "defaultValue" TEXT,
    "settings" JSONB,
    "companyId" TEXT NOT NULL,

    CONSTRAINT "CustomField_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CustomField_companyId_key_key" ON "CustomField"("companyId", "key");

-- AddForeignKey
ALTER TABLE "CandidateCustomField" ADD CONSTRAINT "CandidateCustomField_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CandidateCustomField" ADD CONSTRAINT "CandidateCustomField_customFieldId_fkey" FOREIGN KEY ("customFieldId") REFERENCES "CustomField"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomField" ADD CONSTRAINT "CustomField_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
