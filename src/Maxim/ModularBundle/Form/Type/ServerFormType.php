<?php
/**
 * Author: Maxim
 * Date: 20/07/2014
 * Time: 21:23
 * Property of MCSuite
 */
namespace Maxim\ModularBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;

class ServerFormType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('name', 'text', array('required' => true))
            ->add('hub', 'checkbox', array('required' => false))
            ->add('ip', 'text', array('required' => false))
            ->add('port', 'number', array('required' => false))
        ;

        $builder->addEventListener(FormEvents::PRE_SET_DATA, function (FormEvent $event){

            $server = $event->getData();
            $form = $event->getForm();


            if($server && $server->getId() !== null) {
                $form->remove('hub');

                if($server->isHub()) {
                    $form->remove('ip');
                    $form->remove('port');
                }
            }

        });
    }

    public function getName()
    {
        return "maxim_modular_server_form";
    }
} 