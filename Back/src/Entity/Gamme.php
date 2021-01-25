<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\GammeRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass=GammeRepository::class)
 */
class Gamme
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
     * @ORM\ManyToOne(targetEntity=FinitionExterieur::class)
     * @ORM\JoinColumn(nullable=false)
     */
    private $finitionExt;

    /**
     * @ORM\ManyToOne(targetEntity=TypeIsolation::class)
     * @ORM\JoinColumn(nullable=false)
     */
    private $typeIsolation;

    /**
     * @ORM\ManyToOne(targetEntity=TypeCouverture::class)
     * @ORM\JoinColumn(nullable=false)
     */
    private $typeCouverture;

    /**
     * @ORM\ManyToOne(targetEntity=QualiteHuisseries::class)
     * @ORM\JoinColumn(nullable=false)
     */
    private $qualiteHuisseries;

    /**
     * @ORM\ManyToOne(targetEntity=ConceptionOssature::class)
     * @ORM\JoinColumn(nullable=false)
     */
    private $conceptionOssature;

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

    public function getFinitionExt(): ?FinitionExterieur
    {
        return $this->finitionExt;
    }

    public function setFinitionExt(?FinitionExterieur $finitionExt): self
    {
        $this->finitionExt = $finitionExt;

        return $this;
    }

    public function getTypeIsolation(): ?TypeIsolation
    {
        return $this->typeIsolation;
    }

    public function setTypeIsolation(?TypeIsolation $typeIsolation): self
    {
        $this->typeIsolation = $typeIsolation;

        return $this;
    }

    public function getTypeCouverture(): ?TypeCouverture
    {
        return $this->typeCouverture;
    }

    public function setTypeCouverture(?TypeCouverture $typeCouverture): self
    {
        $this->typeCouverture = $typeCouverture;

        return $this;
    }

    public function getQualiteHuisseries(): ?QualiteHuisseries
    {
        return $this->qualiteHuisseries;
    }

    public function setQualiteHuisseries(?QualiteHuisseries $qualiteHuisseries): self
    {
        $this->qualiteHuisseries = $qualiteHuisseries;

        return $this;
    }

    public function getConceptionOssature(): ?ConceptionOssature
    {
        return $this->conceptionOssature;
    }

    public function setConceptionOssature(?ConceptionOssature $conceptionOssature): self
    {
        $this->conceptionOssature = $conceptionOssature;

        return $this;
    }
}
