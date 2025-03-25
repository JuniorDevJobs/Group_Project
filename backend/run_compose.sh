#!/bin/bash

apt-get update && apt-get install -y postgresql-client redis-tools

if command -v apt-get &> /dev/null; then
    apt-get update && apt-get install -y jq 
else
    yes | brew install jq
fi

echo "Waiting for PostgreSQL to be available..."
until pg_isready -U jobs_user -h db -p 5432; do
  echo "PostgreSQL is unavailable - retrying in 2 seconds..."
  sleep 2
done

python manage.py makemigrations

python manage.py migrate 


celery -A backend_proj.celery beat --detach --loglevel=info

celery -A backend_proj.celery worker --detach --loglevel=info

# Run the Apify data fetch **immediately** on startup to fill database
python manage.py fetch_apify_data

# python manage.py runserver 0.0.0.0:8000
