<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\ModeleRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
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
     * @ORM\OneToMany(targetEntity=Devis::class, mappedBy="modele")
     */
    private $id_modele;

    public function __construct()
    {
        $this->id_modele = new ArrayCollection();
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

    /**
     * @return Collection|Devis[]
     */
    public function getIdModele(): Collection
    {
        return $this->id_modele;
    }

    public function addIdModele(Devis $idModele): self
    {
        if (!$this->id_modele->contains($idModele)) {
            $this->id_modele[] = $idModele;
            $idModele->setModele($this);
        }

        return $this;
    }

    public function removeIdModele(Devis $idModele): self
    {
        if ($this->id_modele->removeElement($idModele)) {
            // set the owning side to null (unless already changed)
            if ($idModele->getModele() === $this) {
                $idModele->setModele(null);
            }
        }

        return $this;
    }
}
