import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'

function App(): JSX.Element {  
  return (
    <Container>
      <Header />
      <Box sx={{ mt: 8 }}>
        <Outlet />

      </Box>
    </Container>
  );
}

export default App
