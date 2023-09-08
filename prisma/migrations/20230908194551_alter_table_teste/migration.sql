/*
  Warnings:

  - Made the column `description` on table `teste` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "teste" ALTER COLUMN "description" SET NOT NULL;
