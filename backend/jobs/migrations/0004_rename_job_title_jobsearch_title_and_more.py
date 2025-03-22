# Generated by Django 5.1.7 on 2025-03-22 14:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jobs', '0003_indeedjoblistings'),
    ]

    operations = [
        migrations.RenameField(
            model_name='jobsearch',
            old_name='job_title',
            new_name='title',
        ),
        migrations.RenameField(
            model_name='jobsearch',
            old_name='job_url_link',
            new_name='url',
        ),
        migrations.AddField(
            model_name='jobsearch',
            name='company',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='jobsearch',
            name='description',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='jobsearch',
            name='location',
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.AddField(
            model_name='jobsearch',
            name='source',
            field=models.CharField(default='All', max_length=500),
        ),
    ]
