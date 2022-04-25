import { User } from '../store/store'

export type LoginResponse = {
  success: boolean
  errorMessage?: string
  user?: User
}

export async function login(username: string, password: string): Promise<LoginResponse> {
  const response = await window.fetch(`${process.env.REACT_APP_API_URL}login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password
    })
  })

  if (response.ok) {
    return {
      success: true,
      user: {
        username,
        authToken: await response.json()
      }
    }
  } else {
    return {
      success: false,
      errorMessage: await response.text()
    }
  }
}
