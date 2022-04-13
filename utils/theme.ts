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
    MuiTextField: {
      defaultProps: {
        InputProps: {
          style: {
            fontSize: '1.4rem',
          },
        },
        InputLabelProps: {
          style: {
            fontSize: '1.4rem',
          },
        },
        FormHelperTextProps: {
          style: {
            fontSize: '1.4rem',
            marginTop: '0.8rem',
          },
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          '& th': {
            fontSize: '1.4rem',
          },
        },
      },
    },
    MuiTableBody: {
      styleOverrides: {
        root: {
          '& td': {
            fontSize: '1.4rem',
          },
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        root: {
          '& p': {
            fontSize: '1.4rem',
          },

          '& .MuiTablePagination-select': {
            fontSize: '1.4rem',
            display: 'flex',
            alignItems: 'center',
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        root: {
          '& .MuiPaper-root': {
            padding: '32px 48px',
          },
        },
      },
    },
  },
})
