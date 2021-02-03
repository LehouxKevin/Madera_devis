<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210203204044 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE etage_module (id INT AUTO_INCREMENT NOT NULL, etage_id INT NOT NULL, module_id INT NOT NULL, quantite INT NOT NULL, INDEX IDX_7388CF2F984CE93F (etage_id), INDEX IDX_7388CF2FAFC2B591 (module_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE etage_module ADD CONSTRAINT FK_7388CF2F984CE93F FOREIGN KEY (etage_id) REFERENCES etage (id)');
        $this->addSql('ALTER TABLE etage_module ADD CONSTRAINT FK_7388CF2FAFC2B591 FOREIGN KEY (module_id) REFERENCES module (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE etage_module');
    }
}
