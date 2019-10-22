.PHONY: clean build run

build:
	docker build -t stuff-doer-flask:latest .

run:
	docker run -p 5000:5000 stuff-doer-flask:latest
