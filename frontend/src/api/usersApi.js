const apiUrl = "http://localhost:8000"

async function basicFetch(url, payload) {
    const res = await fetch(url, payload)
    const body = await res.json()
    return body
  }
  
  
  export async function deleteUser(context, token) {
    console.log(token)
    const payload = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(context)
    }
    const body = await basicFetch(`${apiUrl}/accounts/delete-user/`,payload)
    return body
  }