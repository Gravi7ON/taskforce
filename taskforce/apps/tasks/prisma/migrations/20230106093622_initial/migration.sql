-- DropForeignKey
ALTER TABLE "Performer" DROP CONSTRAINT "Performer_taskId_fkey";

-- AddForeignKey
ALTER TABLE "Performer" ADD CONSTRAINT "Performer_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;
