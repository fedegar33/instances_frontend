import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider as JotaiProvider } from 'jotai'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import './index.css'
import Router from './components/Router'
import reportWebVitals from './reportWebVitals'

const container = document.getElementById('root')!
const root = createRoot(container)
const theme = createTheme({
  palette: {
    primary: {
      main: '#16375a'
    }
  }
})

root.render(
  <React.StrictMode>
    <JotaiProvider>
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
    </JotaiProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
