/*
  Warnings:

  - You are about to drop the `ReservationItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ReservationItem" DROP CONSTRAINT "ReservationItem_itemId_fkey";

-- DropForeignKey
ALTER TABLE "ReservationItem" DROP CONSTRAINT "ReservationItem_reservationId_fkey";

-- DropTable
DROP TABLE "ReservationItem";

-- CreateTable
CREATE TABLE "_ReservationItems" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ReservationItems_AB_unique" ON "_ReservationItems"("A", "B");

-- CreateIndex
CREATE INDEX "_ReservationItems_B_index" ON "_ReservationItems"("B");

-- AddForeignKey
ALTER TABLE "_ReservationItems" ADD CONSTRAINT "_ReservationItems_A_fkey" FOREIGN KEY ("A") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ReservationItems" ADD CONSTRAINT "_ReservationItems_B_fkey" FOREIGN KEY ("B") REFERENCES "Reservation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
