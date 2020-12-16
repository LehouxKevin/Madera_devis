<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\DevisRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass=DevisRepository::class)
 */
class Devis
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="date")
     */
    private $dateCreation;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $lieuCreation;

    /**
     * @ORM\Column(type="date")
     */
    private $dateValidite;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $informationsAdditionnelles;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDateCreation(): ?\DateTimeInterface
    {
        return $this->dateCreation;
    }

    public function setDateCreation(\DateTimeInterface $dateCreation): self
    {
        $this->dateCreation = $dateCreation;

        return $this;
    }

    public function getLieuCreation(): ?string
    {
        return $this->lieuCreation;
    }

    public function setLieuCreation(string $lieuCreation): self
    {
        $this->lieuCreation = $lieuCreation;

        return $this;
    }

    public function getDateValidite(): ?\DateTimeInterface
    {
        return $this->dateValidite;
    }

    public function setDateValidite(\DateTimeInterface $dateValidite): self
    {
        $this->dateValidite = $dateValidite;

        return $this;
    }

    public function getInformationsAdditionnelles(): ?string
    {
        return $this->informationsAdditionnelles;
    }

    public function setInformationsAdditionnelles(?string $informationsAdditionnelles): self
    {
        $this->informationsAdditionnelles = $informationsAdditionnelles;

        return $this;
    }
}
