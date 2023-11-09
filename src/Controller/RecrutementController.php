<?php

namespace App\Controller;

use App\Entity\Candidate;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use PhpParser\Node\Stmt\TryCatch;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;

#[Route('/recrutement')]
class RecrutementController extends AbstractController
{
    #[Route('', name: 'app_recrutement')]
    public function index(): Response
    {
        return $this->render('recrutement/index.html.twig', [
            'controller_name' => 'RecrutementController',
        ]);
    }

    #[Route('/add', name: 'app_recrutement_add', methods: ["GET"])]
    public function add(Request $request, EntityManagerInterface $em = NULL): Response
    {
        try {
            $em->beginTransaction();
            $candidate = new Candidate();
            $candidate
                ->setFirstName($request->get("firstName"))
                ->setLastName($request->get("lastName"))
                ->setBirthDate(new \DateTime($request->get("birth_date")))
                ->setSex($request->get("sex"))
                ->setCurrentAddress($request->get("current_address"))
                ->setNni($request->get("nni"))
                ->setIdCard($request->get("id_card"))
                ->setUsualDistrict($request->get("usualDistrict"))
                ->setTemporalDistrict($request->get("temporalDistrict"))
                ->setPostingDistrict($request->get("posting_district"))
                ->setPhone($request->get("phone"))
                ->setWhatshappPhone($request->get("whatsappPhone"))
                ->setPhone2($request->get("phone2"))
                ->setPhone3($request->get("phone3"))
                ->setEmail($request->get("email"))
                ->setDiploma($request->get("diploma"))
                ->setFileDiploma($request->get("diplomaFile"))
                ->setLanguage1($request->get("language1"))
                ->setLanguage2($request->get("language2"))
                ->setLanguage3($request->get("language3"))
                ->setProfession($request->get("profession"))
                ->setComputerKnowledge($request->get("computer_knowledge"))
                ->setDigitalExperience($request->get("digitalExperience"))
                ->setCensuOrSurveyExperience($request->get("censuOrSurveyExperience"))
                ->setNbrCensusOrSurvey($request->get("nbr_census_or_survey"))
                ->setFileExperienceCensusOrSurvey("1234")
                // ->setFileExperienceCensusOrSurvey($request->get("zone_attest_experience_census_or_surveys"))
                ->setFileCv("1234")
                // ->setFileCv($request->get("curriculum_vitae"))
                ->setCaptcha($request->get("captcha"));

            // tell Doctrine you want to (eventually) save the Product (no queries yet)
            $em->persist($candidate);

            // actually executes the queries (i.e. the INSERT query)
            $em->flush();
            $em->commit();

            return new Response('Candidate enregistré ID :' . $candidate->getId());
            //return $this->json([]);
        } catch (\Throwable $th) {
            $em->rollback();
            return new Response($th->getMessage(), 500);
            // return $this->json($th->getMessage(), 500);
        }
    }
}
