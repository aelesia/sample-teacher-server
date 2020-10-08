import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialCreation1602172058214 implements MigrationInterface {
    name = 'InitialCreation1602172058214'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `suspension` (`id` int NOT NULL AUTO_INCREMENT, `active` tinyint NOT NULL, `created_date` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_date` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `student_id` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `teacher` (`id` int NOT NULL AUTO_INCREMENT, `uuid` varchar(36) NOT NULL, `first_name` varchar(32) NOT NULL, `last_name` varchar(32) NOT NULL, `email` varchar(64) NOT NULL, `created_date` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_date` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), INDEX `IDX_1905b1ed1612ef0a96c77fb722` (`uuid`), INDEX `IDX_00634394dce7677d531749ed8e` (`email`), UNIQUE INDEX `IDX_1905b1ed1612ef0a96c77fb722` (`uuid`), UNIQUE INDEX `IDX_00634394dce7677d531749ed8e` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `teaches` (`id` int NOT NULL AUTO_INCREMENT, `created_date` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_date` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `teacher_id` int NULL, `student_id` int NULL, UNIQUE INDEX `IDX_12c94a3dcf2f0d1c707f5192ee` (`teacher_id`, `student_id`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `student` (`id` int NOT NULL AUTO_INCREMENT, `uuid` varchar(36) NOT NULL, `first_name` varchar(32) NOT NULL, `last_name` varchar(32) NOT NULL, `email` varchar(64) NOT NULL, `created_date` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_date` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), INDEX `IDX_e11fbd60aaa3196597d36f2bbf` (`uuid`), INDEX `IDX_a56c051c91dbe1068ad683f536` (`email`), UNIQUE INDEX `IDX_e11fbd60aaa3196597d36f2bbf` (`uuid`), UNIQUE INDEX `IDX_a56c051c91dbe1068ad683f536` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `suspension` ADD CONSTRAINT `FK_26361dbb4b76d5dd0fca186a5d0` FOREIGN KEY (`student_id`) REFERENCES `student`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `teaches` ADD CONSTRAINT `FK_002e08507b622fdd60286fd843b` FOREIGN KEY (`teacher_id`) REFERENCES `teacher`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `teaches` ADD CONSTRAINT `FK_4994b663fd6a9dc3e0a7780531f` FOREIGN KEY (`student_id`) REFERENCES `student`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `teaches` DROP FOREIGN KEY `FK_4994b663fd6a9dc3e0a7780531f`");
        await queryRunner.query("ALTER TABLE `teaches` DROP FOREIGN KEY `FK_002e08507b622fdd60286fd843b`");
        await queryRunner.query("ALTER TABLE `suspension` DROP FOREIGN KEY `FK_26361dbb4b76d5dd0fca186a5d0`");
        await queryRunner.query("DROP INDEX `IDX_a56c051c91dbe1068ad683f536` ON `student`");
        await queryRunner.query("DROP INDEX `IDX_e11fbd60aaa3196597d36f2bbf` ON `student`");
        await queryRunner.query("DROP INDEX `IDX_a56c051c91dbe1068ad683f536` ON `student`");
        await queryRunner.query("DROP INDEX `IDX_e11fbd60aaa3196597d36f2bbf` ON `student`");
        await queryRunner.query("DROP TABLE `student`");
        await queryRunner.query("DROP INDEX `IDX_12c94a3dcf2f0d1c707f5192ee` ON `teaches`");
        await queryRunner.query("DROP TABLE `teaches`");
        await queryRunner.query("DROP INDEX `IDX_00634394dce7677d531749ed8e` ON `teacher`");
        await queryRunner.query("DROP INDEX `IDX_1905b1ed1612ef0a96c77fb722` ON `teacher`");
        await queryRunner.query("DROP INDEX `IDX_00634394dce7677d531749ed8e` ON `teacher`");
        await queryRunner.query("DROP INDEX `IDX_1905b1ed1612ef0a96c77fb722` ON `teacher`");
        await queryRunner.query("DROP TABLE `teacher`");
        await queryRunner.query("DROP TABLE `suspension`");
    }

}
