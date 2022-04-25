import { User } from '../store/store'

export enum InstanceStates {
  Running = 'Running',
  Pending = 'Pending',
  Stopping = 'Stopping',
  Stopped = 'Stopped'
}

export enum InstanceSizes {
  Micro = "micro",
  Small = "small",
  Medium = "medium",
  Large = "large",
  XLarge = "xlarge"
}

export type EC2Instance = {
  name: string
  id: string
  type: string
  size: InstanceSizes
  state: InstanceStates
  az: string
  publicIp: string
  privateIp: string
}

export type InstancesResponse = {
  success: boolean
  errorMessage?: string
  instances?: EC2Instance[]
}

export async function getInstances(): Promise<InstancesResponse> {
  const userAuthToken = getUserAuthToken()
  const response = await window.fetch(`${process.env.REACT_APP_API_URL}ec2instances`, {
    headers: {
      'Authorization': userAuthToken ? `Bearer ${userAuthToken}` : ''
    }
  })

  if (response.ok) {
    return {
      success: true,
      instances: await response.json()
    }
  }
  
  return {
    success: false,
    errorMessage: 'We couldn\'t load your instances at this time. Please try again later.'
  }
}

function getUserAuthToken(): string | null {
  const loggedInUser = window.localStorage.getItem('loggedInUser')

  if (loggedInUser) {
    const { authToken } = JSON.parse(loggedInUser) as User
    return authToken 
  }

  return null
}
