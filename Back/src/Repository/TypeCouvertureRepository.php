<?php

namespace App\Repository;

use App\Entity\TypeCouverture;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method TypeCouverture|null find($id, $lockMode = null, $lockVersion = null)
 * @method TypeCouverture|null findOneBy(array $criteria, array $orderBy = null)
 * @method TypeCouverture[]    findAll()
 * @method TypeCouverture[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class TypeCouvertureRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, TypeCouverture::class);
    }

    // /**
    //  * @return TypeCouverture[] Returns an array of TypeCouverture objects
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
    public function findOneBySomeField($value): ?TypeCouverture
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
