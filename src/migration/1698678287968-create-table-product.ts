import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableProduct1698678287968 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "products",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "type",
            type: "enum",
            enum: ["tatto", "piercing"],
            default: '"tatto"',
          },
          {
            name: "product",
            type: "varchar",
            length: "50",
          },
          {
            name: "price",
            type: "int",
            length: "6",
          },
          {
            name: "description",
            type: "varchar",
            length: "50",
          },
          {
            name: "image",
            type: "varchar",
            length: "50",
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
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable ("products");
  }
}
