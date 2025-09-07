/*
  Warnings:

  - Added the required column `userId` to the `customer_order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `customer_order` ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `customer_order` ADD CONSTRAINT `customer_order_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
