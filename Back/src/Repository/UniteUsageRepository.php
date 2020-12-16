<?php

namespace App\Repository;

use App\Entity\UniteUsage;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method UniteUsage|null find($id, $lockMode = null, $lockVersion = null)
 * @method UniteUsage|null findOneBy(array $criteria, array $orderBy = null)
 * @method UniteUsage[]    findAll()
 * @method UniteUsage[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UniteUsageRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, UniteUsage::class);
    }

    // /**
    //  * @return UniteUsage[] Returns an array of UniteUsage objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('u.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?UniteUsage
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
