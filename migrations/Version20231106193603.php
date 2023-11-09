<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231106193603 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE candidate (id INT AUTO_INCREMENT NOT NULL, first_name VARCHAR(100) NOT NULL, last_name VARCHAR(100) NOT NULL, sex VARCHAR(1) NOT NULL, birth_date DATE NOT NULL, current_address LONGTEXT NOT NULL, nni VARCHAR(1) NOT NULL, id_card VARCHAR(50) NOT NULL, usual_district VARCHAR(20) NOT NULL, temporal_district VARCHAR(20) DEFAULT NULL, posting_district VARCHAR(20) NOT NULL, phone INT NOT NULL, phone2 INT DEFAULT NULL, phone3 INT DEFAULT NULL, whatshapp_phone INT DEFAULT NULL, email VARCHAR(20) NOT NULL, diploma VARCHAR(2) NOT NULL, file_diploma VARCHAR(20) NOT NULL, profession VARCHAR(2) NOT NULL, profession_other VARCHAR(255) DEFAULT NULL, language1 VARCHAR(2) NOT NULL, language2 VARCHAR(2) DEFAULT NULL, language3 VARCHAR(2) DEFAULT NULL, is_computer_knowledge VARCHAR(2) NOT NULL, is_digital_experience TINYINT(1) NOT NULL, is_censu_or_survey_experience TINYINT(1) NOT NULL, nbr_census_or_survey INT NOT NULL, file_experience_census_or_survey VARCHAR(20) NOT NULL, file_cv VARCHAR(20) NOT NULL, create_at DATETIME NOT NULL, update_at DATETIME NOT NULL, is_delete TINYINT(1) NOT NULL, statut TINYINT(1) NOT NULL, UNIQUE INDEX UNIQ_C8B28E449D3484D1 (id_card), UNIQUE INDEX UNIQ_C8B28E44444F97DD (phone), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE messenger_messages (id BIGINT AUTO_INCREMENT NOT NULL, body LONGTEXT NOT NULL, headers LONGTEXT NOT NULL, queue_name VARCHAR(190) NOT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', available_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', delivered_at DATETIME DEFAULT NULL COMMENT \'(DC2Type:datetime_immutable)\', INDEX IDX_75EA56E0FB7336F0 (queue_name), INDEX IDX_75EA56E0E3BD61CE (available_at), INDEX IDX_75EA56E016BA31DB (delivered_at), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE candidate');
        $this->addSql('DROP TABLE messenger_messages');
    }
}
