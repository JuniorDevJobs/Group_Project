FROM python:3.12
WORKDIR /app
COPY ./requirements.txt /app/
RUN pip install -r requirements.txt
COPY . /app/
CMD gunicorn --bind 0.0.0.0:8000 --workers 3 encouragement_proj.wsgi:application