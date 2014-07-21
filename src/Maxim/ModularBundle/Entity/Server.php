<?php
/**
 * Author: Maxim
 * Date: 20/07/2014
 * Time: 21:48
 * Property of MCSuite
 */

namespace Maxim\ModularBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;

class Server
{
    protected $id;

    protected $name;
    protected $ip;
    protected $port;
    protected $user;

    protected $createdAt;
    protected $updatedAt;

    protected $hub = false;
    protected $parent;
    protected $subServers;

    public function __construct($name = NULL, $user = NULL)
    {
        $this->subServers = new ArrayCollection();
        $this->name = $name;
        $this->user = $user;
    }

    public function prePersist()
    {
        $this->createdAt = new \DateTime();
        $this->updatedAt = new \DateTime();
    }

    public function preUpdate()
    {
        $this->updatedAt = new \DateTime();
    }

    /**
     * @return mixed
     */
    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    /**
     * @param mixed $createdAt
     */
    public function setCreatedAt($createdAt)
    {
        $this->createdAt = $createdAt;
    }

    /**
     * @return mixed
     */
    public function isHub()
    {
        return $this->hub;
    }

    /**
     * @param mixed $hub
     */
    public function setHub($hub)
    {
        $this->hub = $hub;
    }

    /**
     * @return mixed
     */
    public function getIp()
    {
        return $this->ip;
    }

    /**
     * @param mixed $ip
     */
    public function setIp($ip)
    {
        $this->ip = $ip;
    }

    /**
     * @return mixed
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @param mixed $name
     */
    public function setName($name)
    {
        $this->name = $name;
    }

    /**
     * @return mixed
     */
    public function getParent()
    {
        return $this->parent;
    }

    /**
     * @param mixed $parent
     */
    public function setParent($parent)
    {
        $this->parent = $parent;
    }

    /**
     * @return mixed
     */
    public function getPort()
    {
        return $this->port;
    }

    /**
     * @param mixed $port
     */
    public function setPort($port)
    {
        $this->port = $port;
    }

    /**
     * @return mixed
     */
    public function getSubServers()
    {
        return $this->subServers;
    }

    /**
     * @param mixed $subServers
     */
    public function setSubServers($subServers)
    {
        $this->subServers = $subServers;
    }

    public function addSubServer($subServer)
    {
        $this->subServers->add($subServer);
    }

    /**
     * @return mixed
     */
    public function getUpdatedAt()
    {
        return $this->updatedAt;
    }

    /**
     * @param mixed $updatedAt
     */
    public function setUpdatedAt($updatedAt)
    {
        $this->updatedAt = $updatedAt;
    }

    /**
     * @return mixed
     */
    public function getUser()
    {
        return $this->user;
    }

    /**
     * @param mixed $user
     */
    public function setUser($user)
    {
        $this->user = $user;
    }

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param mixed $id
     */
    public function setId($id)
    {
        $this->id = $id;
    }


}