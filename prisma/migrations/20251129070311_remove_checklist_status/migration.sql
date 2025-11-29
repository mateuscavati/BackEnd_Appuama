/*
  Warnings:

  - You are about to drop the `car_checklist_status` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `report_checklist_item` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."car_checklist_status" DROP CONSTRAINT "car_checklist_status_carro_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."car_checklist_status" DROP CONSTRAINT "car_checklist_status_checklist_item_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."report_checklist_item" DROP CONSTRAINT "report_checklist_item_checklist_item_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."report_checklist_item" DROP CONSTRAINT "report_checklist_item_report_id_fkey";

-- DropTable
DROP TABLE "public"."car_checklist_status";

-- DropTable
DROP TABLE "public"."report_checklist_item";
