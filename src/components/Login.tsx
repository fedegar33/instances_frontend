import { useState, useEffect } from 'react'
import { useAtom } from 'jotai'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import LinearProgress from '@mui/material/LinearProgress'
import LoadingButton from '@mui/lab/LoadingButton'
import { login, LoginResponse } from '../services/loginService'
import { userAtom, User } from '../store/store'

function Login(): JSX.Element {
  const [, setLoggedInUser] = useAtom(userAtom)
  const [username, setUsername] = useState('')
  const [usernameHasError, setUsernameHasError] = useState(false)
  const [usernameHelperText, setUsernameHelperText] = useState('')

  const [password, setPassword] = useState('')
  const [passwordHasError, setPasswordHasError] = useState(false)
  const [passwordHelperText, setPasswordHelperText] = useState('')

  const [formHelperText, setFormHelperText] = useState('')

  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    setLoggedInUser(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleUsernameChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setUsername(e.target.value)
  }

  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setPassword(e.target.value)
  }

  async function handleFormSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault()

    const isValidForm = validateForm()

    if (isValidForm) {
        setIsLoading(true)
        const { success, errorMessage, user }: LoginResponse = await login(username, password)

        if (success) {
          setLoggedInUser(user as User)
          setFormHelperText('')
          navigate('/instances')
        } else {
          setFormHelperText(errorMessage || '')
        }
        setIsLoading(false)
    } else {
      setFormHelperText('')
    }
  }

  function validateForm(): boolean {
    let isValid = true

    if (username.length === 0) {
      setUsernameHasError(true)
      setUsernameHelperText('Please input a valid username.')
      isValid = false
    } else {
      setUsernameHasError(false)
      setUsernameHelperText('')
    }

    if (password.length === 0) {
      setPasswordHasError(true)
      setPasswordHelperText('Please input a password.')
      isValid = false
    } else {
      setPasswordHasError(false)
      setPasswordHelperText('')
    }

    return isValid
  }

  return (
    <Box component="main" sx={{
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      pt: 12,
    }}>
      <Box sx={{
        width: 300,
        boxShadow: 1,
        padding: 2,
        backgroundColor: 'common.white'
      }}>
        <form id="login" onSubmit={handleFormSubmit}>
          <Grid container direction="column" spacing={2} sx={{ height: '100%'}}>
            <Grid item>
              <Typography variant="h5">Login</Typography>
            </Grid>
            <Grid item>
              <TextField
                id="username"
                name="username"
                label="User name"
                value={username}
                onChange={handleUsernameChange}
                error={usernameHasError}
                helperText={usernameHelperText}
                FormHelperTextProps={{ role: "alert" }}
                size="small"
                fullWidth
                autoFocus />
            </Grid>
            <Grid item>
              <TextField
                id="password"
                name="password"
                label="Password"
                value={password}
                onChange={handlePasswordChange}
                error={passwordHasError}
                helperText={passwordHelperText}
                FormHelperTextProps={{ role: "alert" }}
                type="password"
                size="small"
                autoComplete="on"
                fullWidth />
            </Grid>
            {
              formHelperText !== ''
                && <Grid item>
                  <Typography variant="caption" role="alert" sx={{ color: 'error.main' }}>
                    {formHelperText}
                  </Typography>
                </Grid>
            }
            <Grid item sx={{ mt: 1 }}>
              <LoadingButton
                type="submit"
                variant="contained"
                size="small"
                loading={isLoading}
                disabled={isLoading}
                fullWidth>
                Login
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      </Box>
      <LinearProgress />
    </Box>
  );
}

export default Login;
