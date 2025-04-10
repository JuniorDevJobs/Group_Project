#!/bin/sh

# The Dockerhub account where the images are stored
export DOCKERHUB_UNAME=danyelleh

# These environment variables come from command line arguments.
# They are consumed by the docker-compose file.
export SECRET_KEY=$1
export DEBUG=$2
export NEW_VERSION=$3
export POSTGRES_DB=protein_db
export POSTGRES_USER=postgres
export POSTGRES_PASSWORD=postgres

docker-compose -f docker-compose.prod.yml build --no-cache
docker-compose -f docker-compose.prod.yml up -d

# make sure the postgres container is ready, then run migrations
sleep 10 

docker exec ec2-user-api-1 python /src/manage.py makemigrations 
docker exec ec2-user-api-1 python /src/manage.py migrate
