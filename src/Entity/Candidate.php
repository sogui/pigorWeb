<?php

namespace App\Entity;

use App\Repository\CandidateRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CandidateRepository::class)]
class Candidate
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 100)]
    private ?string $firstName = null;

    #[ORM\Column(length: 100)]
    private ?string $lastName = null;

    #[ORM\Column(length: 1)]
    private ?string $sex = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    private ?\DateTimeInterface $birthDate = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $currentAddress = null;

    #[ORM\Column(length: 1)]
    private ?string $nni = null;

    #[ORM\Column(length: 50, unique: true)]
    private ?string $idCard = null;

    #[ORM\Column(length: 20)]
    private ?string $usualDistrict = null;

    #[ORM\Column(length: 20, nullable: true)]
    private ?string $temporalDistrict = null;

    #[ORM\Column(length: 20)]
    private ?string $postingDistrict = null;

    #[ORM\Column(unique: true)]
    private ?int $phone = null;

    #[ORM\Column(nullable: true)]
    private ?int $phone2 = null;

    #[ORM\Column(nullable: true)]
    private ?int $phone3 = null;

    #[ORM\Column(nullable: true)]
    private ?int $whatshappPhone = null;

    #[ORM\Column(length: 20)]
    private ?string $email = null;

    #[ORM\Column(length: 2)]
    private ?string $diploma = null;

    #[ORM\Column(length: 20)]
    private ?string $fileDiploma = null;

    #[ORM\Column(length: 2)]
    private ?string $profession = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $professionOther = null;

    #[ORM\Column(length: 2)]
    private ?string $language1 = null;

    #[ORM\Column(length: 2, nullable: true)]
    private ?string $language2 = null;

    #[ORM\Column(length: 2, nullable: true)]
    private ?string $language3 = null;

    #[ORM\Column(length: 2)]
    private ?string $isComputerKnowledge = null;

    #[ORM\Column]
    private ?bool $isDigitalExperience = null;

    #[ORM\Column]
    private ?bool $isCensuOrSurveyExperience = null;

    #[ORM\Column]
    private ?int $nbrCensusOrSurvey = null;

    #[ORM\Column(length: 20)]
    private ?string $fileExperienceCensusOrSurvey = null;

    #[ORM\Column(length: 20)]
    private ?string $fileCv = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $createAt = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $updateAt = null;

    #[ORM\Column]
    private ?bool $isDelete = null;

    #[ORM\Column]
    private ?bool $statut = null;

    #[ORM\Column(length: 50)]
    private ?string $uuid = null;

    #[ORM\Column(length: 6)]
    private ?string $numeroDossier = null;

    #[ORM\Column(length: 4)]
    private ?string $captcha = null;

    #[ORM\Column(length: 120)]
    private ?string $slug = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(string $name): static
    {
        $this->firstName = $name;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(string $middle): static
    {
        $this->lastName = $middle;

        return $this;
    }

    public function getSex(): ?string
    {
        return $this->sex;
    }

    public function setSex(string $sex): static
    {
        $this->sex = $sex;

        return $this;
    }

    public function getBirthDate(): ?\DateTimeInterface
    {
        return $this->birthDate;
    }

    public function setBirthDate(\DateTimeInterface $birthDate): static
    {
        $this->birthDate = $birthDate;

        return $this;
    }

    public function getCurrentAddress(): ?string
    {
        return $this->currentAddress;
    }

    public function setCurrentAddress(string $currentAddress): static
    {
        $this->currentAddress = $currentAddress;

        return $this;
    }

    public function getNni(): ?string
    {
        return $this->nni;
    }

    public function setNni(string $nni): static
    {
        $this->nni = $nni;

        return $this;
    }

    public function getIdCard(): ?string
    {
        return $this->idCard;
    }

    public function setIdCard(string $idCard): static
    {
        $this->idCard = $idCard;

        return $this;
    }

    public function getUsualDistrict(): ?string
    {
        return $this->usualDistrict;
    }

    public function setUsualDistrict(string $usualDistrict): static
    {
        $this->usualDistrict = $usualDistrict;

        return $this;
    }

    public function getTemporalDistrict(): ?string
    {
        return $this->temporalDistrict;
    }

    public function setTemporalDistrict(?string $temporalDistrict): static
    {
        $this->temporalDistrict = $temporalDistrict;

        return $this;
    }

    public function getPostingDistrict(): ?string
    {
        return $this->postingDistrict;
    }

    public function setPostingDistrict(string $postingDistrict): static
    {
        $this->postingDistrict = $postingDistrict;

        return $this;
    }

    public function getPhone(): ?int
    {
        return $this->phone;
    }

    public function setPhone(int $phone): static
    {
        $this->phone = $phone;

        return $this;
    }

    public function getPhone2(): ?int
    {
        return $this->phone2;
    }

    public function setPhone2(?int $phone2): static
    {
        $this->phone2 = $phone2;

        return $this;
    }

    public function getPhone3(): ?int
    {
        return $this->phone3;
    }

    public function setPhone3(?int $phone3): static
    {
        $this->phone3 = $phone3;

        return $this;
    }

    public function getWhatshappPhone(): ?int
    {
        return $this->whatshappPhone;
    }

    public function setWhatshappPhone(?int $whatshappPhone): static
    {
        $this->whatshappPhone = $whatshappPhone;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    public function getDiploma(): ?string
    {
        return $this->diploma;
    }

    public function setDiploma(string $diploma): static
    {
        $this->diploma = $diploma;

        return $this;
    }

    public function getFileDiploma(): ?string
    {
        return $this->fileDiploma;
    }

    public function setFileDiploma(string $fileDiploma): static
    {
        $this->fileDiploma = $fileDiploma;

        return $this;
    }

    public function getProfession(): ?string
    {
        return $this->profession;
    }

    public function setProfession(string $profession): static
    {
        $this->profession = $profession;

        return $this;
    }

    public function getProfessionOther(): ?string
    {
        return $this->professionOther;
    }

    public function setProfessionOther(?string $professionOther): static
    {
        $this->professionOther = $professionOther;

        return $this;
    }

    public function getLanguage1(): ?string
    {
        return $this->language1;
    }

    public function setLanguage1(string $language1): static
    {
        $this->language1 = $language1;

        return $this;
    }

    public function getLanguage2(): ?string
    {
        return $this->language2;
    }

    public function setLanguage2(?string $language2): static
    {
        $this->language2 = $language2;

        return $this;
    }

    public function getLanguage3(): ?string
    {
        return $this->language3;
    }

    public function setLanguage3(?string $language3): static
    {
        $this->language3 = $language3;

        return $this;
    }

    public function isComputerKnowledge(): ?string
    {
        return $this->isComputerKnowledge;
    }

    public function setComputerKnowledge(string $isComputerKnowledge): static
    {
        $this->isComputerKnowledge = $isComputerKnowledge;

        return $this;
    }

    public function isDigitalExperience(): ?bool
    {
        return $this->isDigitalExperience;
    }

    public function setDigitalExperience(bool $isDigitalExperience): static
    {
        $this->isDigitalExperience = $isDigitalExperience;

        return $this;
    }

    public function isCensuOrSurveyExperience(): ?bool
    {
        return $this->isCensuOrSurveyExperience;
    }

    public function setCensuOrSurveyExperience(bool $censuOrSurveyExperience): static
    {
        $this->isCensuOrSurveyExperience = $censuOrSurveyExperience;

        return $this;
    }

    public function getNbrCensusOrSurvey(): ?int
    {
        return $this->nbrCensusOrSurvey;
    }

    public function setNbrCensusOrSurvey(int $nbrCensusOrSurvey): static
    {
        $this->nbrCensusOrSurvey = $nbrCensusOrSurvey;

        return $this;
    }

    public function getFileExperienceCensusOrSurvey(): ?string
    {
        return $this->fileExperienceCensusOrSurvey;
    }

    public function setFileExperienceCensusOrSurvey(string $fileExperienceCensusOrSurvey): static
    {
        $this->fileExperienceCensusOrSurvey = $fileExperienceCensusOrSurvey;

        return $this;
    }

    public function getFileCv(): ?string
    {
        return $this->fileCv;
    }

    public function setFileCv(string $fileCv): static
    {
        $this->fileCv = $fileCv;

        return $this;
    }

    public function getCreateAt(): ?\DateTimeInterface
    {
        return $this->createAt;
    }

    public function setCreateAt(\DateTimeInterface $createAt): static
    {
        $this->createAt = $createAt;

        return $this;
    }

    public function getUpdateAt(): ?\DateTimeInterface
    {
        return $this->updateAt;
    }

    public function setUpdateAt(\DateTimeInterface $updateAt): static
    {
        $this->updateAt = $updateAt;

        return $this;
    }

    public function isDelete(): ?bool
    {
        return $this->isDelete;
    }

    public function setDelete(bool $isDelete): static
    {
        $this->isDelete = $isDelete;

        return $this;
    }

    public function isStatut(): ?bool
    {
        return $this->statut;
    }

    public function setStatut(bool $statut): static
    {
        $this->statut = $statut;

        return $this;
    }

    public function getUuid(): ?string
    {
        return $this->uuid;
    }

    public function setUuid(string $uuid): static
    {
        $this->uuid = $uuid;

        return $this;
    }

    public function getNumeroDossier(): ?string
    {
        return $this->numeroDossier;
    }

    public function setNumeroDossier(string $numeroDossier): static
    {
        $this->numeroDossier = $numeroDossier;

        return $this;
    }

    public function getCaptcha(): ?string
    {
        return $this->captcha;
    }

    public function setCaptcha(string $captcha): static
    {
        $this->captcha = $captcha;

        return $this;
    }

    public function getSlug(): ?string
    {
        return $this->slug;
    }

    public function setSlug(string $slug): static
    {
        $this->slug = $slug;

        return $this;
    }
}
