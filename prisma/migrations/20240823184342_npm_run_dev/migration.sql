-- CreateTable
CREATE TABLE "EventInterviewer" (
    "id" SERIAL NOT NULL,
    "eventId" INTEGER NOT NULL,
    "teamMemberId" INTEGER NOT NULL,

    CONSTRAINT "EventInterviewer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EventInterviewer" ADD CONSTRAINT "EventInterviewer_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventInterviewer" ADD CONSTRAINT "EventInterviewer_teamMemberId_fkey" FOREIGN KEY ("teamMemberId") REFERENCES "HiringRole"("id") ON DELETE CASCADE ON UPDATE CASCADE;
