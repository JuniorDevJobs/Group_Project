
const apiUrl = "http://localhost:8090/web"
const FINDWORK_API_KEY = import.meta.env.VITE_FINDWORK_API_KEY;

async function basicFetch(url, payload) {
    const res = await fetch(url, payload)
    const body = await res.json()
    return body
  }

export async function fetchJobs(location) {
console.log(location)
const payload = {
    method: "GET",
    headers: {
    "Content-Type": "application/json",
    "Authorization": `Token ${FINDWORK_API_KEY}`
    },
    //expecting a list of results
}
try {
  const body = await basicFetch(
    `${apiUrl}/jobs/search/?title=developer&location=${location}`,
    payload
  );

  console.log(body);
  return body;
} catch (error) {
  console.error("Error fetching jobs:", error);
  return null;
}
}