-- AlterTable
ALTER TABLE "teste_report" ALTER COLUMN "pressao_de_antes" SET DATA TYPE DECIMAL(7,2),
ALTER COLUMN "pressao_de_depois" SET DATA TYPE DECIMAL(7,2),
ALTER COLUMN "desgaste_de_antes" SET DATA TYPE DECIMAL(7,2),
ALTER COLUMN "desgaste_de_depois" SET DATA TYPE DECIMAL(7,2),
ALTER COLUMN "tamanho_mola_de" SET DATA TYPE DECIMAL(7,2),
ALTER COLUMN "tamanho_mola_dd" SET DATA TYPE DECIMAL(7,2),
ALTER COLUMN "tamanho_mola_te" SET DATA TYPE DECIMAL(7,2),
ALTER COLUMN "tamanho_mola_td" SET DATA TYPE DECIMAL(7,2),
ALTER COLUMN "desgaste_dd_antes" SET DATA TYPE DECIMAL(7,2),
ALTER COLUMN "desgaste_dd_depois" SET DATA TYPE DECIMAL(7,2),
ALTER COLUMN "desgaste_td_antes" SET DATA TYPE DECIMAL(7,2),
ALTER COLUMN "desgaste_td_depois" SET DATA TYPE DECIMAL(7,2),
ALTER COLUMN "desgaste_te_antes" SET DATA TYPE DECIMAL(7,2),
ALTER COLUMN "desgaste_te_depois" SET DATA TYPE DECIMAL(7,2),
ALTER COLUMN "pressao_dd_antes" SET DATA TYPE DECIMAL(7,2),
ALTER COLUMN "pressao_dd_depois" SET DATA TYPE DECIMAL(7,2),
ALTER COLUMN "pressao_td_antes" SET DATA TYPE DECIMAL(7,2),
ALTER COLUMN "pressao_td_depois" SET DATA TYPE DECIMAL(7,2),
ALTER COLUMN "pressao_te_antes" SET DATA TYPE DECIMAL(7,2),
ALTER COLUMN "pressao_te_depois" SET DATA TYPE DECIMAL(7,2);

-- CreateTable
CREATE TABLE "car_checklist_status" (
    "id" SERIAL NOT NULL,
    "carro_id" INTEGER NOT NULL,
    "checklist_item_id" INTEGER NOT NULL,
    "is_completed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "car_checklist_status_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "car_checklist_status_carro_id_checklist_item_id_key" ON "car_checklist_status"("carro_id", "checklist_item_id");

-- AddForeignKey
ALTER TABLE "car_checklist_status" ADD CONSTRAINT "car_checklist_status_carro_id_fkey" FOREIGN KEY ("carro_id") REFERENCES "carro"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "car_checklist_status" ADD CONSTRAINT "car_checklist_status_checklist_item_id_fkey" FOREIGN KEY ("checklist_item_id") REFERENCES "checklist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
