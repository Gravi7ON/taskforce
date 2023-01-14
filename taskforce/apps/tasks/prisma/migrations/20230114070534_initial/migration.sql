/*
  Warnings:

  - Made the column `statusWork` on table `Performer` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Performer" ALTER COLUMN "statusWork" SET NOT NULL;
