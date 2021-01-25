<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210125095052 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE module ADD gamme_id INT NOT NULL');
        $this->addSql('ALTER TABLE module ADD CONSTRAINT FK_C242628D2FD85F1 FOREIGN KEY (gamme_id) REFERENCES gamme (id)');
        $this->addSql('CREATE INDEX IDX_C242628D2FD85F1 ON module (gamme_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE module DROP FOREIGN KEY FK_C242628D2FD85F1');
        $this->addSql('DROP INDEX IDX_C242628D2FD85F1 ON module');
        $this->addSql('ALTER TABLE module DROP gamme_id');
    }
}
