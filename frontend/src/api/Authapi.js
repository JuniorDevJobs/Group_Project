const apiUrl = "http://3.80.134.120:8090/web"

async function basicFetch(url, payload) {
    const res = await fetch(url, payload)
    const body = await res.json()
    return body
  }
  
  
  export async function signup(context) {
    
    const payload = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(context)
    }
    const body = await basicFetch(`${apiUrl}/accounts/signup/`,payload)
    return body
  }
  

  export async function login(context) {
    
    const payload = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(context)
    }
    const body = await basicFetch(`${apiUrl}/accounts/login/`, payload)
    return body
  }

  
  
