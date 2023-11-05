import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableAppointment1698769661453 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "appointment",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "client",
            type: "int",
          },
          {
            name: "artist",
            type: "int",
          },
          {
            name: "portfolio_id",
            type: "int",
          },
          {
            name: "day",
            type: "varchar",
            length: "10",
          },
          {
            name: "hour",
            type: "varchar",
            length: "5",
          },
          {
            name: "status_appointment",
            type: "enum",
            enum: ["pending", "approved", "canceled", "made"],
            default: '"pending"'
          },
          {
            name: "is_active",
            type: "boolean",
            default: "true",
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
            columnNames: ["artist"],
            referencedTableName: "workers",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
          {
            columnNames: ["client"],
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
          {
            columnNames: ["portfolio_id"],
            referencedTableName: "portfolios",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("appointment");
  }
}
