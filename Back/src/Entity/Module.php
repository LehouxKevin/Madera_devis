<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\ModuleRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass=ModuleRepository::class)
 */
class Module
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
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $details;

    /**
     * @ORM\Column(type="date")
     */
    private $dateCreation;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $prix;

    /**
     * @ORM\Column(type="boolean")
     */
    private $custom;

    /**
     * @ORM\ManyToMany(targetEntity=Etage::class, mappedBy="modules")
     */
    private $etages;

    /**
     * @ORM\ManyToOne(targetEntity=Gamme::class)
     * @ORM\JoinColumn(nullable=false)
     */
    private $gamme;

    /**
     * @ORM\ManyToOne(targetEntity=TypeModule::class)
     * @ORM\JoinColumn(nullable=false)
     */
    private $typeModule;

    /**
     * @ORM\ManyToMany(targetEntity=Composant::class, inversedBy="modules")
     */
    private $composants;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $caracteristiques;

    public function __construct()
    {
        $this->etages = new ArrayCollection();
        $this->composants = new ArrayCollection();
    }

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

    public function getDetails(): ?string
    {
        return $this->details;
    }

    public function setDetails(?string $details): self
    {
        $this->details = $details;

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

    public function getPrix(): ?string
    {
        return $this->prix;
    }

    public function setPrix(string $prix): self
    {
        $this->prix = $prix;

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

    /**
     * @return Collection|Etage[]
     */
    public function getEtages(): Collection
    {
        return $this->etages;
    }

    public function addEtage(Etage $etage): self
    {
        if (!$this->etages->contains($etage)) {
            $this->etages[] = $etage;
            $etage->addModule($this);
        }

        return $this;
    }

    public function removeEtage(Etage $etage): self
    {
        if ($this->etages->removeElement($etage)) {
            $etage->removeModule($this);
        }

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

    public function getTypeModule(): ?TypeModule
    {
        return $this->typeModule;
    }

    public function setTypeModule(?TypeModule $typeModule): self
    {
        $this->typeModule = $typeModule;

        return $this;
    }

    /**
     * @return Collection|Composant[]
     */
    public function getComposants(): Collection
    {
        return $this->composants;
    }

    public function addComposant(Composant $composant): self
    {
        if (!$this->composants->contains($composant)) {
            $this->composants[] = $composant;
        }

        return $this;
    }

    public function removeComposant(Composant $composant): self
    {
        $this->composants->removeElement($composant);

        return $this;
    }

    public function getCaracteristiques(): ?string
    {
        return $this->caracteristiques;
    }

    public function setCaracteristiques(string $caracteristiques): self
    {
        $this->caracteristiques = $caracteristiques;

        return $this;
    }
}
