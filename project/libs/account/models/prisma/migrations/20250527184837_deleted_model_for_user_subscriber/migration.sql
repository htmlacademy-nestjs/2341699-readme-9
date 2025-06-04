/*
  Warnings:

  - You are about to drop the `subscribers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "subscribers" DROP CONSTRAINT "subscribers_subscriberId_fkey";

-- DropForeignKey
ALTER TABLE "subscribers" DROP CONSTRAINT "subscribers_userId_fkey";

-- DropTable
DROP TABLE "subscribers";
