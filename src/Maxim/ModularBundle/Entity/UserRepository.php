<?php
/**
 * Author: Maxim
 * Date: 16/07/2014
 * Time: 15:16
 * Property of MCSuite
 */
namespace Maxim\ModularBundle\Entity;

use Doctrine\ORM\EntityRepository;

class UserRepository extends EntityRepository
{
    public function findLatestUsers($amount)
    {
        $query = $this->getEntityManager()->createQuery(
            "SELECT u
            FROM MaximModularBundle:User u
            ORDER BY u.createdAt DESC"
        );
        $query->setMaxResults($amount);
        return $query->getResult();
    }
} 