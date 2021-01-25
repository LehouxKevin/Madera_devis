<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210125215857 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE modele ADD type_remplissage_id INT NOT NULL');
        $this->addSql('ALTER TABLE modele ADD CONSTRAINT FK_100285586E7C9296 FOREIGN KEY (type_remplissage_id) REFERENCES type_remplissage (id)');
        $this->addSql('CREATE INDEX IDX_100285586E7C9296 ON modele (type_remplissage_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE modele DROP FOREIGN KEY FK_100285586E7C9296');
        $this->addSql('DROP INDEX IDX_100285586E7C9296 ON modele');
        $this->addSql('ALTER TABLE modele DROP type_remplissage_id');
    }
}
