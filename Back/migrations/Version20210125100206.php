<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210125100206 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE module ADD type_module_id INT NOT NULL');
        $this->addSql('ALTER TABLE module ADD CONSTRAINT FK_C2426281B04F481 FOREIGN KEY (type_module_id) REFERENCES type_module (id)');
        $this->addSql('CREATE INDEX IDX_C2426281B04F481 ON module (type_module_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE module DROP FOREIGN KEY FK_C2426281B04F481');
        $this->addSql('DROP INDEX IDX_C2426281B04F481 ON module');
        $this->addSql('ALTER TABLE module DROP type_module_id');
    }
}
