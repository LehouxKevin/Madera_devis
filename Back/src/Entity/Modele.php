<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\ModeleRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass=ModeleRepository::class)
 */
class Modele
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $libelle;

    /**
     * @ORM\Column(type="date")
     */
    private $dateCreation;

    /**
     * @ORM\Column(type="boolean")
     */
    private $custom;

    /**
     * @ORM\Column(type="integer")
     */
    private $nbEtage;

    /**
     * @ORM\ManyToOne(targetEntity=Gamme::class)
     * @ORM\JoinColumn(nullable=false)
     */
    private $gamme;

    /**
     * @ORM\ManyToOne(targetEntity=TypeRemplissage::class)
     * @ORM\JoinColumn(nullable=false)
     */
    private $typeRemplissage;

    /**
     * @ORM\ManyToOne(targetEntity=CoupeDePrincipe::class)
     * @ORM\JoinColumn(nullable=false)
     */
    private $coupeDePrincipe;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getLibelle(): ?string
    {
        return $this->libelle;
    }

    public function setLibelle(string $libelle): self
    {
        $this->libelle = $libelle;

        return $this;
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

    public function getCustom(): ?bool
    {
        return $this->custom;
    }

    public function setCustom(bool $custom): self
    {
        $this->custom = $custom;

        return $this;
    }

    public function getNbEtage(): ?int
    {
        return $this->nbEtage;
    }

    public function setNbEtage(int $nbEtage): self
    {
        $this->nbEtage = $nbEtage;

        return $this;
    }

    public function getGamme(): ?Gamme
    {
        return $this->gamme;
    }

    public function setGamme(?Gamme $gamme): self
    {
        $this->gamme = $gamme;

        return $this;
    }

    public function getTypeRemplissage(): ?TypeRemplissage
    {
        return $this->typeRemplissage;
    }

    public function setTypeRemplissage(?TypeRemplissage $typeRemplissage): self
    {
        $this->typeRemplissage = $typeRemplissage;

        return $this;
    }

    public function getCoupeDePrincipe(): ?CoupeDePrincipe
    {
        return $this->coupeDePrincipe;
    }

    public function setCoupeDePrincipe(?CoupeDePrincipe $coupeDePrincipe): self
    {
        $this->coupeDePrincipe = $coupeDePrincipe;

        return $this;
    }
}
