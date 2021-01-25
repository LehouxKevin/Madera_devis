<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\DevisRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
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

    /**
     * @ORM\ManyToMany(targetEntity=Utilisateur::class, inversedBy="devis")
     */
    private $id_devis;

    /**
     * @ORM\ManyToOne(targetEntity=Client::class, inversedBy="devis")
     * @ORM\JoinColumn(nullable=false)
     */
    private $id_client;

    /**
     * @ORM\ManyToOne(targetEntity=Modele::class, inversedBy="id_modele")
     * @ORM\JoinColumn(nullable=false)
     */
    private $modele;

    public function __construct()
    {
        $this->id_devis = new ArrayCollection();
    }

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

    /**
     * @return Collection|Utilisateur[]
     */
    public function getIdDevis(): Collection
    {
        return $this->id_devis;
    }

    public function addIdDevi(Utilisateur $idDevi): self
    {
        if (!$this->id_devis->contains($idDevi)) {
            $this->id_devis[] = $idDevi;
        }

        return $this;
    }

    public function removeIdDevi(Utilisateur $idDevi): self
    {
        $this->id_devis->removeElement($idDevi);

        return $this;
    }

    public function getIdClient(): ?Client
    {
        return $this->id_client;
    }

    public function setIdClient(?Client $id_client): self
    {
        $this->id_client = $id_client;

        return $this;
    }

    public function getModele(): ?Modele
    {
        return $this->modele;
    }

    public function setModele(?Modele $modele): self
    {
        $this->modele = $modele;

        return $this;
    }
}
