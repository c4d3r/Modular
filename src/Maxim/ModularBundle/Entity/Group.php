<?php
/**
 * Author: Maxim
 * Date: 16/07/2014
 * Time: 21:01
 * Property of MCSuite
 */

namespace Maxim\ModularBundle\Entity;

use FOS\UserBundle\Model\Group as BaseGroup;

class Group  extends BaseGroup
{
    const ROLE_ADMIN = "ROLE_ADMIN";
    const ROLE_BANNED = "ROLE_BANNED";
    const ROLE_MEMBER = "ROLE_MEMBER";
    const ROLE_GUEST = "ROLE_GUEST";

    protected $id;

    protected $cssClass;

    protected $description;

    protected $default;

    protected $users;

    public function __construct($name = null, $roles = array())
    {
        parent::__construct($name);
    }

    public function __toString()
    {
        return $this->name;
    }

    /**
     * @return mixed
     */
    public function getCssClass()
    {
        return $this->cssClass;
    }

    /**
     * @param mixed $cssClass
     */
    public function setCssClass($cssClass)
    {
        $this->cssClass = $cssClass;
    }

    /**
     * @return mixed
     */
    public function getDefault()
    {
        return $this->default;
    }

    /**
     * @param mixed $default
     */
    public function setDefault($default)
    {
        $this->default = $default;
    }

    /**
     * @return mixed
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * @param mixed $description
     */
    public function setDescription($description)
    {
        $this->description = $description;
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

    /**
     * @return mixed
     */
    public function getUsers()
    {
        return $this->users;
    }

    /**
     * @param mixed $users
     */
    public function setUsers($users)
    {
        $this->users = $users;
    }

    public function addUser($user)
    {
        $this->users[] = $user;
    }

} 