
up:                   ## Run project instance in Docker
	@docker-compose -f docker-compose.local.yml up -d --build --remove-orphans --force-recreate

build:                   ## Run project instance in Docker
	@docker-compose -f docker-compose.local.yml build

down:
	@docker-compose -f docker-compose.local.yml down


ps: 					## List all running containers
	@docker-compose -f docker-compose.local.yml ps