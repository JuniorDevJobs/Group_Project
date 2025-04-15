
const apiUrl = "http://3.80.134.120:8090/web"

async function basicFetch(url, payload) {
    const res = await fetch(url, payload)
    const body = await res.json()
    return body
  }

export async function fetchJobs(context,token) {
const headers = {
  "Content-Type": "application/json",
};
if (token){
  headers["Authorization"] = `Bearer ${token}`; // check if token so the search is saved
}
const payload = {
    method: "GET",
    headers: headers
    //expecting a list of results
}
let body
try { 
  if (context.location && context.title){
    const body = await basicFetch(
      `${apiUrl}/jobs/search/?title=${context.title}&location=${context.location}`,
      payload
    );
    return body
} else if (!context.title) {
    const body = await basicFetch(
      `${apiUrl}/jobs/search/?title=developer&location=${context.location}`,
      payload);
      return body
  }else if (!context.location) {
    const body = await basicFetch(
      `${apiUrl}/jobs/search/?title=${context.title}&location=USA`,
      payload);
      return body
  }
} catch (error) {
  console.error("Error fetching jobs:", error);
  return null;
}
}
