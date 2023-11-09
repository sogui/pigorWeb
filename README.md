# Mise en place du serveur de base de données pigordb
  php bin/console doctrine:database:create
# Generation de l'entité
  candidate Table name
	firstName
	lastName
	sex
	birth_date
	current_address
	nin
	id_card
	usualDistrict
	temporalDistrict
	localDistrict
	posting_district
	phone
	phone2
	phone3
	whatsappPhone
	email
	diploma
	diplomaFile
	profession
	language1
	language2
	language3
	computer_knowledge
	digitalExperience
	censuOrSurveyExperience
	nbr_census_or_survey
	zone_attest_experience_census_or_surveys
	curriculum_vitae
	create_at
	update_at
	id_opsaisie
	is_delete
	statut
    php bin/console make:entity Candidate
# Persistance dans la base de données
    php bin/console make:migration
    php bin/console doctrine:migrations:migrate (symfony console d:m:m)
    php bin/console doctrine:schema:update --dump-sql  'pour visualiser la requete a executé'