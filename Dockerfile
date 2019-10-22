FROM ubuntu:16.04

RUN apt-get update -y && \
    apt-get install -y python-pip python-dev

COPY ./requirements.txt /app/requirements.txt

WORKDIR /app

RUN pip install -r requirements.txt

COPY . /app

ENV FLASK_APP=stuff-doer
ENV FLASK_ENV=development

ENTRYPOINT ["flask"]

CMD ["run", "--host=0.0.0.0"]