import { createTheme } from '@mui/material/styles'
import { red } from '@mui/material/colors'

// Create a theme instance.
export const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
      dark: '#343a40',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
  components: {
    MuiContainer: {
      defaultProps: {
        maxWidth: 'lg',
      },
    },
    MuiLink: {
      defaultProps: {
        underline: 'hover',
      },
      styleOverrides: {
        root: {
          color: '#000',
          fontSize: '1.6rem',

          '&:hover': {
            color: 'FF6464',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '1.4rem',
        },
      },
    },
    MuiCardActions: {
      styleOverrides: {
        root: {
          justifyContent: 'center',
        },
      },
    },
  },
})
