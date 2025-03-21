from django.core.management.base import BaseCommand
from django_celery_beat.models import PeriodicTask, IntervalSchedule
import json

class Command(BaseCommand):
    help = "Creates a periodic task to fetch and update Apify data every month"

    def handle(self, *args, **kwargs):
        # Create or get the schedule
        schedule, created = IntervalSchedule.objects.get_or_create(
            every=1,
            period=IntervalSchedule.DAYS,  # Change to MONTHS if needed
        )

        # Create the periodic task
        task_name = "fetch_apify_data_task"
        task, created = PeriodicTask.objects.update_or_create(
            name=task_name,
            defaults={
                "interval": schedule,
                "task": "jobs.tasks.fetch_and_update_data",
                "args": json.dumps([]),
                "kwargs": json.dumps({}),
            },
        )

        if created:
            self.stdout.write(self.style.SUCCESS(f"✅ Created periodic task: {task_name}"))
        else:
            self.stdout.write(self.style.SUCCESS(f"✅ Updated periodic task: {task_name}"))
