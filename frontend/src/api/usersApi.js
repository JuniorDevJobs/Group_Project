const apiUrl = "http://localhost:8000"

async function basicFetch(url, payload) {
    const res = await fetch(url, payload)
    const body = await res.json()
    return body
  }
  
  
  export async function deleteUser(token) {
    const payload = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    }
    console.log("Authorization Header:", payload.headers.Authorization);
    const body = await basicFetch(`${apiUrl}/accounts/delete-user/`,payload)
    return body
  }