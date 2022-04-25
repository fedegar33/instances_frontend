import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from '../App'
import Login from './Login'
import RequireAuth from './RequireAuth'
import NotFound from './NotFound'
import Instances from './Instances'

function Router(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<Login />} />
          <Route element={<RequireAuth />}>
            <Route path="instances" element={<Instances />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
