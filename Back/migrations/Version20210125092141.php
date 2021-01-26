<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210125092141 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE utilisateur_devis (utilisateur_id INT NOT NULL, devis_id INT NOT NULL, INDEX IDX_4DE29DF5FB88E14F (utilisateur_id), INDEX IDX_4DE29DF541DEFADA (devis_id), PRIMARY KEY(utilisateur_id, devis_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE utilisateur_devis ADD CONSTRAINT FK_4DE29DF5FB88E14F FOREIGN KEY (utilisateur_id) REFERENCES utilisateur (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE utilisateur_devis ADD CONSTRAINT FK_4DE29DF541DEFADA FOREIGN KEY (devis_id) REFERENCES devis (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE utilisateur_devis');
    }
}
