<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210125100934 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE type_module_famille_composant (type_module_id INT NOT NULL, famille_composant_id INT NOT NULL, INDEX IDX_174C46DD1B04F481 (type_module_id), INDEX IDX_174C46DDA5655F89 (famille_composant_id), PRIMARY KEY(type_module_id, famille_composant_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE type_module_famille_composant ADD CONSTRAINT FK_174C46DD1B04F481 FOREIGN KEY (type_module_id) REFERENCES type_module (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE type_module_famille_composant ADD CONSTRAINT FK_174C46DDA5655F89 FOREIGN KEY (famille_composant_id) REFERENCES famille_composant (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE type_module_famille_composant');
    }
}
