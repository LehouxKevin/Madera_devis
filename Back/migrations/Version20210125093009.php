<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210125093009 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE gamme ADD type_isolation_id INT NOT NULL');
        $this->addSql('ALTER TABLE gamme ADD CONSTRAINT FK_C32E1468C610454D FOREIGN KEY (type_isolation_id) REFERENCES type_isolation (id)');
        $this->addSql('CREATE INDEX IDX_C32E1468C610454D ON gamme (type_isolation_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE gamme DROP FOREIGN KEY FK_C32E1468C610454D');
        $this->addSql('DROP INDEX IDX_C32E1468C610454D ON gamme');
        $this->addSql('ALTER TABLE gamme DROP type_isolation_id');
    }
}
