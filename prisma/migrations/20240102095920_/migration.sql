/*
  Warnings:

  - The primary key for the `Search` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `time` on the `Search` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Search" DROP CONSTRAINT "Search_pkey",
DROP COLUMN "time",
ADD COLUMN     "time" INTEGER NOT NULL,
ADD CONSTRAINT "Search_pkey" PRIMARY KEY ("userId", "city", "time");
