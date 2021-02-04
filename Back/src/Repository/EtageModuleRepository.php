<?php

namespace App\Repository;

use App\Entity\EtageModule;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method EtageModule|null find($id, $lockMode = null, $lockVersion = null)
 * @method EtageModule|null findOneBy(array $criteria, array $orderBy = null)
 * @method EtageModule[]    findAll()
 * @method EtageModule[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class EtageModuleRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, EtageModule::class);
    }

    // /**
    //  * @return EtageModule[] Returns an array of EtageModule objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('e')
            ->andWhere('e.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('e.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?EtageModule
    {
        return $this->createQueryBuilder('e')
            ->andWhere('e.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
