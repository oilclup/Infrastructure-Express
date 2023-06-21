main: start
up: start
down: stop

sh:
	docker exec -it ${app} sh

bash:
	docker exec -it ${app} bash

start:
	@echo "Run all services production mode"
	docker-compose up --build -d

dev:
	@echo "Run all services development mode"
	docker-compose up --build

stop:
	docker-compose down

test:
	@echo "Run all services development mode"
	docker-compose -f docker-compose.dev.yml up --build

down-test:
	docker-compose -f docker-compose.dev.yml down

staging:
	@echo "Run all services staging mode"
	docker-compose -f docker-compose.staging.yml up --build

down-staging:
	docker-compose -f docker-compose.staging.yml down

prune:
	docker system prune -a --all