const apiUrl = "http://localhost:8090/web"

async function basicFetch(url, payload) {
  const res = await fetch(url, payload);

  // If the response status is 204 (No Content), return null
  if (res.status === 204) {
      return null; // No content to parse for status 204
  }

  // If there's a body, attempt to parse it as JSON
  const body = await res.json().catch(() => null); // In case the response isn't valid JSON
  return body;
}
  
export async function deleteUser(token) {
  const payload = {
      method: "DELETE",
      headers: {
          "Authorization": `Bearer ${token}`, // Only the Authorization header
      },
  }

  const body = await basicFetch(`${apiUrl}/accounts/delete-user/`, payload);
  
  // If there's no body (status 204), return success message
  if (!body) {
      return "User Deleted Successfully"; 
  }

  // If there is a response body, log and handle it (for errors, etc.)
  console.log("Response Body:", body);
  return body;  // You can adjust this depending on the response format
}


export async function updateUser(context, token) {
    console.log(context)
    const payload = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(context)
    }
    const body = await basicFetch(`${apiUrl}/accounts/update-user/`,payload)
    return body
  }


export async function getSearches(token) {
    const payload = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    }
    
    try {
      const response = await fetch(`${apiUrl}/accounts/get-searches/`, payload);
      if (!response.ok) {
          console.error("Error fetching searches:", response.status, response.statusText);
          return null;
      }
      const body = await response.json();
      return body;
  } catch (error) {
      console.error("Fetch error:", error);
      return null;
  }
}