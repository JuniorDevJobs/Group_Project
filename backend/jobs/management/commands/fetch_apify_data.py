from jobs.models import IndeedJobListings
import requests
import time
from django.core.management.base import BaseCommand

APIFY_API_TOKEN = "apify_api_JeRbOtaooOMaBHJpalmHjJGzayDiBt2Kj1qJ"
ACTOR_RUN_URL = f"https://api.apify.com/v2/acts/misceres~indeed-scraper/runs?token={APIFY_API_TOKEN}"


class Command(BaseCommand):
    help = "Fetch job listings from Apify and update the database"

    def handle(self, *args, **kwargs):
        self.stdout.write("Starting Apify scraper...")
        dataset_id = self.run_scraper()
        if dataset_id:
            data = self.fetch_scraped_data(dataset_id)
            if data:
                self.save_to_database(data)

    def run_scraper(self):
        """ Start the Apify actor """
        payload = {
            "country": "US",
            "followApplyRedirects": False,
            "maxItems": 1, # amount returned, update to higher numberber <= 900 when ready for production/ec2 instance
            "parseCompanyDetails": False,
            "position": "junior developer",
            "saveOnlyUniqueItems": True
        }

        response = requests.post(ACTOR_RUN_URL, json=payload)

        if response.status_code == 201:
            run_id = response.json().get("data", {}).get("id")
            return self.wait_for_completion(run_id)
        else:
            self.stderr.write("Failed to start Apify scraper")
            return None

    def wait_for_completion(self, run_id):
        """ Wait for the Apify actor to finish running """
        status_url = f"https://api.apify.com/v2/actor-runs/{run_id}?token={APIFY_API_TOKEN}"

        while True:
            response = requests.get(status_url)
            status = response.json().get("data", {}).get("status")

            if status == "SUCCEEDED":
                return response.json().get("data", {}).get("defaultDatasetId")
            elif status in ["FAILED", "ABORTED"]:
                self.stderr.write("Apify scraper failed or was aborted.")
                return None

            time.sleep(10)  # Wait before checking again

    def fetch_scraped_data(self, dataset_id):
        """ Fetch job listings from Apify dataset """
        dataset_url = f"https://api.apify.com/v2/datasets/{dataset_id}/items?format=json"
        response = requests.get(dataset_url)

        if response.status_code == 200:
            return response.json()
        else:
            self.stderr.write("Failed to fetch dataset")
            return None

    def save_to_database(self, data):
        """ Save scraped job listings to Django database """
        IndeedJobListings.objects.all().delete()  # Clear old data

        for item in data:
            IndeedJobListings.objects.create(
                title=item.get("title", "N/A"),
                company=item.get("company", "N/A"),
                location=item.get("location", "N/A"),
                description=item.get("description", "No description available"),
                url=item.get("url", "#")
            )

        self.stdout.write("Database updated successfully!")
