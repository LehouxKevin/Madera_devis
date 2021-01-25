<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210125093713 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE etage ADD modele_id INT NOT NULL');
        $this->addSql('ALTER TABLE etage ADD CONSTRAINT FK_2DDCF14BAC14B70A FOREIGN KEY (modele_id) REFERENCES modele (id)');
        $this->addSql('CREATE INDEX IDX_2DDCF14BAC14B70A ON etage (modele_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE etage DROP FOREIGN KEY FK_2DDCF14BAC14B70A');
        $this->addSql('DROP INDEX IDX_2DDCF14BAC14B70A ON etage');
        $this->addSql('ALTER TABLE etage DROP modele_id');
    }
}
