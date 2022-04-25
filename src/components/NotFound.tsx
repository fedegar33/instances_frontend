import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';

function NotFound(): JSX.Element {
  const MainLink = styled(Link)({
    color: 'inherit',
    paddingTop: 8
  })

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 8 }}>
      <Typography variant="h4" sx={{ }}>
        Sorry, this page is not available.
      </Typography>
      <MainLink to="/" >Go back to the main page.</MainLink>
    </Box>
  );
}

export default NotFound
