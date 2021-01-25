<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\FamilleComposantRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass=FamilleComposantRepository::class)
 */
class FamilleComposant
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
     * @ORM\ManyToMany(targetEntity=TypeModule::class, mappedBy="familleComposant")
     */
    private $typeModules;

    public function __construct()
    {
        $this->typeModules = new ArrayCollection();
        $this->typesModule = new ArrayCollection();
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
     * @return Collection|TypeModule[]
     */
    public function getTypeModules(): Collection
    {
        return $this->typeModules;
    }

    public function addTypeModule(TypeModule $typeModule): self
    {
        if (!$this->typeModules->contains($typeModule)) {
            $this->typeModules[] = $typeModule;
            $typeModule->addFamilleComposant($this);
        }

        return $this;
    }

    public function removeTypeModule(TypeModule $typeModule): self
    {
        if ($this->typeModules->removeElement($typeModule)) {
            $typeModule->removeFamilleComposant($this);
        }

        return $this;
    }
}
