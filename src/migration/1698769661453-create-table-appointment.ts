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
          name: "user_id",
          type: "int",
        },
        {
          name: "worker_id",
          type: "int",
        },
        {
          name: "portfolio_id",
          type: "int",
        },
        {
          name: "portfolio_price",
          type: "int",
          length: "6",
        },
        {
          name: "day",
          type: "date",
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
          columnNames: ["user_id"],
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
