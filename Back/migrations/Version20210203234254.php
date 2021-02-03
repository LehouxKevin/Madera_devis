<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210203234254 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE modele ADD finition_interieur_id INT NOT NULL');
        $this->addSql('ALTER TABLE modele ADD CONSTRAINT FK_10028558F0742DFA FOREIGN KEY (finition_interieur_id) REFERENCES finition_interieur (id)');
        $this->addSql('CREATE INDEX IDX_10028558F0742DFA ON modele (finition_interieur_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE modele DROP FOREIGN KEY FK_10028558F0742DFA');
        $this->addSql('DROP INDEX IDX_10028558F0742DFA ON modele');
        $this->addSql('ALTER TABLE modele DROP finition_interieur_id');
    }
}
