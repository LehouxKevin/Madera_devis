<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\TypeModuleRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass=TypeModuleRepository::class)
 */
class TypeModule
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
     * @ORM\ManyToMany(targetEntity=FamilleComposant::class, inversedBy="typeModules")
     */
    private $familleComposant;

    public function __construct()
    {
        $this->familleComposant = new ArrayCollection();
        $this->famillesComposant = new ArrayCollection();
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

    /**
     * @return Collection|FamilleComposant[]
     */
    public function getFamilleComposant(): Collection
    {
        return $this->familleComposant;
    }

    public function addFamilleComposant(FamilleComposant $familleComposant): self
    {
        if (!$this->familleComposant->contains($familleComposant)) {
            $this->familleComposant[] = $familleComposant;
        }

        return $this;
    }

    public function removeFamilleComposant(FamilleComposant $familleComposant): self
    {
        $this->familleComposant->removeElement($familleComposant);

        return $this;
    }
}
