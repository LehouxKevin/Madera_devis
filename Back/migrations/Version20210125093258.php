<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210125093258 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE gamme ADD qualite_huisseries_id INT NOT NULL');
        $this->addSql('ALTER TABLE gamme ADD CONSTRAINT FK_C32E146826AAF844 FOREIGN KEY (qualite_huisseries_id) REFERENCES qualite_huisseries (id)');
        $this->addSql('CREATE INDEX IDX_C32E146826AAF844 ON gamme (qualite_huisseries_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE gamme DROP FOREIGN KEY FK_C32E146826AAF844');
        $this->addSql('DROP INDEX IDX_C32E146826AAF844 ON gamme');
        $this->addSql('ALTER TABLE gamme DROP qualite_huisseries_id');
    }
}
