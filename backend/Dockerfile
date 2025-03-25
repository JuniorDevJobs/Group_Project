FROM python:3.11

WORKDIR /app

COPY ./requirements.txt .
RUN pip install -r requirements.txt

COPY . .

# EXPOSE 8000

CMD gunicorn --bind 0.0.0.0:8000 --workers 3 backend_proj.wsgi:application
# CMD ["sh", "-c", "python manage.py migrate && python manage.py setup_celery_task && python manage.py runserver 0.0.0.0:8000"]

