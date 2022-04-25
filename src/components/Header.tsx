import React, { useState, useEffect } from 'react'
import { useAtom } from 'jotai'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton'
import AccountCircle from '@mui/icons-material/AccountCircle'
import { styled } from '@mui/system'
import { Link } from 'react-router-dom'
import { userAtom } from '../store/store'

function Header(): JSX.Element {
  const [loggedInUser] = useAtom(userAtom)
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  useEffect(() => {
    if (!loggedInUser) {
      setAnchorEl(null)
    }
  }, [loggedInUser])

  function handleOpenMenu(e: React.MouseEvent<HTMLElement>) {
    setAnchorEl(e.currentTarget)
  }

  function handleCloseMenu() {
    setAnchorEl(null)
  }

  const LogoutLink = styled(Link)({
    textDecoration: 'none',
    color: 'inherit'
  })

  return (
    <AppBar>
      <Container>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            EC2 Instances Dashboard
          </Typography>
          { loggedInUser?.authToken &&
            <>
              <Typography>
                {loggedInUser?.username}
              </Typography>
              <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
                <AccountCircle />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
              >
                <MenuItem key="Log out">
                  <LogoutLink to="/">
                    <Typography>Log out</Typography>
                  </LogoutLink>
                </MenuItem>
              </Menu>
            </>
          }
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header
