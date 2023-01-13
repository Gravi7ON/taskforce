/*
  Warnings:

  - You are about to drop the column `ready` on the `Performer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Performer" DROP COLUMN "ready",
ADD COLUMN     "assignee" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "statusWork" TEXT;
