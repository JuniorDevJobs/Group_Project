import os
from celery import Celery

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend_proj.settings')

app = Celery('backend_proj')
app.config_from_object('django.conf:settings', namespace='CELERY')

app.autodiscover_tasks()