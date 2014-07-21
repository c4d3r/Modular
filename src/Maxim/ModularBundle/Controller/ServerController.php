<?php
/**
 * Author: Maxim
 * Date: 20/07/2014
 * Time: 21:18
 * Property of MCSuite
 */

namespace Maxim\ModularBundle\Controller;

use Maxim\ModularBundle\Entity\Server;
use Maxim\ModularBundle\Form\Type\ServerFormType;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\File\Exception\AccessDeniedException;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class ServerController extends Controller
{
    public function addAction($parentId = null)
    {
        $em = $this->getDoctrine()->getManager();
        $request = Request::createFromGlobals();
        $action = $this->generateUrl('server_add');

        // check for parent servers (HUB support)
        if(isset($parentId) && $parentId != null) {
            $action = $this->generateUrl('server_hub_add', array("parentId" => $parentId));
        }

        $serverForm = $this->createForm(new ServerFormType(), null, array(
            'action' => $action
        ));

        if($request->isMethod('POST'))
        {
            $serverForm->handleRequest($request);

            if($serverForm->isValid())
            {
                $data = $serverForm->getData();
                $server = new Server($data['name'], $this->getUser());

                // verify if it's a hub, if it is, add server to hub as well
                if(isset($data['hub']) && $data['hub'] == true && !isset($parentId))
                {
                    $server->setHub(true);
                }
                else
                {
                    // check for parent servers (HUB support)
                    if(isset($parentId) && $parentId != null) {

                        $parentServer = $em->getRepository('MaximModularBundle:Server')->findOneBy(array("id" => $parentId));

                        if(!$parentServer)
                            return $this->createNotFoundException("Could not find parent server");

                        if(!($parentServer->getUser() == $this->getUser()))
                            throw new AccessDeniedException("You do not own this server");

                        $server->setParent($parentServer);
                        $parentServer->addSubServer($server);
                    }

                    $server->setIp($data['ip']);
                    $server->setPort($data['port']);
                }

                $em->persist($server);
                $em->flush();

                return $this->redirect($this->generateUrl('fos_user_profile_show'));
            }
        }

        return $this->render('MaximModularBundle:Server/PartialView:add.html.twig',
            array(
                "serverForm" => $serverForm->createView()
            )
        );
    }

    public function removeAction($serverId)
    {
        $request = Request::createFromGlobals();
        $em = $this->getDoctrine()->getManager();

        if(!$request->isMethod('DELETE'))
            throw new AccessDeniedException("Illegal request Method");

        $server = $em->getRepository('MaximModularBundle:Server')->findOneBy(array("id" => $serverId));

        if(!$server)
            return $this->createNotFoundException("Could not find server");

        if($server->getUser() != $this->getUser())
            throw new AccessDeniedException("You do not have control over this server");

        $em->remove($server);
        $em->flush();

        return new JsonResponse(array("success" => true, "message" =>  sprintf('The server with name "%s" has been deleted succesfully', $server->getName())));

    }

    public function editAction($serverId)
    {
        $em = $this->getDoctrine()->getManager();
        $request = Request::createFromGlobals();

        $server = $em->getRepository('MaximModularBundle:Server')->findOneBy(array("id" => $serverId));

        if(!$server)
            return $this->createNotFoundException("Could not find server");

        if($server->getUser() != $this->getUser())
            throw new AccessDeniedException("You do not have control over this server");

        $serverForm = $this->createForm(new ServerFormType(), $server, array(
            'action' => $this->generateUrl('server_edit', array("serverId" => $server->getId()))
        ));

        if($request->isMethod('POST')) {
            $serverForm->handleRequest($request);

            if ($serverForm->isValid()) {
                $em->flush();

                return $this->redirect($this->generateUrl('fos_user_profile_show'));
            }
        }

        $data['serverForm'] = $serverForm->createView();
        $data['server'] = $server;

        return $this->render('MaximModularBundle:Server/PartialView:edit.html.twig', $data);
    }
}