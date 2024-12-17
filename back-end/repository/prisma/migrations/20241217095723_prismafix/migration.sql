/*
  Warnings:

  - You are about to drop the column `amount` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the `_ReservationItems` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ReservationItems" DROP CONSTRAINT "_ReservationItems_A_fkey";

-- DropForeignKey
ALTER TABLE "_ReservationItems" DROP CONSTRAINT "_ReservationItems_B_fkey";

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "amount";

-- DropTable
DROP TABLE "_ReservationItems";

-- CreateTable
CREATE TABLE "ReservationItem" (
    "id" SERIAL NOT NULL,
    "reservationId" INTEGER NOT NULL,
    "itemId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "ReservationItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ReservationItem" ADD CONSTRAINT "ReservationItem_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "Reservation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReservationItem" ADD CONSTRAINT "ReservationItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
