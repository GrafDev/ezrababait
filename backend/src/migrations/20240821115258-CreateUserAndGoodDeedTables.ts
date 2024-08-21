import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserAndGoodDeedTables20240821115258 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" SERIAL PRIMARY KEY,
                "username" VARCHAR UNIQUE NOT NULL,
                "email" VARCHAR UNIQUE NOT NULL,
                "password" VARCHAR NOT NULL,
                "friendTag" VARCHAR UNIQUE NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
            )
        `);

        await queryRunner.query(`
            CREATE TABLE "good_deed" (
                "id" SERIAL PRIMARY KEY,
                "title" VARCHAR NOT NULL,
                "description" VARCHAR NOT NULL,
                "status" VARCHAR NOT NULL,
                "userId" INTEGER,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                FOREIGN KEY ("userId") REFERENCES "user"("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "good_deed"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }
}
