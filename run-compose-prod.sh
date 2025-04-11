#!/bin/sh

# The Dockerhub account where the images are stored
export DOCKERHUB_UNAME=danyelleh

# These environment variables come from command line arguments.
# They are consumed by the docker-compose file.
export DOCKERHUB_UNAME=$1
export NEW_VERSION=$2


docker-compose -f docker-compose.prod.yml build --no-cache
docker-compose -f docker-compose.prod.yml up -d

# make sure the postgres container is ready, then run migrations

docker exec ec2-user-nginx-1 python3 /src/manage.py makemigrations 
docker exec ec2-user-nginx-1 python3 /src/manage.py migrate
