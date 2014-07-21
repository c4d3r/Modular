<?php
/**
 * Author: Maxim
 * Date: 16/07/2014
 * Time: 19:45
 * Property of MCSuite
 */
namespace Maxim\ModularBundle\Entity;

use Maxim\ModularBundle\Model\User as BaseUser;

class User extends BaseUser
{
    protected $id;

    protected $servers;

    public function __construct()
    {
        parent::__construct();
    }

    public function getGroup()
    {
       /* if($this->groups[0] != null)
            return $this->groups[0];

        $group = new Group('Member', array('ROLE_MEMBER'));
        $group->setCssClass('group-member');
        return $group;     */
        return null;
    }

    /**
     * Hook on pre-persist operations
     */
    public function prePersist()
    {
        $this->createdAt = new \DateTime;
        $this->updatedAt = new \DateTime;
    }

    /**
     * Hook on pre-update operations
     */
    public function preUpdate()
    {
        $this->updatedAt = new \DateTime;
    }

    /**
     * @return mixed
     */
    public function getServers()
    {
        return $this->servers;
    }

    /**
     * @param mixed $servers
     */
    public function setServers($servers)
    {
        $this->servers = $servers;
    }

    public function addServer($server)
    {
        $this->servers[] = $server;
    }
} 