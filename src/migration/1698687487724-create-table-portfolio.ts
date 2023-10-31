import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateTablePortfolio1698687487724 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: "portfolio",
              columns: [
                {
                  name: "id",
                  type: "int",
                  isPrimary: true,
                  isGenerated: true,
                  generationStrategy: "increment",
                },
                {
                    name: "worker_id",
                    type: "int",
                },
                {
                    name: "product_id",
                    type: "int",
                },
                {
                  name: "price",
                  type: "int",
                  length: "6",
                },
                {
                  name: "created_at",
                  type: "timestamp",
                  default: "CURRENT_TIMESTAMP",
                },
                {
                  name: "update_at",
                  type: "timestamp",
                  default: "CURRENT_TIMESTAMP",
                  onUpdate: "CURRENT_TIMESTAMP",
                },
              ],
              foreignKeys: [
                {
                  columnNames: ["worker_id"],
                  referencedTableName: "workers",
                  referencedColumnNames: ["id"],
                  onDelete: "CASCADE",
                },
                {
                    columnNames: ["product_id"],
                    referencedTableName: "products",
                    referencedColumnNames: ["id"],
                    onDelete: "CASCADE",
                  },
              ],
            }),
            true
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("portfolio")
    }

}
