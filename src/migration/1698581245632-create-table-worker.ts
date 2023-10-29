import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableWorker1698581245632 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "workers",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "user_id",
            type: "int",
          },
          {
            name: "is_active",
            type: "boolean",
            default: "true",
          },
          {
            name: "formation",
            type: "varchar",
            length: "300",
          },
          {
            name: "experience",
            type: "varchar",
            length: "300",
          },

          {
            name: "contracted_at",
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
            columnNames: ["user_id"],
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("workers");
  }
}
