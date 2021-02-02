<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210201193242 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE devis ADD etat_avancement_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE devis ADD CONSTRAINT FK_8B27C52B4B844BB7 FOREIGN KEY (etat_avancement_id) REFERENCES etat_avancement (id)');
        $this->addSql('CREATE INDEX IDX_8B27C52B4B844BB7 ON devis (etat_avancement_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE devis DROP FOREIGN KEY FK_8B27C52B4B844BB7');
        $this->addSql('DROP INDEX IDX_8B27C52B4B844BB7 ON devis');
        $this->addSql('ALTER TABLE devis DROP etat_avancement_id');
    }
}
