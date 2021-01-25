<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210125220024 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE modele ADD coupe_de_principe_id INT NOT NULL');
        $this->addSql('ALTER TABLE modele ADD CONSTRAINT FK_100285587FB6BB5E FOREIGN KEY (coupe_de_principe_id) REFERENCES coupe_de_principe (id)');
        $this->addSql('CREATE INDEX IDX_100285587FB6BB5E ON modele (coupe_de_principe_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE modele DROP FOREIGN KEY FK_100285587FB6BB5E');
        $this->addSql('DROP INDEX IDX_100285587FB6BB5E ON modele');
        $this->addSql('ALTER TABLE modele DROP coupe_de_principe_id');
    }
}
