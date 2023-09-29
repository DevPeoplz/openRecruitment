-- DropForeignKey
ALTER TABLE "Stage" DROP CONSTRAINT "Stage_templateId_fkey";

-- AlterTable
ALTER TABLE "Match" ALTER COLUMN "isHired" SET DEFAULT false;

-- AlterTable
ALTER TABLE "Stage" ALTER COLUMN "position" DROP NOT NULL,
ALTER COLUMN "inputType" DROP NOT NULL,
ALTER COLUMN "value" DROP NOT NULL,
ALTER COLUMN "templateId" DROP NOT NULL,
ALTER COLUMN "isProtected" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Stage" ADD CONSTRAINT "Stage_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template"("id") ON DELETE SET NULL ON UPDATE CASCADE;
