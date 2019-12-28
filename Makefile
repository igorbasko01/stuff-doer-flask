.PHONY: rundb build run runall

rundb:
	docker-compose -f docker-compose-all.yml up db

build:
	docker build -t stuff-doer-flask:latest .

run:
	docker run -p 5000:5000 stuff-doer-flask:latest

runall:
	docker-compose -f docker-compose-all.yml up

