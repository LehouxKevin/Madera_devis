<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210125093120 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE gamme ADD type_couverture_id INT NOT NULL');
        $this->addSql('ALTER TABLE gamme ADD CONSTRAINT FK_C32E14684FE72DC0 FOREIGN KEY (type_couverture_id) REFERENCES type_couverture (id)');
        $this->addSql('CREATE INDEX IDX_C32E14684FE72DC0 ON gamme (type_couverture_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE gamme DROP FOREIGN KEY FK_C32E14684FE72DC0');
        $this->addSql('DROP INDEX IDX_C32E14684FE72DC0 ON gamme');
        $this->addSql('ALTER TABLE gamme DROP type_couverture_id');
    }
}
