<?php

namespace App\Repository;

use App\Entity\ConceptionOssature;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method ConceptionOssature|null find($id, $lockMode = null, $lockVersion = null)
 * @method ConceptionOssature|null findOneBy(array $criteria, array $orderBy = null)
 * @method ConceptionOssature[]    findAll()
 * @method ConceptionOssature[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ConceptionOssatureRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ConceptionOssature::class);
    }

    // /**
    //  * @return ConceptionOssature[] Returns an array of ConceptionOssature objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('c.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?ConceptionOssature
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
