<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210125101145 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE composant ADD famille_composant_id INT NOT NULL');
        $this->addSql('ALTER TABLE composant ADD CONSTRAINT FK_EC8486C9A5655F89 FOREIGN KEY (famille_composant_id) REFERENCES famille_composant (id)');
        $this->addSql('CREATE INDEX IDX_EC8486C9A5655F89 ON composant (famille_composant_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE composant DROP FOREIGN KEY FK_EC8486C9A5655F89');
        $this->addSql('DROP INDEX IDX_EC8486C9A5655F89 ON composant');
        $this->addSql('ALTER TABLE composant DROP famille_composant_id');
    }
}
