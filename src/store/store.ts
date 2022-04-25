import { atomWithStorage } from 'jotai/utils'

export type User = {
  username: string
  authToken: string
}

export const userAtom = atomWithStorage<User | null>('loggedInUser', null)
