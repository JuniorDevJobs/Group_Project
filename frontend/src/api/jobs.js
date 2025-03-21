const apiUrl = "http://localhost:8000"

async function basicFetch(url, payload) {
    const res = await fetch(url, payload)
    const body = await res.json()
    return body
  }

export async function fetchJobs(location, token) {
console.log(location)
const payload = {
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    },
    //expecting a list of results
}
const body = await basicFetch(`${apiUrl}/jobs/search/?job_title=developer&location=${location}`,payload)
console.log(body)
return body
}