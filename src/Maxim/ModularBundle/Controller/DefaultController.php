<?php
/**
 * Author: Maxim
 * Date: 16/07/2014
 * Time: 15:00
 * Property of MCSuite
 */
namespace Maxim\ModularBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction()
    {
        return $this->render('MaximModularBundle:Default:home.html.twig');
    }
} 