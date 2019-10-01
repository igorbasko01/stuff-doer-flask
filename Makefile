.PHONY: clean build run

build:
	docker build -t stuff-doer:latest .

run:
	docker run -p 127.0.0.1:5000:8080 stuff-doer:latest
