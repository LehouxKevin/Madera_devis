<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210125102650 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE gamme ADD conception_ossature_id INT NOT NULL');
        $this->addSql('ALTER TABLE gamme ADD CONSTRAINT FK_C32E146864A8CC70 FOREIGN KEY (conception_ossature_id) REFERENCES conception_ossature (id)');
        $this->addSql('CREATE INDEX IDX_C32E146864A8CC70 ON gamme (conception_ossature_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE gamme DROP FOREIGN KEY FK_C32E146864A8CC70');
        $this->addSql('DROP INDEX IDX_C32E146864A8CC70 ON gamme');
        $this->addSql('ALTER TABLE gamme DROP conception_ossature_id');
    }
}
