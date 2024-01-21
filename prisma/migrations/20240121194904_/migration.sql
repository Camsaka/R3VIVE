/*
  Warnings:

  - You are about to drop the `CertifIPFSData` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "CertifRequest" ADD COLUMN     "images" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- DropTable
DROP TABLE "CertifIPFSData";
