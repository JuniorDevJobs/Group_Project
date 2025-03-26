
const apiUrl = "http://localhost:8090/web"

async function basicFetch(url, payload) {
    const res = await fetch(url, payload)
    const body = await res.json()
    return body
  }

export async function fetchJobs(context,token) {
console.log(context.location)
const payload = {
    method: "GET",
    headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
    },
    //expecting a list of results
}
let body
try { 
  if (context.location && context.title){
    const body = await basicFetch(
      `${apiUrl}/jobs/search/?title=${context.title}&location=${context.location}`,
      payload
    );
    console.log("Location and title:" ,body);
    return body
} else if (!context.title) {
    const body = await basicFetch(
      `${apiUrl}/jobs/search/?title=developer&location=${context.location}`,
      payload);
      console.log("Location only:" ,body);
      return body
  }else if (!context.location) {
    const body = await basicFetch(
      `${apiUrl}/jobs/search/?title=${context.title}&location=USA`,
      payload);
      console.log("Title only:" ,body);
      return body
  }
} catch (error) {
  console.error("Error fetching jobs:", error);
  return null;
}
}

