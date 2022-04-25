import { useAtom } from 'jotai'
import { userAtom } from '../store/store'
import { Navigate, Outlet } from 'react-router-dom'

function RequireAuth(): JSX.Element {
  const [loggedInUser] = useAtom(userAtom)

  return (
    loggedInUser?.authToken
      ? <Outlet />
      : <Navigate to="/" />
  )
}

export default RequireAuth