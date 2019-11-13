.PHONY: clean build run

rundb:
	docker-compose -f docker-compose-postgres.yml up db

build:
	docker build -t stuff-doer-flask:latest .

run:
	docker run -p 5000:5000 stuff-doer-flask:latest
