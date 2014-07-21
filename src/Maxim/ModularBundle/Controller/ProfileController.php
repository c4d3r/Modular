<?php
/**
 * Author: Maxim
 * Date: 20/07/2014
 * Time: 17:39
 * Property of MCSuite
 */

namespace Maxim\ModularBundle\Controller;


use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use FOS\UserBundle\Controller\ProfileController as BaseController;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use FOS\UserBundle\Model\UserInterface;

class ProfileController extends BaseController
{
    public function showAction()
    {
        $user = $this->container->get('security.context')->getToken()->getUser();
        if (!is_object($user) || !$user instanceof UserInterface) {
            throw new AccessDeniedException('This user does not have access to this section.');
        }

        $data['user'] = $user;
        $data['servers'] = $this->container->get('doctrine')->getRepository('MaximModularBundle:Server')->findBy(array("user" => $user));

        return $this->container->get('templating')->renderResponse('MaximModularBundle:Profile:profile.html.'.$this->container->getParameter('fos_user.template.engine'), $data);
    }
} 