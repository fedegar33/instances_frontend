import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import Login from './Login'

const server = setupServer(
  rest.post(`${process.env.REACT_APP_API_URL}login`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json("myToken"))
  })
)

const mockedNavigator = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigator
}))

describe('Login', () => {
  beforeAll(() => server.listen())
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    )
  })
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  test('renders login form', () => {
    const loginHeader = screen.getByRole('heading', { name: /login/i });
    const usernameField = screen.getByRole('textbox', { name: /user name/i })
    const passwordField = screen.getByLabelText(/password/i)
    const loginButton = screen.getByRole('button', { name: /login/i })

    expect(loginHeader).toBeInTheDocument();
    expect(usernameField).toBeInTheDocument();
    expect(passwordField).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  })

  test('renders username and password validation errors when both field are empty', () => {
    const loginButton = screen.getByRole('button', { name: /login/i })
    userEvent.click(loginButton)

    const [usernameHelperText, passwordHelperText] = screen.getAllByRole('alert')
    
    expect(usernameHelperText).toHaveTextContent('Please input a valid username.')
    expect(passwordHelperText).toHaveTextContent('Please input a password.')
  })

  test('renders form validation error when both field are filled but login failed', async () => {
    server.use(
      rest.post(`${process.env.REACT_APP_API_URL}login`, (req, res, ctx) => res(ctx.status(401), ctx.text('login failed')))
    )

    const usernameField = screen.getByRole('textbox', { name: /user name/i })
    const passwordField = screen.getByLabelText(/password/i)
    const loginButton = screen.getByRole('button', { name: /login/i })

    userEvent.type(usernameField, 'testuser')
    userEvent.type(passwordField, 'password')
    userEvent.click(loginButton)

    const [formHelperText] = await screen.findAllByRole('alert')

    expect(formHelperText).toHaveTextContent('login failed')
  })

  test('redirects to /teams when login was successful', async () => {
    const usernameField = screen.getByRole('textbox', { name: /user name/i })
    const passwordField = screen.getByLabelText(/password/i)
    const loginButton = screen.getByRole('button', { name: /login/i })

    userEvent.type(usernameField, 'testuser')
    userEvent.type(passwordField, 'password')
    userEvent.click(loginButton)

    await waitFor(() => {
      expect(mockedNavigator).toBeCalledWith('/instances')
    })
  })
})
