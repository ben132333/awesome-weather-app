/*
  Warnings:

  - The primary key for the `Search` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Search` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Search" DROP CONSTRAINT "Search_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Search_pkey" PRIMARY KEY ("userId", "city", "time");
