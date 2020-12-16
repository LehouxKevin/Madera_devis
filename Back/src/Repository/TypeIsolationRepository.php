<?php

namespace App\Repository;

use App\Entity\TypeIsolation;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method TypeIsolation|null find($id, $lockMode = null, $lockVersion = null)
 * @method TypeIsolation|null findOneBy(array $criteria, array $orderBy = null)
 * @method TypeIsolation[]    findAll()
 * @method TypeIsolation[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class TypeIsolationRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, TypeIsolation::class);
    }

    // /**
    //  * @return TypeIsolation[] Returns an array of TypeIsolation objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('t')
            ->andWhere('t.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('t.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?TypeIsolation
    {
        return $this->createQueryBuilder('t')
            ->andWhere('t.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
