/*
  Warnings:

  - You are about to drop the column `created_at` on the `Resource` table. All the data in the column will be lost.
  - You are about to drop the column `downloads` on the `Resource` table. All the data in the column will be lost.
  - You are about to drop the column `file_size` on the `Resource` table. All the data in the column will be lost.
  - You are about to drop the column `file_type` on the `Resource` table. All the data in the column will be lost.
  - You are about to drop the column `file_url` on the `Resource` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `Resource` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Resource` table. All the data in the column will be lost.
  - You are about to drop the column `uploader_id` on the `Resource` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `Resource` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fileSize` to the `Resource` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fileType` to the `Resource` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fileUrl` to the `Resource` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uploaderId` to the `Resource` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Resource" DROP CONSTRAINT "Resource_uploader_id_fkey";

-- AlterTable
ALTER TABLE "Resource" DROP COLUMN "created_at",
DROP COLUMN "downloads",
DROP COLUMN "file_size",
DROP COLUMN "file_type",
DROP COLUMN "file_url",
DROP COLUMN "rating",
DROP COLUMN "updated_at",
DROP COLUMN "uploader_id",
ADD COLUMN     "approved" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "categoryId" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "downloadCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "fileSize" TEXT NOT NULL,
ADD COLUMN     "fileType" TEXT NOT NULL,
ADD COLUMN     "fileUrl" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "uploadDate" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "uploaderId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "Resource" ADD CONSTRAINT "Resource_uploaderId_fkey" FOREIGN KEY ("uploaderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
