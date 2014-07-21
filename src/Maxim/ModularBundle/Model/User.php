<?php
/**
 * Author: Maxim
 * Date: 16/07/2014
 * Time: 15:06
 * Property of MCSuite
 */
namespace Maxim\ModularBundle\Model;

use Doctrine\Common\Collections\ArrayCollection;
use FOS\UserBundle\Model\User as BaseUser;

abstract class User extends BaseUser
{
    protected $ownedProducts;

    protected $lastIp;

    protected $createdAt;

    protected $updatedAt;

    public function __construct()
    {
        parent::__construct();
    }

    /**
     * @return mixed
     */
    public function getOwnedProducts()
    {
        return $this->ownedProducts;
    }

    /**
     * @param mixed $ownedProducts
     */
    public function setOwnedProducts($ownedProducts)
    {
        $this->ownedProducts = $ownedProducts;
    }

    /**
     * @return mixed
     */
    public function getGroups()
    {
        return $this->groups;
    }

    /**
     * @param mixed $groups
     */
    public function setGroups($groups)
    {
        $this->groups = $groups;
    }
} 